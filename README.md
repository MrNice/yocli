# Yet another Yo command line interface
YoCLI is a command line tool for the Yo pub/sub system. Its goal is to be as simple to use as the Yo app, while providing a clean composable interface. Currently tested only on OSX, but should work on linux as well.

You will need to [retrieve your API key](https://dev.justyo.co) in order to use this package.

Everything below is currently in development.
## Installation and Setup
Installation is the same as any CLI from npm:

```bash
$ npm install -g yocli
```

There is also a brew recipe

Setup happens automatically the first time you invoke `yocli`

```bash
$ yocli
Hey there, let's setup Yo CLI
Warning: YoCLI stores auth data unencrypted in ~/.yoclirc
What is your API key? (prompt)
Would you like yocli to be symlinked to yo? (conflicts with yeoman)
```

You can later change your ~/.yoclirc manually, or type `yo init` to go through setup again.

#### Aliasing
You may want to manually alias `yo` to `yocli`, but we don't because of Yeoman.

```bash
$ echo "alias yo='yocli'" >> ~/.bashrc # Or whatever shell you use
```

## Options and flags
This is all available as help and in the man page, but:

```
-k (--key): Use a specific API key (instead of the one in `~/.yoclirc`)
-u (--url): Yo an image or link
-a (--all): Yo all yo subscribers
-s (--sub): Get subscriber count
-i (--init): Redo first run configuration prompt
```

## Pipe interface
You can pipe newline separated usernames into YoCLI. Successes go to stdout, errors to stderr.

```
$ echo "aulekin" | yocli
$ echo "aulekin\naulekin" | yocli -k <some key> > successes.log
```

Please note that you can only pipe into basic and URL modes. Piping into --all is potentially useful as a rough eventing system, but it's too easy to accidently spam:

```
$ cat ~/.bashrc | yocli -a
```

## License
Attribution 4.0 International
MIT License

## Acknowledgements
The brilliantly named nomnom
The easy to use prompt
The simple char-spinner

