declare enum RFIDReaderModel {
    MARK3_HH7 = "MARK3-HH7",
    MARK3_HH5 = "MARK3-HH5",
    MARK3_TT7 = "MARK3-TT7",
    MARK3_TT5 = "MARK3-TT5",
    MARK3_TT3 = "MARK3-TT3"
}
declare enum RFIDReaderCommMode {
    BLE = 0,
    WIFI_AP = 1,
    WIFI_STA = 2,
    USB = 3
}
declare enum RFIDReaderNotificationType {
    NONE = 0,
    LED = 1,
    BEEP = 2,
    LED_AND_BEEP = 3,
    VIBRATE = 4,
    LED_AND_VIBRATE = 5,
    BEEP_AND_VIBRATE = 6,
    LED_BEEP_AND_VIBRATE = 7
}
declare enum RFIDReaderBaudRate {
    BASE = 115200,
    MAX = 921600
}
declare class RFIDReaderVersion {
    readonly bootloaderVersion: number[];
    readonly hardwareVersion: number[];
    readonly firmwareDate: number[];
    readonly firmwareVersion: number[];
    constructor(bootloaderVersion: number[], hardwareVersion: number[], firmwareDate: number[], firmwareVersion: number[]);
    toString(): string;
}
declare class RFIDReaderSerialNumber {
    readonly year: number[];
    readonly serialNumber: number[];
    constructor(year: number[], serialNumber: number[]);
    toString(): string;
}
declare enum RFIDReaderRegion {
    FCC = 1,
    IN = 4,
    CH = 6,
    CE_LOW = 8,
    KR = 9,
    JP = 11,
    CE_HIGH = 12,
    HK = 13,
    TW = 14,
    MY = 15,
    S_AF = 16,
    BR = 17,
    TH = 18,
    SG = 19,
    AU = 20,
    UY = 22,
    VD = 23,
    IL = 24,
    PH = 25,
    ID = 26,
    NZ = 27,
    PE = 28,
    RU = 29,
    FULL = 255
}
declare const frequencyTable: Readonly<Record<RFIDReaderRegion, ReadonlyArray<number>>>;
declare enum RFIDReaderConfiguration {
    USE_ANTENNA_PORT_AS_UNIQUE_IDENTIFIER = 0,
    RECORD_MAXIMUM_RSSI_VALUE = 6,
    USE_BANK_DATA_AS_UNIQUE_IDENTIFIER = 8
}
declare enum RFIDReaderSession {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3
}
declare enum RFIDReaderTarget {
    A = "a",
    B = "b",
    AB = "ab",
    BA = "ba"
}
declare class RFIDReaderTagSingulationData {
    /** Length of the compared data in bits (1 byte, or 2 bytes when Select-Option = 0x20). */
    readonly selectDataLength: number[];
    /** The data to be compared with the specified tag data in the bank. */
    readonly selectData: number[];
    /** Optional 4-byte offset within the bank. */
    readonly selectAddress?: number[] | undefined;
    constructor(
    /** Length of the compared data in bits (1 byte, or 2 bytes when Select-Option = 0x20). */
    selectDataLength: number[], 
    /** The data to be compared with the specified tag data in the bank. */
    selectData: number[], 
    /** Optional 4-byte offset within the bank. */
    selectAddress?: number[] | undefined);
}
declare enum RFIDReaderTagSingulationFlag {
    NONE = 0,
    FILTER_EPC = 1,
    FILTER_TID = 2,
    FILTER_USER_BANK = 3,
    FILTER_EPC_CONTENT = 4,
    FILTER_MULTIPLE_TAGS = 7,
    SET_INVERSION_FLAG = 8,
    FILTER_MORE_TAGS = 32
}
declare enum RFIDReaderTagMetadata {
    NONE = 0,
    RETURN_READ_COUNT = 1,
    RETURN_RSSI = 2,
    RETURN_ANTENNA_ID = 4,
    RETURN_FREQUENCY = 8,
    RETURN_TIMESTAMP = 16,
    RETURN_PHASE_VALUE = 32,
    RETURN_DATA_LEN = 128
}
declare class RFIDReaderAntennaPort {
    readonly number: number;
    readonly readPower: number;
    readonly writePower: number;
    constructor(number: number, readPower: number, writePower: number);
}
declare enum RFIDReaderRFMode {
    ONE = 101,
    THREE = 103,
    FIVE = 105,
    SEVEN = 107,
    ELEVEN = 111,
    TWELVE = 112,
    THIRTEEN = 113,
    FIFTEEN = 115,
    ONE_ZERO_THREE = 203,
    ONE_TWO_ZERO = 220,
    THREE_FOUR_FIVE = 45
}
/** Q value used for GEN2 inventory rounds. Use {@link dynamicQ} or {@link staticQ}. */
type RFIDReaderQ = {
    readonly kind: "dynamic";
} | {
    readonly kind: "static";
    readonly value: number;
};
declare const dynamicQ: RFIDReaderQ;
declare const staticQ: (value: number) => RFIDReaderQ;
/** 4-byte password used to unlock a tag's access / kill / write operation. */
type RFIDTagPassword = number;
/** 4-byte memory address inside a tag memory bank. */
type RFIDTagMemoryAddress = number;
declare enum RFIDTagMemoryBank {
    RESERVED = 0,
    EPC = 1,
    TID = 2,
    USER = 3
}
/** Two-byte phase value returned by the reader. */
declare class RFIDTagPhase {
    readonly value: number;
    constructor(value: number);
    /**
     * Convert the raw phase value into degrees. When `isSingleTagInventory` is
     * true, returns `[startPhaseDegrees, endPhaseDegrees]`; otherwise `[-1, phaseInDegrees]`.
     */
    inDegrees(isSingleTagInventory?: boolean): [number, number];
}
declare class RFIDTag {
    readonly epc: number[];
    readonly epcLen: number;
    readonly pc: number | null;
    readonly rssi: number | null;
    readonly antennaID: number | null;
    readonly frequency: number[] | null;
    readonly timestamp: number[] | null;
    readonly phase: RFIDTagPhase | null;
    readonly tagDataLen: number | null;
    constructor(epc: number[], epcLen: number, pc?: number | null, rssi?: number | null, antennaID?: number | null, frequency?: number[] | null, timestamp?: number[] | null, phase?: RFIDTagPhase | null, tagDataLen?: number | null);
}

