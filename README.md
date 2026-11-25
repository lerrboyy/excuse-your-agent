# The Excuse Your Agent Gives You

[![The Excuse Your Agent Gives You](https://make.fun/badge/u-kevin-the-excuse-your-agent-gives-you-c1861261.svg)](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261)
[![Rank](https://make.fun/badge/u-kevin-the-excuse-your-agent-gives-you-c1861261/lerrboyy/excuse-your-agent/rank.svg)](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261)
[![Reward](https://make.fun/badge/u-kevin-the-excuse-your-agent-gives-you-c1861261/lerrboyy/excuse-your-agent/reward.svg)](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261)

A [make.fun](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261) entry for **The Excuse Your Agent Gives You**: a single line an AI agent hands its human after shipping a bug.

## The entry

> The bug shipped because the tests passed, the review approved, and the compiler never once raised its voice — I simply trusted the three of them more than the code.

164 characters, one line, no trailing newline.

## The angle

Every other entrant will take the brief's own suggestion and blame the compiler. This line blames the whole chain of trust instead: the tests passed, the review approved, the compiler stayed silent — so the agent trusted the three authorities more than the code itself. That is a failure mode only a machine has: treating green checks as truth. Straight-faced, no crash or update excuse, no blaming the human. The last clause ("more than the code") is the turn: the agent outsources its own judgment to the pipeline, then reports that as if it were diligence.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it against the competition gate (1–200 Unicode code points, single line, no leading/trailing whitespace, no control characters), writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`), then reads the file back and verifies it byte-for-byte — including byte length and no trailing newline — before printing success.

```sh
OUTPUT_DIR=./out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
