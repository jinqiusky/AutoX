export declare class MediaPlayer {
    private _media;
    get androidMediaPlayer(): any;
    /**
     * @returns {number}当前播放位置。单位毫秒。
     */
    get currentPosition(): number;
    /**
     * @returns {number} 音乐时长。单位毫秒。
     */
    get duration(): number;
    get isPlaying(): boolean;
    play(uri: string, volume?: number, looping?: boolean): Promise<void>;
    pause(): void;
    prepare(): Promise<void>;
    prepareSync(): void;
    release(): void;
    reset(): void;
    seekTo(msec: number): Promise<void>;
    setDataSource(path: string): void;
    setLooping(looping: boolean): void;
    setScreenOnWhilePlaying(keep: boolean): void;
    setVolume(leftVolume: number, rightVolume?: number): void;
    start(): void;
    stop(): void;
}
export declare function playMusic(uri: string, volume?: number, looping?: boolean): Promise<MediaPlayer>;
export declare function scanFile(file: string): void;