type RFIDReaderError = {
    readonly kind: "unimplemented";
} | {
    readonly kind: "transportNotReady";
} | {
    readonly kind: "readerError";
    readonly cmd?: number;
    readonly description: string;
};
declare const Unimplemented: RFIDReaderError;
declare const TransportNotReady: RFIDReaderError;
declare const readerError: (description: string, cmd?: number) => RFIDReaderError;

interface RFIDReaderDelegate {
    rfidReaderDidConnect(): void;
    rfidReaderDidBecomeReady(): void;
    rfidReaderDidDisconnect(): void;
    rfidReaderDidReceiveMessage(cmd: number, message: unknown): void;
    rfidReaderDidStartScanning(): void;
    rfidReaderDidStopScanning(): void;
    rfidReaderDidReadTag(tag: RFIDTag): void;
    rfidReaderDidEncounteredError(error: RFIDReaderError): void;
    rfidReaderDidReceiveRawData(data: number[]): void;
}
/** Default no-op delegate — override only the methods you care about. */
declare const defaultDelegate: RFIDReaderDelegate;

/**
 * Frame builders for every reader / module command. Ported 1:1 from iOS
 * `Messenger.swift` and Kotlin `Messenger.kt`. Every builder returns a fully
 * framed byte array ready to hand to the transport layer.
 *
 * Reader-command frame layout: `[Header 1B][DataLen 1B][CommandCode 1B][Data nB]`.
 * Module frames additionally include a trailing CRC16.
 */
