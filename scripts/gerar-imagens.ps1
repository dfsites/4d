# Gera as imagens de compartilhamento (Open Graph) e os ícones em src/assets/img.
# Uso: powershell -ExecutionPolicy Bypass -File scripts/gerar-imagens.ps1
Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot '..\src\assets\img'
$fonte = 'Segoe UI'

function Cor([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function Arredondado([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  $p
}

function Novo([int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.InterpolationMode = 'HighQualityBicubic'
  @($bmp, $g)
}

function Gradiente([float]$x, [float]$y, [float]$w, [float]$h, [string]$a, [string]$b) {
  New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.RectangleF $x, $y, $w, $h), (Cor $a), (Cor $b), 45
}

function TextoCentro($g, [string]$texto, [float]$tamanho, $pincel, [float]$cx, [float]$cy, $estilo = 'Bold') {
  $f = New-Object System.Drawing.Font $fonte, $tamanho, ([System.Drawing.FontStyle]$estilo), ([System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = 'Center'; $fmt.LineAlignment = 'Center'
  $g.DrawString($texto, $f, $pincel, $cx, $cy, $fmt)
}

function Icone([int]$tam, [string]$arquivo, [bool]$margem = $false) {
  $bmp, $g = Novo $tam $tam
  if ($margem) { $g.Clear((Cor '#5b3df5')) }
  $raio = if ($margem) { 0 } else { $tam * 0.25 }
  $fundo = Gradiente 0 0 $tam $tam '#5b3df5' '#8f6bff'
  if ($raio -gt 0) { $g.FillPath($fundo, (Arredondado 0 0 $tam $tam $raio)) } else { $g.FillRectangle($fundo, 0, 0, $tam, $tam) }
  $escala = if ($margem) { 0.34 } else { 0.44 }
  TextoCentro $g '4D' ($tam * $escala) ([System.Drawing.Brushes]::White) ($tam / 2) ($tam / 2 + $tam * 0.02)
  $bmp.Save((Join-Path $out $arquivo), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

# Open Graph 1200x630
$bmp, $g = Novo 1200 630
$g.Clear((Cor '#16132b'))
$brilho = New-Object System.Drawing.Drawing2D.PathGradientBrush (Arredondado 560 -200 900 900 450)
$brilho.CenterColor = [System.Drawing.Color]::FromArgb(90, 91, 61, 245)
$brilho.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 22, 19, 43))
$g.FillEllipse($brilho, 560, -200, 900, 900)

$branco = [System.Drawing.Brushes]::White
$suave = New-Object System.Drawing.SolidBrush (Cor '#c9c3ea')
$ambar = New-Object System.Drawing.SolidBrush (Cor '#ffb547')
$f = { param($t, $e) New-Object System.Drawing.Font $fonte, $t, ([System.Drawing.FontStyle]$e), ([System.Drawing.GraphicsUnit]::Pixel) }

$g.DrawString('EDUCAÇÃO · DESENVOLVIMENTO · TECNOLOGIA', (& $f 22 'Bold'), $ambar, 80, 118)
$g.DrawString('4D Desenvolvimento', (& $f 68 'Bold'), $branco, 74, 162)
$g.DrawString('Pessoal', (& $f 68 'Bold'), $branco, 74, 242)
$g.DrawString("Soluções educacionais, digitais e`ninstitucionais a partir do Método 4D.", (& $f 30 'Regular'), $suave, 80, 346)
$g.DrawString('www.4ddesenvolvimentopessoal.com.br', (& $f 24 'Bold'), $branco, 80, 500)

$cores = @(@('#5b3df5', '#7d63ff', 'White'), @('#8f6bff', '#b49bff', 'White'), @('#ff9f43', '#ffb547', '#16132b'), @('#3a3558', '#56507a', 'White'))
$nomes = @('Descobrir', 'Decidir', 'Desenvolver', 'Destacar')
$x0 = 790; $y0 = 145; $lado = 160; $gap = 16
for ($i = 0; $i -lt 4; $i++) {
  $x = $x0 + ($i % 2) * ($lado + $gap); $y = $y0 + [math]::Floor($i / 2) * ($lado + $gap)
  $g.FillPath((Gradiente $x $y $lado $lado $cores[$i][0] $cores[$i][1]), (Arredondado $x $y $lado $lado 18))
  $cor = if ($cores[$i][2] -eq 'White') { $branco } else { New-Object System.Drawing.SolidBrush (Cor $cores[$i][2]) }
  $ty = if ($i -lt 2) { $y + 50 } else { $y + $lado - 50 }
  TextoCentro $g $nomes[$i] 21 $cor ($x + $lado / 2) $ty
}
$cx = $x0 + $lado + $gap / 2; $cy = $y0 + $lado + $gap / 2
$g.FillEllipse($branco, $cx - 56, $cy - 56, 112, 112)
TextoCentro $g '4D' 44 (New-Object System.Drawing.SolidBrush (Cor '#5b3df5')) $cx ($cy + 2)
$bmp.Save((Join-Path $out 'og-4d.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

Icone 180 'apple-touch-icon.png' $true
Icone 192 'icon-192.png'
Icone 512 'icon-512.png'
Icone 512 'icon-maskable-512.png' $true

# favicon.ico com PNG 32x32 e 48x48 embutidos
$imgs = foreach ($t in 32, 48) {
  $bmp, $g = Novo $t $t
  $g.FillPath((Gradiente 0 0 $t $t '#5b3df5' '#8f6bff'), (Arredondado 0 0 $t $t ($t * 0.25)))
  TextoCentro $g '4D' ($t * 0.46) $branco ($t / 2) ($t / 2 + 1)
  $ms = New-Object System.IO.MemoryStream
  $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  , @($t, $ms.ToArray())
}
$ico = New-Object System.IO.MemoryStream
$w = New-Object System.IO.BinaryWriter $ico
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]$imgs.Count)
$offset = 6 + 16 * $imgs.Count
foreach ($im in $imgs) {
  $w.Write([byte]$im[0]); $w.Write([byte]$im[0]); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([uint16]1); $w.Write([uint16]32); $w.Write([uint32]$im[1].Length); $w.Write([uint32]$offset)
  $offset += $im[1].Length
}
foreach ($im in $imgs) { $w.Write($im[1]) }
$w.Flush()
[System.IO.File]::WriteAllBytes((Join-Path $PSScriptRoot '..\src\static\favicon.ico'), $ico.ToArray())
Write-Output 'Imagens geradas.'
