import { invokeDefault } from '../java/index.js';
import 'lodash';

const media = Autox.media;
class MediaPlayer {
    _media = media.createMediaPlayer();
    get androidMediaPlayer() {
        return this._media;
    }
    /**
     * @returns {number}当前播放位置。单位毫秒。
     */
    get currentPosition() {
        return this._media.getCurrentPosition();
    }
    /**
     * @returns {number} 音乐时长。单位毫秒。
     */
    get duration() {
        return this._media.getDuration();
    }
    get isPlaying() {
        return this._media.isPlaying();
    }
    async play(uri, volume, looping) {
        this.setDataSource(uri);
        if (volume)
            this.setVolume(volume);
        if (looping)
            this.setLooping(looping);
        await this.prepare();
        this.start();
    }
    pause() {
        this._media.pause();
    }
    async prepare() {
        await invokeDefault(this._media, "prepare", []);
    }
    prepareSync() {
        this._media.prepare();
    }
    release() {
        this._media.release();
    }
    reset() {
        this._media.reset();
    }
    async seekTo(msec) {
        await invokeDefault(this._media, "seekTo", [msec]);
    }
    setDataSource(path) {
        this._media.setDataSource(path);
    }
    setLooping(looping) {
        this._media.setLooping(looping);
    }
    setScreenOnWhilePlaying(keep) {
        this._media.setScreenOnWhilePlaying(keep);
    }
    setVolume(leftVolume, rightVolume) {
        if (rightVolume === undefined)
            rightVolume = leftVolume;
        this._media.setVolume(leftVolume, rightVolume);
    }
    start() {
        this._media.start();
    }
    stop() {
        this._media.stop();
    }
}
async function playMusic(uri, volume, looping) {
    const media = new MediaPlayer();
    await media.play(uri, volume, looping);
    return media;
}
function scanFile(file) {
    media.scanFile(file);
}

export { MediaPlayer, playMusic, scanFile };