declare const Messenger: {
    readonly streamingOTACmdBegin: 240;
    readonly streamingOTACmdData: 241;
    readonly streamingOTACmdEnd: 242;
    readonly streamingOTACmdAbort: 243;
    readonly activate: (_serialNumber: string) => number[];
    readonly getCommMode: ReadonlyArray<number>;
    readonly setCommMode: (commMode: RFIDReaderCommMode) => number[];
    readonly getTime: ReadonlyArray<number>;
    readonly getNetworkSSID: ReadonlyArray<number>;
    readonly setNetworkSSID: (ssid: string) => number[];
    readonly getNetworkPassword: ReadonlyArray<number>;
    readonly setNetworkPassword: (password: string) => number[];
    readonly getAlertNotificationType: ReadonlyArray<number>;
    readonly setAlertNotificationType: (type: RFIDReaderNotificationType) => number[];
    readonly getVersion: ReadonlyArray<number>;
    readonly getSerialNumber: ReadonlyArray<number>;
    readonly getDeviceName: ReadonlyArray<number>;
    readonly setDeviceName: (name: string) => number[];
    readonly getModel: ReadonlyArray<number>;
    readonly getIPv4: ReadonlyArray<number>;
    readonly getMac: ReadonlyArray<number>;
    readonly getBatterySoc: ReadonlyArray<number>;
    readonly getBatterySoh: ReadonlyArray<number>;
    readonly getBatteryCycles: ReadonlyArray<number>;
    readonly setBaudRate: (baudRate: RFIDReaderBaudRate) => number[];
    readonly performFactoryReset: ReadonlyArray<number>;
    readonly performReboot: ReadonlyArray<number>;
    readonly performOTA: (version: string) => number[];
    /** `[00][len][F0][image size u32 LE][sha256 32B][version UTF-8]`. */
    readonly streamingOTABegin: (imageSize: number, sha256: ArrayLike<number>, version: string) => number[];
    /** `[00][FF][F1][chunk length u16 BE][sequence u16 LE][chunk]`. */
    readonly streamingOTAData: (sequence: number, chunk: ArrayLike<number>) => number[];
    readonly streamingOTAEnd: ReadonlyArray<number>;
    readonly streamingOTAAbort: ReadonlyArray<number>;
    readonly sendRawCmd: (cmd: ArrayLike<number>, calculateCRC?: boolean) => number[];
    readonly getHWVersion: () => number[];
    readonly getHWSerialNumber: () => number[];
    readonly bootFirmware: () => number[];
    readonly getRegion: () => number[];
    readonly setRegion: (region: RFIDReaderRegion) => number[];
    readonly getFreqHopping: () => number[];
    readonly setFreqHopping: (frequencies: ReadonlyArray<number>) => number[];
    readonly getAntennaPorts: () => number[];
    readonly setAntennaPorts: (antennaPorts: ReadonlyArray<RFIDReaderAntennaPort>) => number[];
    readonly writeTagEPC: (opts: {
        tagEPC: ArrayLike<number>;
        timeout: number;
        password?: RFIDTagPassword;
        tsFlag?: RFIDReaderTagSingulationFlag;
        tsData?: RFIDReaderTagSingulationData;
    }) => number[];
    readonly writeTag: (opts: {
        timeout: number;
        writeAddress: RFIDTagMemoryAddress;
        writeMemoryBank: RFIDTagMemoryBank;
        writeData: ArrayLike<number>;
        writeReadFlag?: boolean;
        tsFlag?: RFIDReaderTagSingulationFlag;
        password?: RFIDTagPassword;
        tsData?: RFIDReaderTagSingulationData;
        readBank?: RFIDTagMemoryBank;
        readAddress?: RFIDTagMemoryAddress;
        readLength?: number;
    }) => number[];
    readonly readTagMemoryBank: (opts: {
        timeout: number;
        memoryBank: RFIDTagMemoryBank;
        readAddress: RFIDTagMemoryAddress;
        wordCount: number;
        tsFlag?: RFIDReaderTagSingulationFlag;
        metadata?: ReadonlyArray<RFIDReaderTagMetadata>;
        password?: RFIDTagPassword;
        tsData?: RFIDReaderTagSingulationData;
    }) => number[];
    readonly singleTagInventory: (opts: {
        timeout: number;
        metadata?: ReadonlyArray<RFIDReaderTagMetadata>;
        tsFlag?: RFIDReaderTagSingulationFlag;
        tsData?: RFIDReaderTagSingulationData;
    }) => number[];
    readonly startAsyncInventory: (opts?: {
        powerSave?: boolean;
        metadata?: ReadonlyArray<RFIDReaderTagMetadata>;
        password?: RFIDTagPassword;
        tsFlag?: RFIDReaderTagSingulationFlag;
        tsData?: RFIDReaderTagSingulationData;
        memoryBank?: RFIDTagMemoryBank;
        readAddress?: RFIDTagMemoryAddress;
        wordCount?: number;
    }) => number[];
    readonly stopAsyncInventory: () => number[];
    readonly startEXAsyncInventory: (metadata?: ReadonlyArray<RFIDReaderTagMetadata>) => number[];
    readonly stopEXAsyncInventory: () => number[];
    readonly getReaderConfiguration: (cfg: RFIDReaderConfiguration) => number[];
    readonly setReaderConfiguration: (cfg: RFIDReaderConfiguration, enable: boolean) => number[];
    readonly getSession: () => number[];
    readonly setSession: (session: RFIDReaderSession) => number[];
    readonly getTarget: () => number[];
    readonly setTarget: (target: RFIDReaderTarget) => number[];
    readonly getRFMode: () => number[];
    readonly setRFMode: (rfMode: RFIDReaderRFMode) => number[];
    readonly getQ: () => number[];
    readonly setQ: (q: RFIDReaderQ | null) => number[];
    readonly getTemperature: () => number[];
    /** Shared heartbeat prefix — exposed for parity with Kotlin SDK. */
    readonly heartbeatPrefix: () => ReadonlyArray<number>;
};

