# FrontendServer
Um den Frontend-Server aufzusetzen, müssen Sie zunächst npm install ausführen. Anschließend müssen Sie Port 80 in Ihrer Firewall freigeben.

Starten Sie den Frontend-Server mit dem Befehl sudo node FrontendService.js.

Wenn Änderungen an der Website vorgenommen werden sollen, können Sie diese leicht im src-Ordner vornehmen. Dort finden Sie alle Quellcodes der Website.

Nachdem Sie Änderungen vorgenommen haben, müssen Sie diese mit npm start build kompilieren. Der entstandene build-Ordner muss dann nur noch in den client-Ordner verschoben werden, wobei der alte build-Ordner gelöscht oder überschrieben wird.