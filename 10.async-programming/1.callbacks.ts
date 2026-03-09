// JavaScript runtime is a single threaded system. Anything that needs to be done in background (a task that is costly, or needs I/O, networking) must be delegated to a native thread, and its result needs to be brought back to the main thread of the runtime, via an event loop system with an event queue.

// Before we get into these details, lets take look at how
// we use to get such things done using callback based APIs.

// Checking if a path is a file or directory.