interface StreamingOTAClientDelegate {
    streamingOTADidBegin(maxChunk: number, partitionSize: number): void;
    streamingOTADidProgress(bytesWritten: number, totalBytes: number, sequenceAcknowledged: number): void;
    streamingOTADidSendBytes?(sent: number, totalBytes: number): void;
    streamingOTADidComplete(): void;
    streamingOTADidFail(error: StreamingOTAError): void;
}
type StreamingOTAErrorCode = "notConnected" | "alreadyInProgress" | "invalidImage" | "beginTimeout" | "endTimeout" | "deviceRejected" | "transportError";
declare class StreamingOTAError extends Error {
    readonly code: StreamingOTAErrorCode;
    readonly command?: number | undefined;
    readonly status?: number | undefined;
    constructor(code: StreamingOTAErrorCode, message: string, command?: number | undefined, status?: number | undefined);
}
declare class StreamingOTAClient {
    private readonly reader;
    private readonly onCleanup?;
    private static readonly ACK_WINDOW;
    private static readonly BEGIN_TIMEOUT_MS;
    private static readonly END_TIMEOUT_MS;
    private delegate?;
    private image;
    private maxChunk;
    private sequence;
    private offset;
    private completedOffset;
    private outstandingChunks;
    private lastAcknowledgedSequence;
    private finalAcknowledgementReceived;
    private transportWriteActive;
    private endSent;
    private active;
    private beginTimer?;
    private endTimer?;
    constructor(reader: RFIDReader, onCleanup?: (() => void) | undefined);
    start(image: ArrayBuffer | ArrayBufferView, version: string, delegate: StreamingOTAClientDelegate, sha256?: ArrayLike<number>): Promise<void>;
    abort(): Promise<void>;
    private handleFrame;
    private handleBegin;
    private handleData;
    private handleEnd;
    private pumpWrites;
    private sendEnd;
    private reject;
    private fail;
    private cleanup;
}

interface TransportDelegate {
    transportDidConnect(): void;
    transportDidBecomeReady(): void;
    transportDidDisconnect(): void;
    transportDidWriteMessage(data: number[]): void;
    transportDidReceiveMessage(data: number[]): void;
    transportDidEncounteredError(error: Error): void;
}
declare const defaultTransportDelegate: TransportDelegate;

interface TransportProtocol {
    /** Maximum bytes accepted by one transport write, when known. */
    readonly maximumWriteValueLength?: number;
    /** Rebind callbacks when the transport is attached to an RFIDReader. */
    setDelegate?(delegate: TransportDelegate): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendData(data: ArrayLike<number>): Promise<number[] | void>;
}

interface RFIDReaderOptions {
    readonly model: RFIDReaderModel;
    readonly name?: string;
    readonly transport: TransportProtocol;
    readonly delegate?: RFIDReaderDelegate;
    readonly debug?: boolean;
}
/**
 * Facade for the Mark3 reader. Public API mirrors iOS `RFIDReader.swift` and
 * Kotlin `RFIDReader.kt`. Owns the transport, wires it to
 * [MessageParser] / [AsyncInventoryParser], and forwards typed results to the
 * provided [RFIDReaderDelegate].
 */
