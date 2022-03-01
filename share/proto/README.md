Run bellow command to convert .proto to js file.
- Windows
<code>.\protoc.exe --js_out=import_style=commonjs,binary:out .\card-game.proto</code>

- MacOS
<code>./protoc --js_out=import_style=commonjs,binary:out card-game.proto</code>