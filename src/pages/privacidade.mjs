import { esc, formatDate, hostOf } from '../lib/html.mjs';
import { addressLines } from '../lib/components.mjs';

export const page = {
  path: '/politica-de-privacidade/',
  nav: 'privacidade',
  title: 'Política de Privacidade | 4D Desenvolvimento Pessoal Ltda.',
  description: 'Política de Privacidade do site institucional da 4D Desenvolvimento Pessoal Ltda. (CNPJ 49.142.726/0001-58), em conformidade com a LGPD.',
  breadcrumb: [{ name: 'Política de Privacidade', path: '/politica-de-privacidade/' }],
};

export function render(config) {
  const site = hostOf(config.canonicalUrl);
  const analytics = Boolean(config.analytics?.googleId);
  return `<section class="pagina-topo">
      <div class="container">
        <p class="rotulo">Documento legal</p>
        <h1>Política de Privacidade</h1>
        <p class="pagina-topo__sub">Última atualização: ${formatDate(config.legalUpdatedAt)}</p>
      </div>
    </section>

    <section class="secao secao--texto">
      <div class="container texto">
        <h2>1. Quem é o controlador</h2>
        <p>Este site institucional (${esc(site)}) é mantido por <strong>${esc(config.legalName)}</strong>, CNPJ ${esc(config.cnpj)}, com endereço em ${addressLines(config).map(esc).join(', ')}, que atua como controladora dos dados pessoais eventualmente tratados por meio dele, nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).</p>

        <h2>2. Alcance desta política</h2>
        <p>Esta política se aplica exclusivamente a este site institucional. Cursos, plataformas, aplicativos, checkouts e demais produtos da 4D podem ter políticas de privacidade próprias, apresentadas no respectivo produto.</p>

        <h2>3. Dados que este site coleta</h2>
        <p>Este site é informativo. Ele <strong>não possui formulários</strong>, cadastro, área de login ou compras, e <strong>não solicita</strong> que você informe dados pessoais.</p>
        <p>Como em qualquer site, o servidor de hospedagem registra automaticamente dados técnicos de acesso — como endereço IP, data e hora, página acessada, navegador e sistema operacional. Esses registros são usados apenas para o funcionamento, a segurança e a estabilidade do site, e são mantidos pelo provedor de hospedagem conforme suas próprias práticas e o Marco Civil da Internet (Lei nº 12.965/2014).</p>

        <h2>4. Cookies, análise e terceiros</h2>
        ${analytics ? `<p>Este site utiliza o <strong>Google Analytics</strong>, serviço de análise de audiência do Google, para entender de forma agregada como o site é usado — por exemplo, quantas pessoas o visitam, quais páginas são acessadas, por quanto tempo, a partir de qual região aproximada, dispositivo e navegador. Para isso, o Google Analytics utiliza cookies e identificadores on-line armazenados no seu navegador.</p>
        <p>A 4D não utiliza essas informações para identificar pessoas, não ativa recursos de publicidade no Google Analytics e não utiliza pixels de publicidade. Os dados são processados pelo Google, inclusive em servidores fora do Brasil, conforme a <a class="link" href="https://policies.google.com/privacy?hl=pt-BR" rel="noopener">Política de Privacidade do Google</a>.</p>
        <p>Você pode bloquear ou apagar cookies nas configurações do seu navegador, ou impedir a coleta pelo Google Analytics instalando o <a class="link" href="https://tools.google.com/dlpage/gaoptout?hl=pt-BR" rel="noopener">complemento de desativação do Google Analytics</a>. O site continua funcionando normalmente sem esses cookies.</p>
        <p>As fontes e os demais arquivos do site são servidos pelo próprio site.</p>` : `<p>Este site <strong>não utiliza cookies</strong>, ferramentas de análise de audiência, pixels de publicidade ou rastreadores. As fontes e demais arquivos são servidos pelo próprio site, sem carregar conteúdo de terceiros.</p>`}
        <p>O site contém um link para a consulta pública de CNPJ da Receita Federal. Ao acessá-lo, você passa a navegar em um serviço de terceiros, sujeito às regras dele.</p>

        <h2>5. Base legal e finalidade</h2>
        <p>Os registros técnicos de acesso são tratados com base no legítimo interesse (art. 7º, IX, da LGPD) e no cumprimento de obrigação legal (art. 7º, II), com a finalidade de manter o site seguro e em funcionamento.</p>${analytics ? `
        <p>Os dados de análise de audiência são tratados com base no legítimo interesse (art. 7º, IX, da LGPD), com a finalidade de medir o uso do site de forma agregada e melhorar seu conteúdo. A transferência internacional decorrente do uso do Google Analytics observa o art. 33 da LGPD.</p>` : ''}

        <h2>6. Compartilhamento</h2>
        <p>A 4D não vende nem comercializa dados pessoais. Os registros técnicos podem ser acessados pelo provedor de hospedagem, na medida necessária à prestação do serviço,${analytics ? ' os dados de análise de audiência são processados pelo Google, conforme descrito acima,' : ''} e por autoridades, quando houver determinação legal.</p>

        <h2>7. Seus direitos</h2>
        <p>Nos termos do art. 18 da LGPD, você pode solicitar confirmação da existência de tratamento, acesso, correção, anonimização, eliminação, informações sobre compartilhamento e demais direitos previstos em lei. As solicitações podem ser feitas por correspondência ao endereço indicado nesta política ou pelos canais de atendimento informados nos produtos e serviços da 4D.</p>

        <h2>8. Segurança</h2>
        <p>O site é servido exclusivamente por conexão segura (HTTPS). Mesmo assim, nenhum sistema é totalmente imune a incidentes; caso ocorra algum que possa acarretar risco relevante, a 4D adotará as medidas previstas na LGPD.</p>

        <h2>9. Alterações</h2>
        <p>Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização é sempre indicada no topo desta página.</p>
      </div>
    </section>`;
}
