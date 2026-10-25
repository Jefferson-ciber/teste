# Portal Regional Jaraguá - SP

Portal interno estático da Regional Jaraguá - SP. A interface roda no navegador e usa Supabase para autenticação e dados; não há etapa de build nem dependências locais neste repositório.

## Estrutura

```text
.
├── index.html              # Página do portal
├── manifest.webmanifest    # Metadados e ícones do PWA
├── service-worker.js       # Cache do shell estático
├── assets/
│   ├── css/styles.css      # Estilos
│   ├── js/app.js           # Lógica e integrações do portal
│   └── images/             # Imagens e ícones para iPhone
└── README.md               # Configuração e manutenção
```

As bibliotecas externas (Tailwind CSS, Supabase JS, Font Awesome e fontes) são carregadas por CDN. O portal continua podendo ser servido como site estático, mantendo `index.html` na raiz. O projeto também inclui suporte a PWA para instalação na Tela de Início do iPhone.

## Executar localmente

Abra `index.html` no navegador ou sirva esta pasta com qualquer servidor HTTP estático. Para validar recursos externos e autenticação localmente, prefira o servidor HTTP e configure os endereços permitidos no Supabase.

## Configuração do Supabase

A URL do projeto e a chave pública (`publishable`/`anon`) ficam no início de `assets/js/app.js`. Essas informações são entregues ao navegador e não são segredos. Nunca coloque a `service_role` key no site. As tabelas e funções precisam aplicar políticas RLS e permissões adequadas no Supabase.

## Onde fazer alterações

- Conteúdo, formulários e estrutura visual: `index.html`.
- Layout, cores, responsividade e componentes visuais: `assets/css/styles.css`.
- Regras de negócio, autenticação, chamadas ao Supabase e interações: `assets/js/app.js`.
- Logotipos, ícones e fotografias: `assets/images/`.

O JavaScript permanece em um arquivo porque as telas administrativas, de integrante e de viagem compartilham estado e funções globais. As seções existentes no arquivo estão marcadas por comentários (por exemplo, integrantes, eventos, organização regional, viagens e ajuda). Para uma mudança maior, a evolução recomendada é separar esses domínios gradualmente, usando módulos ES e dependências explícitas entre eles.

## Observações de manutenção

- `index.html` referencia `assets/images/comando.jpg`, mas esse arquivo não estava presente na pasta original. A imagem é removida automaticamente pelo navegador quando não carrega; adicione-a a `assets/images/` para exibir a seção de comando.
- Algumas imagens da pasta são mantidas como arquivos do projeto mesmo quando não aparecem diretamente no HTML. Antes de removê-las, confira referências dinâmicas no JavaScript e o uso operacional.
- Mantenha nomes de arquivos e referências relativos ao diretório do projeto para que a publicação estática continue funcionando.

## Instalar no iPhone para testar

O portal é um PWA (aplicativo web instalável), não um arquivo IPA da App Store. Para instalá-lo, publique esta pasta em um endereço HTTPS. Depois, no iPhone:

1. Abra o endereço do portal no Safari e entre na sua conta.
2. Toque em **Compartilhar** e escolha **Adicionar à Tela de Início**.
3. Se aparecer, ative **Abrir como Aplicativo Web**; toque em **Adicionar** e abra o ícone criado na Tela de Início.

O service worker guarda apenas a estrutura estática básica para abrir a interface sem conexão. A autenticação, o conteúdo e as operações do portal continuam dependendo da conexão com o Supabase. A instalação pelo endereço HTTPS é necessária; abrir o arquivo `index.html` diretamente não habilita os recursos PWA.