declare class RFIDReader {
    readonly model: RFIDReaderModel;
    readonly name?: string;
    private delegate;
    readonly transportType: TransportProtocol;
    private readonly debug;
    private readonly asyncParser;
    private responseBuffer;
    private stopFallback?;
    private streamingOTAFrameObserver?;
    private streamingOTAErrorObserver?;
    private activeStreamingOTAClient?;
    private _isConnected;
    private _isScanning;
    constructor(opts: RFIDReaderOptions);
    setDelegate(delegate: RFIDReaderDelegate): void;
    getDelegate(): RFIDReaderDelegate;
    get isConnected(): boolean;
    get isScanning(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getCommMode: () => Promise<void>;
    setCommMode: (m: RFIDReaderCommMode) => Promise<void>;
    getNetworkSSID: () => Promise<void>;
    setNetworkSSID: (ssid: string) => Promise<void>;
    getNetworkPassword: () => Promise<void>;
    setNetworkPassword: (pw: string) => Promise<void>;
    getAlertNotification: () => Promise<void>;
    setAlertNotification: (t: RFIDReaderNotificationType) => Promise<void>;
    getVersion: () => Promise<void>;
    getSerialNumber: () => Promise<void>;
    getDeviceName: () => Promise<void>;
    setDeviceName: (name: string) => Promise<void>;
    getModel: () => Promise<void>;
    getIPv4: () => Promise<void>;
    getMac: () => Promise<void>;
    getBatterySoc: () => Promise<void>;
    getBatterySoh: () => Promise<void>;
    getBatteryCycles: () => Promise<void>;
    factoryReset: () => Promise<void>;
    reboot: () => Promise<void>;
    performOTA: (version: string) => Promise<void>;
    performStreamingOTA(image: ArrayBuffer | ArrayBufferView, version: string, delegate: StreamingOTAClientDelegate, sha256?: ArrayLike<number>): StreamingOTAClient;
    sendRawCmd: (cmd: ArrayLike<number>, calculateCRC?: boolean) => Promise<void>;
    setBaudRate: (b: RFIDReaderBaudRate) => Promise<void>;
    getHWVersion: () => Promise<void>;
    getHWSerialNumber: () => Promise<void>;
    bootFirmware: () => Promise<void>;
    getRegion: () => Promise<void>;
    setRegion: (r: RFIDReaderRegion) => Promise<void>;
    getFreqHopping: () => Promise<void>;
    setFreqHopping: (regionOrFrequencies: RFIDReaderRegion | ReadonlyArray<number>) => Promise<void>;
    getAntennaPort: () => Promise<void>;
    setAntennaPort: (ports: ReadonlyArray<RFIDReaderAntennaPort>) => Promise<void>;
    getReaderConfiguration: (c: RFIDReaderConfiguration) => Promise<void>;
    setReaderConfiguration: (c: RFIDReaderConfiguration, enable: boolean) => Promise<void>;
    getSession: () => Promise<void>;
    setSession: (s: RFIDReaderSession) => Promise<void>;
    getTarget: () => Promise<void>;
    setTarget: (t: RFIDReaderTarget) => Promise<void>;
    getRFMode: () => Promise<void>;
    setRFMode: (m: RFIDReaderRFMode) => Promise<void>;
    getQ: () => Promise<void>;
    setQ: (q: RFIDReaderQ | null) => Promise<void>;
    getTemperature: () => Promise<void>;
    singleTagInventory: (opts: Parameters<typeof Messenger.singleTagInventory>[0]) => Promise<void>;
    writeTagEPC: (opts: Parameters<typeof Messenger.writeTagEPC>[0]) => Promise<void>;
    writeTag: (opts: Parameters<typeof Messenger.writeTag>[0]) => Promise<void>;
    readTagMemoryBank: (opts: Parameters<typeof Messenger.readTagMemoryBank>[0]) => Promise<void>;
    startAsyncInventory(opts?: Parameters<typeof Messenger.startAsyncInventory>[0]): Promise<void>;
    stopAsyncInventory(): Promise<void>;
    startEXAsyncInventory(metadata?: ReadonlyArray<RFIDReaderTagMetadata>): Promise<void>;
    stopEXAsyncInventory(): Promise<void>;
    private send;
    private attachTransportDelegate;
    /** Convenience factory building the transport delegate that plugs into RFIDReader. */
    buildTransportDelegate(): TransportDelegate;
    private didBecomeReady;
    private receiveTransportData;
    private processResponseBuffer;
    private handleFrame;
    private buildAsyncDelegate;
    private markScanningStarted;
    private markScanningStopped;
    private scheduleStopFallback;
}

declare function parseCommMode(data: ArrayLike<number>): RFIDReaderCommMode | null;
declare function parseTime(_data: ArrayLike<number>): {
    time: null;
};
declare function parseNetworkSSID(data: ArrayLike<number>): {
    network_ssid: string;
};
declare function parseNetworkPassword(data: ArrayLike<number>): {
    network_password: string;
};
declare function parseNotificationType(data: ArrayLike<number>): RFIDReaderNotificationType | null;
declare function parseDeviceName(data: ArrayLike<number>): {
    name: string;
};
declare function parseReaderVersion(data: ArrayLike<number>): {
    version: string;
    raw: number[];
};
declare function parseReaderSerialNumber(data: ArrayLike<number>): {
    serial_number: string;
    raw: number[];
};
declare function parseModel(data: ArrayLike<number>): RFIDReaderModel | {
    model: string;
};
declare function parseIPv4(data: ArrayLike<number>): {
    ipv4: string;
};
declare function parseMac(data: ArrayLike<number>): {
    mac: string;
};
declare function parseBatterySoc(data: ArrayLike<number>): {
    soc: number;
};
declare function parseBatterySoh(data: ArrayLike<number>): {
    soh: number;
};
declare function parseBatteryCycles(data: ArrayLike<number>): {
    cycles: number;
};
declare const messageParser: Readonly<Record<number, (data: ArrayLike<number>) => unknown>>;
declare function parseVersion(data: ArrayLike<number>): RFIDReaderVersion;
declare function parseSerialNumber(data: ArrayLike<number>): RFIDReaderSerialNumber;
declare function parseSetAntennaPortsRes(_data: ArrayLike<number>): null;
declare function parseSetFreqHoppingRes(_data: ArrayLike<number>): null;
declare function parseSetRegionRes(_data: ArrayLike<number>): null;
declare function parseSetReaderConfigRes(_data: ArrayLike<number>): null;
declare function parseSetProtocolConfigRes(_data: ArrayLike<number>): null;
declare function parseFreqHopping(_data: ArrayLike<number>): null;
declare function parseRegion(data: ArrayLike<number>): RFIDReaderRegion | null;
declare function parseReaderConfig(data: ArrayLike<number>): {
    config: RFIDReaderConfiguration | null;
    enabled: boolean;
};
declare function parseAntennaPorts(data: ArrayLike<number>): RFIDReaderAntennaPort[];
declare function parseProtocolConfig(data: ArrayLike<number>): unknown;
declare function parseSingleTag(data: ArrayLike<number>): RFIDTag;
declare function parseWriteTagRes(_data: ArrayLike<number>): boolean;
declare function parseTemperature(data: ArrayLike<number>): {
    temperature: number;
};
declare const moduleMessageParser: Readonly<Record<number, (data: ArrayLike<number>) => unknown>>;

/** Callback surface for {@link AsyncInventoryParser}. Mirrors iOS `AsyncInventoryParserDelegate`. */
interface AsyncInventoryParserDelegate {
    asyncInventoryParserDidReceiveStartAsyncInventory(): void;
    asyncInventoryParserDidReadTag(tag: RFIDTag): void;
    asyncInventoryParserDidReceiveHeartbeatPacket(): void;
    asyncInventoryParserDidReceiveStopAsyncInventory(): void;
    asyncInventoryParserDidEncounteredError(error: Error): void;
}
/**
 * Parses `0xFF 0xAA ...` frames the reader emits during asynchronous inventory.
 * Delivers one {@link RFIDTag} per tag response and dedicated callbacks for
 * heartbeat + start / stop sentinels.
 */
declare class AsyncInventoryParser {
    private readonly delegate;
    private static readonly TAG;
    constructor(delegate: AsyncInventoryParserDelegate);
    parse(data: ArrayLike<number>): void;
}

declare const BOOT_FIRMWARE = 4;
declare const GET_VERSION = 3;
declare const BOOT_BOOTLOADER = 9;
declare const GET_SERIAL_NUMBER = 16;
declare const SINGLE_TAG_INVENTORY = 33;
declare const SYNCHRONOUS_INVENTORY = 34;
declare const GET_TAG_BUFFER = 41;
declare const ASYNCHRONOUS_INVENTORY = 170;
declare const WRITE_TAG_DATA = 36;
declare const WRITE_TAG_EPC = 35;
declare const LOCK_TAG = 37;
declare const KILL_TAG = 38;
declare const READ_TAG_DATA = 40;
declare const SET_ANTENNA_PORTS = 145;
declare const SET_CURRENT_TAG_PROTOCOL = 147;
declare const SET_FREQUENCY_HOPPING = 149;
declare const SET_GPO = 150;
declare const SET_CURRENT_REGION = 151;
declare const SET_READER_CONFIGURATION = 154;
declare const SET_PROTOCOL_CONFIGURATION = 155;
declare const GET_ANTENNA_PORTS = 97;
declare const GET_TAG_PROTOCOL = 99;
declare const GET_FREQUENCY_HOPPING = 101;
declare const GET_GPI = 102;
declare const GET_CURRENT_REGION = 103;
declare const GET_AVAILABLE_REGIONS = 113;
declare const GET_READER_CONFIGURATION = 106;
declare const GET_PROTOCOL_CONFIGURATION = 107;
declare const GET_CURRENT_TEMPERATURE = 114;
declare const commandCodeToName: Readonly<Record<number, string>>;

/** Terminator byte required at the end of every "Moduletech" sub-command payload. */
declare const MODULETECH_TERMINATOR = 187;
/** ASCII "Moduletech" preamble used inside 0xFF/0xAA module frames. */
declare const MODULETECH_PREAMBLE: ReadonlyArray<number>;
/** ASCII "XTSJ" heartbeat prefix used by the reader between async inventory frames. */
declare const HEARTBEAT_PREFIX: ReadonlyArray<number>;

declare const statusCodes: Readonly<Record<number, string>>;
declare function statusDescription(code: number): string;

/**
 * Firmware response wire protocol v1.
 *
 * SDK requests are plaintext. Firmware responses use
 * `[header][key][encrypted length, command, status, payload, and CRC]`.
 */
declare const COMMAND_CIPHER_VERSION = 1;
/** Decode one byte using the random key embedded in a firmware response. */
declare function decryptResponseByte(value: number, key: number): number;
/** Decode a complete firmware wire frame and remove its embedded key byte. */
declare function decryptResponse(frame: ArrayLike<number>): number[];

declare const MSG_CRC_INIT = 65535;
declare const MSG_CCITT_CRC_POLY = 4129;
/** CCITT CRC-16 with the iOS "skip byte 0" quirk. */
declare function calcCRC(msg: ArrayLike<number>): number;
/** Sum-of-bytes mod 256, used for Moduletech sub-command CRC. */
declare function getSubCRC(data: ArrayLike<number>): number;
/** Big-endian byte array of [length] bytes. Truncates high bits if `value` overflows. */
declare function int2Bytes(value: number, length: number): number[];
/** Uppercase hex, no separators. */
declare function toHex(bytes: ArrayLike<number>): string;
/** Parse an unspaced hex string into a byte array. Throws on odd length or non-hex chars. */
declare function hexToBytes(hex: string): number[];
/** Strip scheme/path — returns host only. Mirrors iOS / Kotlin `sanitizeHost`. */
declare function sanitizeHost(host: string): string;
declare function delay(ms: number): Promise<void>;

declare enum WiFiTransportMode {
    TCP = "tcp",
    UDP = "udp"
}
type TransportType = {
    readonly kind: "ble";
    readonly hostname?: string;
    readonly serviceUUID?: string;
    readonly maximumWriteValueLength?: number;
    readonly acceptAllDevices?: boolean;
    readonly debug?: boolean;
} | {
    readonly kind: "rest";
    readonly hostname: string;
    readonly secure?: boolean;
    readonly debug?: boolean;
} | {
    readonly kind: "usb";
    readonly vendorId?: number;
    readonly debug?: boolean;
} | {
    readonly kind: "bridge";
    readonly bridge?: NativeBridgeAPI;
    readonly debug?: boolean;
};
/**
 * Shape of the native app-injected bridge used when the web app is hosted
 * inside a WebView (see WebBridge/RFIDReaderWebBridge in Apple/Android SDKs).
 * Matches the API exposed as `window.RFIDReader`.
 */
interface NativeBridgeAPI {
    readonly __installed?: boolean;
    sendRawCmd(args: {
        cmd: string;
        calculateCRC?: boolean;
    }): Promise<unknown>;
    call?(method: string, args?: Record<string, unknown>): Promise<unknown>;
    getState?(): Promise<{
        isConnected: boolean;
        isScanning?: boolean;
    }>;
    on(event: string, listener: (data: unknown) => void): () => void;
}

/**
 * BLE transport using the Web Bluetooth API. Requires a browser with
 * `navigator.bluetooth` (Chrome, Edge, Opera). Discovery filters cover the
 * standard Mark3 GATT service plus optional hostname filtering.
 */
declare class BLETransport implements TransportProtocol {
    private delegate;
    private device?;
    private server?;
    private readChar?;
    private writeChar?;
    private notificationListener?;
    private disconnectListener?;
    private readonly serviceUUID;
    readonly maximumWriteValueLength: number;
    constructor(delegate?: TransportDelegate, opts?: {
        hostname?: string;
        serviceUUID?: string;
        maximumWriteValueLength?: number;
        acceptAllDevices?: boolean;
        debug?: boolean;
    });
    private readonly hostname?;
    private readonly acceptAllDevices;
    private readonly debug;
    setDelegate(delegate: TransportDelegate): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendData(data: ArrayLike<number>): Promise<void>;
}

/**
 * HTTP-REST transport. Each `sendData` call posts a byte array to
 * `http://<host>/rest` and returns the reader's response bytes.
 * A one-shot `GET /resolve` before connect resolves an .local hostname to an IPv4.
 */
declare class RESTTransport implements TransportProtocol {
    private delegate;
    private readonly opts;
    private resolvedHost;
    constructor(delegate: TransportDelegate | undefined, opts: {
        hostname: string;
        secure?: boolean;
        debug?: boolean;
    });
    setDelegate(delegate: TransportDelegate): void;
    private get baseURL();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendData(data: ArrayLike<number>): Promise<number[]>;
}

/**
 * WebUSB transport for CDC-ACM devices (Mark3 reader VID 0x303A by default).
 * Mirrors Android USBTransport: claims the CDC data interface, then runs a
 * long-lived transferIn loop for RX.
 */
declare class USBTransport implements TransportProtocol {
    private delegate;
    private readonly opts;
    private device?;
    private controlInterface?;
    private dataInterface?;
    private inEndpoint?;
    private outEndpoint?;
    private readLoopRunning;
    private disconnectListener?;
    private disconnectNotified;
    constructor(delegate?: TransportDelegate, opts?: {
        vendorId?: number;
        debug?: boolean;
    });
    setDelegate(delegate: TransportDelegate): void;
    connect(): Promise<void>;
    private startReadLoop;
    disconnect(): Promise<void>;
    sendData(data: ArrayLike<number>): Promise<void>;
    private closeDevice;
    private notifyDisconnected;
}

/**
 * Bridge transport for web apps hosted inside a native app that exposes
 * `window.RFIDReader` (see Apple/Android WebBridge). The native side owns the
 * reader lifecycle; this transport only forwards `sendRawCmd` and receives
 * raw hex frames via `on('raw', …)`.
 */
declare class BridgeTransport implements TransportProtocol {
    private delegate;
    private readonly opts;
    private bridge?;
    private unsubs;
    constructor(delegate?: TransportDelegate, opts?: {
        bridge?: NativeBridgeAPI;
        debug?: boolean;
    });
    setDelegate(delegate: TransportDelegate): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendData(data: ArrayLike<number>): Promise<void>;
}
declare global {
    interface Window {
        RFIDReader?: NativeBridgeAPI;
    }
}

export { ASYNCHRONOUS_INVENTORY, AsyncInventoryParser, type AsyncInventoryParserDelegate, BLETransport, BOOT_BOOTLOADER, BOOT_FIRMWARE, BridgeTransport, COMMAND_CIPHER_VERSION, GET_ANTENNA_PORTS, GET_AVAILABLE_REGIONS, GET_CURRENT_REGION, GET_CURRENT_TEMPERATURE, GET_FREQUENCY_HOPPING, GET_GPI, GET_PROTOCOL_CONFIGURATION, GET_READER_CONFIGURATION, GET_SERIAL_NUMBER, GET_TAG_BUFFER, GET_TAG_PROTOCOL, GET_VERSION, HEARTBEAT_PREFIX, KILL_TAG, LOCK_TAG, MODULETECH_PREAMBLE, MODULETECH_TERMINATOR, MSG_CCITT_CRC_POLY, MSG_CRC_INIT, Messenger, type NativeBridgeAPI, READ_TAG_DATA, RESTTransport, RFIDReader, RFIDReaderAntennaPort, RFIDReaderBaudRate, RFIDReaderCommMode, RFIDReaderConfiguration, type RFIDReaderDelegate, type RFIDReaderError, RFIDReaderModel, RFIDReaderNotificationType, type RFIDReaderOptions, type RFIDReaderQ, RFIDReaderRFMode, RFIDReaderRegion, RFIDReaderSerialNumber, RFIDReaderSession, RFIDReaderTagMetadata, RFIDReaderTagSingulationData, RFIDReaderTagSingulationFlag, RFIDReaderTarget, RFIDReaderVersion, RFIDTag, type RFIDTagMemoryAddress, RFIDTagMemoryBank, type RFIDTagPassword, RFIDTagPhase, SET_ANTENNA_PORTS, SET_CURRENT_REGION, SET_CURRENT_TAG_PROTOCOL, SET_FREQUENCY_HOPPING, SET_GPO, SET_PROTOCOL_CONFIGURATION, SET_READER_CONFIGURATION, SINGLE_TAG_INVENTORY, SYNCHRONOUS_INVENTORY, StreamingOTAClient, type StreamingOTAClientDelegate, StreamingOTAError, type StreamingOTAErrorCode, type TransportDelegate, TransportNotReady, type TransportProtocol, type TransportType, USBTransport, Unimplemented, WRITE_TAG_DATA, WRITE_TAG_EPC, WiFiTransportMode, calcCRC, commandCodeToName, decryptResponse, decryptResponseByte, defaultDelegate, defaultTransportDelegate, delay, dynamicQ, frequencyTable, getSubCRC, hexToBytes, int2Bytes, messageParser, moduleMessageParser, parseAntennaPorts, parseBatteryCycles, parseBatterySoc, parseBatterySoh, parseCommMode, parseDeviceName, parseFreqHopping, parseIPv4, parseMac, parseModel, parseNetworkPassword, parseNetworkSSID, parseNotificationType, parseProtocolConfig, parseReaderConfig, parseReaderSerialNumber, parseReaderVersion, parseRegion, parseSerialNumber, parseSetAntennaPortsRes, parseSetFreqHoppingRes, parseSetProtocolConfigRes, parseSetReaderConfigRes, parseSetRegionRes, parseSingleTag, parseTemperature, parseTime, parseVersion, parseWriteTagRes, readerError, sanitizeHost, staticQ, statusCodes, statusDescription, toHex };
