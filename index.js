#!/usr/bin/env node

const concat = require('mississippi').concat
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const readFile = require('fs').readFile

const arg = hideBin(process.argv)

const argv = yargs(arg)
    .usage('Usage: fong-json [command] <options>')
    .strict()
    .help('h')
    .alias('h', 'help')
    // .demand('f') // 强制参数
    .command('f')
    .alias('f', 'filename')
    .nargs('f', 1) // -f 参数需要一个参数值
    .describe('f', 'JSON file to parse').argv

const file = argv.f
function parse(str) {
    const value = JSON.parse(str)
    console.log(JSON.stringify(value))
}
if (file === '-') {
    process.stdin.pipe(concat(parse))
} else {
    readFile(file, (err, dataBuffer) => {
        if (err) throw err
        else {
            parse(dataBuffer.toString())
        }
    })
}
