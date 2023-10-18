#!/bin/bash

# File to modify = var getZlibSync
# Route = node_modules/@discordjs/ws/dist/index.js

sed -i 's/var getZlibSync = lazy2(async () => import("zlib-sync").then((mod) => mod.default).catch(() => null));;/var getZlibSync = null;/g' node_modules/@discordjs/ws/dist/index.js