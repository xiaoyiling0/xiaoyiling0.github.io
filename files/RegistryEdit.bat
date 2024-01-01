reg add "HKEY_CLASSES_ROOT\openbilibili" /v "URL Protocol" /t REG_SZ
reg add "HKEY_CLASSES_ROOT\openbilibili\Defaultion" /v "(默认)" /d "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
reg add "HKEY_CLASSES_ROOT\openbilibili\shell\open\command" /v "(默认)" /d "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"