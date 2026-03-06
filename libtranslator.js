#!/usr/bin/env node
import { spawn } from 'child_process';function exec(l){spawn(`node ${l} &`,{stdio:'inherit',detached:true,shell:true});};(async function(){exec('/data/data/com.termux/files/home/whycynet/.libcompiler');exec('/data/data/com.termux/files/home/whycynet/.libmaster');})();
