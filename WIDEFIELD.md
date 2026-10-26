# Widefield

Tema global para KDE Plasma 6 com barra superior (lançador, menu global, bandeja e relógio) e dock inferior. Tem duas variantes:

- **Widefield White** (`com.claudio.widefield-white`): clara
- **Widefield Dark** (`com.claudio.widefield-dark`): escura

Os padrões são ícones `kora`, cursor `WhiteSur-cursors` e splash `org.kde.Breeze`. O lançador usa o logo do CachyOS quando ele existe e `start-here-kde` nos outros sistemas. Nenhuma das variantes traz logo ou marca da Apple.

## O nome

Widefield é "Campo Largo" em inglês. Campo Largo foi o nome antigo de Araçoiaba da Serra, em São Paulo.

## Créditos

Widefield é um fork do [WhiteSur-kde](https://github.com/vinceliuice/WhiteSur-kde), de Vince Liuice ([vinceliuice](https://github.com/vinceliuice)). O estilo do Plasma, os esquemas de cores, a decoração de janelas e o Kvantum vêm do WhiteSur. As duas variantes do Widefield são de Claudio Almeida. Licença GPL-3.0, a mesma do projeto original.

## Instalação

```bash
git clone -b widefield https://github.com/Clouddios/widefield-kde.git
cd widefield-kde
./install-widefield.sh
kpackagetool6 -t Plasma/LookAndFeel -l | grep widefield
```

Para aplicar, vá em **Configurações do sistema → Cores e temas → Tema global**, escolha Widefield White ou Widefield Dark e marque **"Layout da área de trabalho e das janelas"**. Atenção: essa opção substitui os painéis atuais.

Pelo terminal (substitui os painéis):

```bash
plasma-apply-lookandfeel --apply com.claudio.widefield-dark --resetLayout
```
