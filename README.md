# RFIDReaderConnect Web SDK — distribution

Compiled, obfuscated artifacts built from RFIDReader/RFIDReaderConnect-ts commit `4af78f66d45e546733864d3b63098c55ecd9c685`.

This revision adds `WebSocketTransport` for buffered continuous inventory over `ws://reader.local/stream`, validates module CRCs, bounds tag parsing, and serializes writes. It retains random-key response deobfuscation. Deploy the companion firmware with `/stream` before selecting this transport.

Install using the immutable commit linked from the companion ez-controller pull request. This branch is a review artifact; no npm version or release tag has been published.

Only obfuscated ESM/CJS bundles, public types, and packaging metadata are included. Source-only build scripts and development dependencies are removed so Git dependency installation does not try to rebuild unpublished source.

See [LICENSE](LICENSE).
