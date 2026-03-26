type Beat = { timestamp: number; key: string };
type Recording = { beats: Beat[] };
type Listener = (beatIndex: number, totalBeats: number) => void;

type Timeout = ReturnType<typeof setTimeout>; // ReturnType helps you to derive the return type of a function.

class Player {
	listeners: Listener[] = [];
	sheduledPlaybackTimers: Timeout[] = [];

	beatIndex: number = 0;

	get totalBeats() {
		return this.recording.beats.length;
	}
	constructor(
		private recording: Recording,
		private playback: (beat: Beat) => void,
	) {}

	subscribe(listener: Listener) {
		this.listeners.push(listener);
	}

	unsubscribe(listener: Listener) {
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	notify() {
		this.listeners.forEach((l) => l(this.beatIndex, this.totalBeats));
	}

	play() {
		// Should normalise the beats, and setup playback timers
		// 1. normalise beats
		//this.normaliseBeats(this.beats);
		// 2. Create timers for all beats from beat starting current beat index onwards
		// in the timer callback, to play the beat, call `playback` that was passed in constructor.
		this.notify();
	}

	pause() {
		// We need to clear all the timers in sheduledPlaybackTimers.
	}
}
