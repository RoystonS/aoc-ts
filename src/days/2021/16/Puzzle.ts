import { maxNumber, minNumber, product, sum } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    const bits = emitBits(input);
    const processor = new PacketProcessor(bits);
    processor.readPacket();
    return processor.versionSum;
  },
  part1Answer: 877,

  computePart2(input) {
    const bits = emitBits(input);
    const processor = new PacketProcessor(bits);
    return processor.readPacket();
  },
  part2Answer: 194435634456,
};

function* emitBits(message: string) {
  for (const ch of message) {
    const parsed = parseInt(ch, 16);
    const bits = parsed.toString(2).padStart(4, "0");
    for (const bit of bits) {
      yield bit;
    }
  }
}

class PacketProcessor {
  private bitsReadInCurrentPacket: number[] = [];
  public versionSum = 0;

  public constructor(private readonly bits: IterableIterator<string>) {}

  public readPacket(): number {
    this.bitsReadInCurrentPacket.push(0);
    const packetVersion = this.readNumber(3);
    this.versionSum += packetVersion;
    const packetTypeId = this.readNumber(3);

    let packetValue: number;

    switch (packetTypeId) {
      case 4:
        // Literal.
        packetValue = this.readLiteral();
        break;
      default:
        const subPacketValues = this.readSubPackets();
        switch (packetTypeId) {
          case 0:
            packetValue = sum(subPacketValues.values());
            break;
          case 1:
            packetValue = product(subPacketValues.values());
            break;
          case 2:
            packetValue = minNumber(subPacketValues.values());
            break;
          case 3:
            packetValue = maxNumber(subPacketValues.values());
            break;
          case 5:
            packetValue = subPacketValues[0] > subPacketValues[1] ? 1 : 0;
            break;
          case 6:
            packetValue = subPacketValues[0] < subPacketValues[1] ? 1 : 0;
            break;
          case 7:
            packetValue = subPacketValues[0] === subPacketValues[1] ? 1 : 0;
            break;
          default:
            throw new Error(`Unexpected packetTypeId ${packetTypeId}`);
        }
        break;
    }

    const bitsForPacket = this.bitsReadInCurrentPacket.pop()!;
    this.incrementBitsReadForThisPacket(bitsForPacket);
    return packetValue;
  }

  private readNumber(bitCount: number) {
    let value = 0;
    for (let i = 0; i < bitCount; i++) {
      value = value * 2;
      const bit = this.bits.next().value;
      value += parseInt(bit, 10);
    }

    this.incrementBitsReadForThisPacket(bitCount);
    return value;
  }

  private readSubPackets() {
    const lengthTypeId = this.readNumber(1);
    let subPacketValues: number[] = [];

    if (lengthTypeId === 0) {
      const totalLengthInBits = this.readNumber(15);

      const bitsReadByThisPacketSoFar = this.bitsReadInCurrentPacket.at(-1)!;
      const stopAt = bitsReadByThisPacketSoFar + totalLengthInBits;
      while (this.bitsReadInCurrentPacket.at(-1)! < stopAt) {
        subPacketValues.push(this.readPacket());
        const diff = this.bitsReadInCurrentPacket.at(-1)! - bitsReadByThisPacketSoFar;
      }
    }
    if (lengthTypeId === 1) {
      const subPacketCount = this.readNumber(11);
      for (let i = 0; i < subPacketCount; i++) {
        subPacketValues.push(this.readPacket());
      }
    }

    return subPacketValues;
  }

  private readLiteral() {
    let value = 0;
    let header: number;

    do {
      value = value * 16;
      header = this.readNumber(1);
      value += this.readNumber(4);
    } while (header === 1);

    return value;
  }

  public incrementBitsReadForThisPacket(count: number) {
    const currentBits = this.bitsReadInCurrentPacket.pop()!;
    const newBits = currentBits + count;
    this.bitsReadInCurrentPacket.push(newBits);
  }
}
