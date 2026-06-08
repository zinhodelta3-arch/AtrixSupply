# AGENTS.md — ATRIX SUPPLY — Revisão Total de Front-end, Back-end e Banco de Dados

> Arquivo operacional para o Codex realizar uma revisão profunda do projeto ATRIX SUPPLY.
> Objetivo: revisar tudo antes de qualquer alteração: arquitetura, front-end, back-end, banco,
> autenticação, autorização, rotas, APIs, validações, UX/UI, segurança, dados, testes e riscos.
>
> Este arquivo é focado em AUDITORIA/REVISÃO. Não é uma ordem inicial de refatoração.
> O Codex deve primeiro investigar, mapear, classificar problemas e gerar relatório técnico.

---

## 0. Regra central

001. Não implementar alterações antes de revisar.
002. Não apagar arquivos antes de entender dependências.
003. Não renomear rotas antes de mapear todos os usos.
004. Não alterar models sem conferir controllers, routers e front.
005. Não alterar banco sem sugerir migration e impacto.
006. Não corrigir visual antes de entender regra de negócio.
007. Não confiar em comentários antigos do código.
008. Não confiar apenas no nome do arquivo.
009. Não confiar apenas no localStorage do front para segurança.
010. Não considerar revisão finalizada sem testar rotas principais.

---

## 1. Escopo da revisão

001. Revisar estrutura geral do repositório.
002. Revisar arquitetura front-end.
003. Revisar arquitetura back-end.
004. Revisar banco de dados.
005. Revisar rotas públicas.
006. Revisar rotas protegidas.
007. Revisar autenticação.
008. Revisar autorização por tipo de usuário.
009. Revisar upload e exibição de imagens.
010. Revisar produtos.
011. Revisar pedidos.
012. Revisar encomendas.
013. Revisar orçamentos.
014. Revisar logística.
015. Revisar suporte.
016. Revisar notificações.
017. Revisar dashboard admin.
018. Revisar painel fornecedor.
019. Revisar páginas de cliente.
020. Revisar home, header, footer e layout.
021. Revisar CSS global e CSS por página.
022. Revisar responsividade.
023. Revisar acessibilidade.
024. Revisar tratamento de erros.
025. Revisar mensagens exibidas ao usuário.
026. Revisar validações do front.
027. Revisar validações do back.
028. Revisar consistência de campos.
029. Revisar consultas SQL.
030. Revisar riscos de segurança.
031. Revisar testes existentes.
032. Revisar ausência de testes.
033. Revisar build/lint.
034. Revisar documentação.
035. Revisar variáveis de ambiente.
036. Revisar deploy local.
037. Revisar dependências.
038. Revisar imports e arquivos mortos.
039. Revisar duplicações de lógica.
040. Revisar regressões prováveis.

---

## 2. Produto esperado da revisão

Ao final, o Codex deve gerar um relatório com:

001. Sumário executivo.
002. Mapa do projeto.
003. Mapa de rotas front-end.
004. Mapa de rotas back-end.
005. Mapa de tabelas do banco.
006. Lista de bugs críticos.
007. Lista de bugs altos.
008. Lista de bugs médios.
009. Lista de bugs baixos.
010. Lista de riscos de segurança.
011. Lista de inconsistências de dados.
012. Lista de inconsistências de UI/UX.
013. Lista de endpoints quebrados.
014. Lista de páginas sem proteção.
015. Lista de páginas com proteção incorreta.
016. Lista de campos divergentes entre front/back/banco.
017. Lista de queries perigosas.
018. Lista de validações faltantes.
019. Lista de melhorias recomendadas.
020. Plano de correção por prioridade.
021. Testes manuais recomendados.
022. Testes automatizados recomendados.
023. Pendências dependentes de decisão humana.
024. Arquivos que devem ser alterados numa próxima fase.
025. Arquivos que não devem ser alterados.
026. Riscos de regressão.
027. Checklist final.

---

## 3. Severidade

Classifique cada problema como:

- CRÍTICO: quebra login, segurança, perda de dados, acesso indevido, pedido/encomenda incorreto.
- ALTO: quebra fluxo principal, imagem, pagamento, pedido, upload, admin, fornecedor.
- MÉDIO: UI confusa, validação incompleta, inconsistência recuperável.
- BAIXO: texto, estilo, organização, pequenos problemas de DX.
- MELHORIA: não é bug, mas aumenta qualidade.

Formato:
`[SEVERIDADE] [ÁREA] [ARQUIVO] [PROBLEMA] [IMPACTO] [RECOMENDAÇÃO]`

---

## 4. Regras de investigação

001. Para cada página do front, identificar quais endpoints ela chama.
002. Para cada endpoint, identificar controller e model.
003. Para cada model, identificar tabela e campos usados.
004. Para cada tabela, identificar quem escreve e quem lê.
005. Para cada status, identificar todos os valores possíveis.
006. Para cada upload, identificar pasta de destino e URL pública.
007. Para cada autenticação, identificar origem do token e middleware.
008. Para cada autorização, identificar regra por tipo de usuário.
009. Para cada erro visual, identificar CSS responsável.
010. Para cada bug, registrar evidência.

---

## 5. Não corrigir ainda

Este AGENTS.md é para revisão. O Codex pode propor correções, mas deve separar:
- Achados confirmados.
- Achados prováveis.
- Correções recomendadas.
- Correções de alto risco.
- Correções simples.
- Correções que exigem alteração no banco.
- Correções que exigem decisão do dono do projeto.

---


---

## 6. Revisão detalhada — FRONTEND_ESTRUTURA

### FRONTEND_ESTRUTURA / src/app
00001. [FRONTEND_ESTRUTURA] [src/app] identificar arquivo responsável.
00002. [FRONTEND_ESTRUTURA] [src/app] identificar dependências diretas.
00003. [FRONTEND_ESTRUTURA] [src/app] identificar dependências indiretas.
00004. [FRONTEND_ESTRUTURA] [src/app] verificar se há código morto.
00005. [FRONTEND_ESTRUTURA] [src/app] verificar se há import não usado.
00006. [FRONTEND_ESTRUTURA] [src/app] verificar se há variável indefinida.
00007. [FRONTEND_ESTRUTURA] [src/app] verificar se há duplicação de lógica.
00008. [FRONTEND_ESTRUTURA] [src/app] verificar se há comentário desatualizado.
00009. [FRONTEND_ESTRUTURA] [src/app] verificar se a regra de negócio está clara.
00010. [FRONTEND_ESTRUTURA] [src/app] verificar se há tratamento de erro.
00011. [FRONTEND_ESTRUTURA] [src/app] verificar se o erro é amigável para usuário comum.
00012. [FRONTEND_ESTRUTURA] [src/app] verificar se erro técnico fica apenas no console ou relatório.
00013. [FRONTEND_ESTRUTURA] [src/app] verificar se há validação de entrada.
00014. [FRONTEND_ESTRUTURA] [src/app] verificar se há validação de saída.
00015. [FRONTEND_ESTRUTURA] [src/app] verificar se há validação de permissão.
00016. [FRONTEND_ESTRUTURA] [src/app] verificar se há risco de acesso indevido.
00017. [FRONTEND_ESTRUTURA] [src/app] verificar se há risco de dados de outro usuário.
00018. [FRONTEND_ESTRUTURA] [src/app] verificar se há risco de SQL injection.
00019. [FRONTEND_ESTRUTURA] [src/app] verificar se há risco de XSS.
00020. [FRONTEND_ESTRUTURA] [src/app] verificar se há risco de upload inseguro.
00021. [FRONTEND_ESTRUTURA] [src/app] verificar se imagens têm fallback correto.
00022. [FRONTEND_ESTRUTURA] [src/app] verificar se /core.png aparece como placeholder.
00023. [FRONTEND_ESTRUTURA] [src/app] verificar se /logo.png está disponível.
00024. [FRONTEND_ESTRUTURA] [src/app] verificar se rotas batem entre front e back.
00025. [FRONTEND_ESTRUTURA] [src/app] verificar se payload esperado bate com payload real.
00026. [FRONTEND_ESTRUTURA] [src/app] verificar se campos do banco batem com model.
00027. [FRONTEND_ESTRUTURA] [src/app] verificar se controller retorna padrão consistente.
00028. [FRONTEND_ESTRUTURA] [src/app] verificar se paginação existe e funciona.
00029. [FRONTEND_ESTRUTURA] [src/app] verificar se filtros podem ser combinados.
00030. [FRONTEND_ESTRUTURA] [src/app] verificar se dados null quebram a tela.
00031. [FRONTEND_ESTRUTURA] [src/app] verificar se array vazio tem estado visual.
00032. [FRONTEND_ESTRUTURA] [src/app] verificar se loading impede tela quebrada.
00033. [FRONTEND_ESTRUTURA] [src/app] verificar se modal fecha corretamente.
00034. [FRONTEND_ESTRUTURA] [src/app] verificar se header não sobrepõe conteúdo.
00035. [FRONTEND_ESTRUTURA] [src/app] verificar se layout é responsivo.
00036. [FRONTEND_ESTRUTURA] [src/app] verificar se contraste é legível.
00037. [FRONTEND_ESTRUTURA] [src/app] verificar se texto é humano e não técnico.
00038. [FRONTEND_ESTRUTURA] [src/app] verificar se existe teste manual possível.
00039. [FRONTEND_ESTRUTURA] [src/app] classificar severidade.
00040. [FRONTEND_ESTRUTURA] [src/app] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / app
00041. [FRONTEND_ESTRUTURA] [app] identificar arquivo responsável.
00042. [FRONTEND_ESTRUTURA] [app] identificar dependências diretas.
00043. [FRONTEND_ESTRUTURA] [app] identificar dependências indiretas.
00044. [FRONTEND_ESTRUTURA] [app] verificar se há código morto.
00045. [FRONTEND_ESTRUTURA] [app] verificar se há import não usado.
00046. [FRONTEND_ESTRUTURA] [app] verificar se há variável indefinida.
00047. [FRONTEND_ESTRUTURA] [app] verificar se há duplicação de lógica.
00048. [FRONTEND_ESTRUTURA] [app] verificar se há comentário desatualizado.
00049. [FRONTEND_ESTRUTURA] [app] verificar se a regra de negócio está clara.
00050. [FRONTEND_ESTRUTURA] [app] verificar se há tratamento de erro.
00051. [FRONTEND_ESTRUTURA] [app] verificar se o erro é amigável para usuário comum.
00052. [FRONTEND_ESTRUTURA] [app] verificar se erro técnico fica apenas no console ou relatório.
00053. [FRONTEND_ESTRUTURA] [app] verificar se há validação de entrada.
00054. [FRONTEND_ESTRUTURA] [app] verificar se há validação de saída.
00055. [FRONTEND_ESTRUTURA] [app] verificar se há validação de permissão.
00056. [FRONTEND_ESTRUTURA] [app] verificar se há risco de acesso indevido.
00057. [FRONTEND_ESTRUTURA] [app] verificar se há risco de dados de outro usuário.
00058. [FRONTEND_ESTRUTURA] [app] verificar se há risco de SQL injection.
00059. [FRONTEND_ESTRUTURA] [app] verificar se há risco de XSS.
00060. [FRONTEND_ESTRUTURA] [app] verificar se há risco de upload inseguro.
00061. [FRONTEND_ESTRUTURA] [app] verificar se imagens têm fallback correto.
00062. [FRONTEND_ESTRUTURA] [app] verificar se /core.png aparece como placeholder.
00063. [FRONTEND_ESTRUTURA] [app] verificar se /logo.png está disponível.
00064. [FRONTEND_ESTRUTURA] [app] verificar se rotas batem entre front e back.
00065. [FRONTEND_ESTRUTURA] [app] verificar se payload esperado bate com payload real.
00066. [FRONTEND_ESTRUTURA] [app] verificar se campos do banco batem com model.
00067. [FRONTEND_ESTRUTURA] [app] verificar se controller retorna padrão consistente.
00068. [FRONTEND_ESTRUTURA] [app] verificar se paginação existe e funciona.
00069. [FRONTEND_ESTRUTURA] [app] verificar se filtros podem ser combinados.
00070. [FRONTEND_ESTRUTURA] [app] verificar se dados null quebram a tela.
00071. [FRONTEND_ESTRUTURA] [app] verificar se array vazio tem estado visual.
00072. [FRONTEND_ESTRUTURA] [app] verificar se loading impede tela quebrada.
00073. [FRONTEND_ESTRUTURA] [app] verificar se modal fecha corretamente.
00074. [FRONTEND_ESTRUTURA] [app] verificar se header não sobrepõe conteúdo.
00075. [FRONTEND_ESTRUTURA] [app] verificar se layout é responsivo.
00076. [FRONTEND_ESTRUTURA] [app] verificar se contraste é legível.
00077. [FRONTEND_ESTRUTURA] [app] verificar se texto é humano e não técnico.
00078. [FRONTEND_ESTRUTURA] [app] verificar se existe teste manual possível.
00079. [FRONTEND_ESTRUTURA] [app] classificar severidade.
00080. [FRONTEND_ESTRUTURA] [app] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / components
00081. [FRONTEND_ESTRUTURA] [components] identificar arquivo responsável.
00082. [FRONTEND_ESTRUTURA] [components] identificar dependências diretas.
00083. [FRONTEND_ESTRUTURA] [components] identificar dependências indiretas.
00084. [FRONTEND_ESTRUTURA] [components] verificar se há código morto.
00085. [FRONTEND_ESTRUTURA] [components] verificar se há import não usado.
00086. [FRONTEND_ESTRUTURA] [components] verificar se há variável indefinida.
00087. [FRONTEND_ESTRUTURA] [components] verificar se há duplicação de lógica.
00088. [FRONTEND_ESTRUTURA] [components] verificar se há comentário desatualizado.
00089. [FRONTEND_ESTRUTURA] [components] verificar se a regra de negócio está clara.
00090. [FRONTEND_ESTRUTURA] [components] verificar se há tratamento de erro.
00091. [FRONTEND_ESTRUTURA] [components] verificar se o erro é amigável para usuário comum.
00092. [FRONTEND_ESTRUTURA] [components] verificar se erro técnico fica apenas no console ou relatório.
00093. [FRONTEND_ESTRUTURA] [components] verificar se há validação de entrada.
00094. [FRONTEND_ESTRUTURA] [components] verificar se há validação de saída.
00095. [FRONTEND_ESTRUTURA] [components] verificar se há validação de permissão.
00096. [FRONTEND_ESTRUTURA] [components] verificar se há risco de acesso indevido.
00097. [FRONTEND_ESTRUTURA] [components] verificar se há risco de dados de outro usuário.
00098. [FRONTEND_ESTRUTURA] [components] verificar se há risco de SQL injection.
00099. [FRONTEND_ESTRUTURA] [components] verificar se há risco de XSS.
00100. [FRONTEND_ESTRUTURA] [components] verificar se há risco de upload inseguro.
00101. [FRONTEND_ESTRUTURA] [components] verificar se imagens têm fallback correto.
00102. [FRONTEND_ESTRUTURA] [components] verificar se /core.png aparece como placeholder.
00103. [FRONTEND_ESTRUTURA] [components] verificar se /logo.png está disponível.
00104. [FRONTEND_ESTRUTURA] [components] verificar se rotas batem entre front e back.
00105. [FRONTEND_ESTRUTURA] [components] verificar se payload esperado bate com payload real.
00106. [FRONTEND_ESTRUTURA] [components] verificar se campos do banco batem com model.
00107. [FRONTEND_ESTRUTURA] [components] verificar se controller retorna padrão consistente.
00108. [FRONTEND_ESTRUTURA] [components] verificar se paginação existe e funciona.
00109. [FRONTEND_ESTRUTURA] [components] verificar se filtros podem ser combinados.
00110. [FRONTEND_ESTRUTURA] [components] verificar se dados null quebram a tela.
00111. [FRONTEND_ESTRUTURA] [components] verificar se array vazio tem estado visual.
00112. [FRONTEND_ESTRUTURA] [components] verificar se loading impede tela quebrada.
00113. [FRONTEND_ESTRUTURA] [components] verificar se modal fecha corretamente.
00114. [FRONTEND_ESTRUTURA] [components] verificar se header não sobrepõe conteúdo.
00115. [FRONTEND_ESTRUTURA] [components] verificar se layout é responsivo.
00116. [FRONTEND_ESTRUTURA] [components] verificar se contraste é legível.
00117. [FRONTEND_ESTRUTURA] [components] verificar se texto é humano e não técnico.
00118. [FRONTEND_ESTRUTURA] [components] verificar se existe teste manual possível.
00119. [FRONTEND_ESTRUTURA] [components] classificar severidade.
00120. [FRONTEND_ESTRUTURA] [components] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / layout
00121. [FRONTEND_ESTRUTURA] [layout] identificar arquivo responsável.
00122. [FRONTEND_ESTRUTURA] [layout] identificar dependências diretas.
00123. [FRONTEND_ESTRUTURA] [layout] identificar dependências indiretas.
00124. [FRONTEND_ESTRUTURA] [layout] verificar se há código morto.
00125. [FRONTEND_ESTRUTURA] [layout] verificar se há import não usado.
00126. [FRONTEND_ESTRUTURA] [layout] verificar se há variável indefinida.
00127. [FRONTEND_ESTRUTURA] [layout] verificar se há duplicação de lógica.
00128. [FRONTEND_ESTRUTURA] [layout] verificar se há comentário desatualizado.
00129. [FRONTEND_ESTRUTURA] [layout] verificar se a regra de negócio está clara.
00130. [FRONTEND_ESTRUTURA] [layout] verificar se há tratamento de erro.
00131. [FRONTEND_ESTRUTURA] [layout] verificar se o erro é amigável para usuário comum.
00132. [FRONTEND_ESTRUTURA] [layout] verificar se erro técnico fica apenas no console ou relatório.
00133. [FRONTEND_ESTRUTURA] [layout] verificar se há validação de entrada.
00134. [FRONTEND_ESTRUTURA] [layout] verificar se há validação de saída.
00135. [FRONTEND_ESTRUTURA] [layout] verificar se há validação de permissão.
00136. [FRONTEND_ESTRUTURA] [layout] verificar se há risco de acesso indevido.
00137. [FRONTEND_ESTRUTURA] [layout] verificar se há risco de dados de outro usuário.
00138. [FRONTEND_ESTRUTURA] [layout] verificar se há risco de SQL injection.
00139. [FRONTEND_ESTRUTURA] [layout] verificar se há risco de XSS.
00140. [FRONTEND_ESTRUTURA] [layout] verificar se há risco de upload inseguro.
00141. [FRONTEND_ESTRUTURA] [layout] verificar se imagens têm fallback correto.
00142. [FRONTEND_ESTRUTURA] [layout] verificar se /core.png aparece como placeholder.
00143. [FRONTEND_ESTRUTURA] [layout] verificar se /logo.png está disponível.
00144. [FRONTEND_ESTRUTURA] [layout] verificar se rotas batem entre front e back.
00145. [FRONTEND_ESTRUTURA] [layout] verificar se payload esperado bate com payload real.
00146. [FRONTEND_ESTRUTURA] [layout] verificar se campos do banco batem com model.
00147. [FRONTEND_ESTRUTURA] [layout] verificar se controller retorna padrão consistente.
00148. [FRONTEND_ESTRUTURA] [layout] verificar se paginação existe e funciona.
00149. [FRONTEND_ESTRUTURA] [layout] verificar se filtros podem ser combinados.
00150. [FRONTEND_ESTRUTURA] [layout] verificar se dados null quebram a tela.
00151. [FRONTEND_ESTRUTURA] [layout] verificar se array vazio tem estado visual.
00152. [FRONTEND_ESTRUTURA] [layout] verificar se loading impede tela quebrada.
00153. [FRONTEND_ESTRUTURA] [layout] verificar se modal fecha corretamente.
00154. [FRONTEND_ESTRUTURA] [layout] verificar se header não sobrepõe conteúdo.
00155. [FRONTEND_ESTRUTURA] [layout] verificar se layout é responsivo.
00156. [FRONTEND_ESTRUTURA] [layout] verificar se contraste é legível.
00157. [FRONTEND_ESTRUTURA] [layout] verificar se texto é humano e não técnico.
00158. [FRONTEND_ESTRUTURA] [layout] verificar se existe teste manual possível.
00159. [FRONTEND_ESTRUTURA] [layout] classificar severidade.
00160. [FRONTEND_ESTRUTURA] [layout] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / globals.css
00161. [FRONTEND_ESTRUTURA] [globals.css] identificar arquivo responsável.
00162. [FRONTEND_ESTRUTURA] [globals.css] identificar dependências diretas.
00163. [FRONTEND_ESTRUTURA] [globals.css] identificar dependências indiretas.
00164. [FRONTEND_ESTRUTURA] [globals.css] verificar se há código morto.
00165. [FRONTEND_ESTRUTURA] [globals.css] verificar se há import não usado.
00166. [FRONTEND_ESTRUTURA] [globals.css] verificar se há variável indefinida.
00167. [FRONTEND_ESTRUTURA] [globals.css] verificar se há duplicação de lógica.
00168. [FRONTEND_ESTRUTURA] [globals.css] verificar se há comentário desatualizado.
00169. [FRONTEND_ESTRUTURA] [globals.css] verificar se a regra de negócio está clara.
00170. [FRONTEND_ESTRUTURA] [globals.css] verificar se há tratamento de erro.
00171. [FRONTEND_ESTRUTURA] [globals.css] verificar se o erro é amigável para usuário comum.
00172. [FRONTEND_ESTRUTURA] [globals.css] verificar se erro técnico fica apenas no console ou relatório.
00173. [FRONTEND_ESTRUTURA] [globals.css] verificar se há validação de entrada.
00174. [FRONTEND_ESTRUTURA] [globals.css] verificar se há validação de saída.
00175. [FRONTEND_ESTRUTURA] [globals.css] verificar se há validação de permissão.
00176. [FRONTEND_ESTRUTURA] [globals.css] verificar se há risco de acesso indevido.
00177. [FRONTEND_ESTRUTURA] [globals.css] verificar se há risco de dados de outro usuário.
00178. [FRONTEND_ESTRUTURA] [globals.css] verificar se há risco de SQL injection.
00179. [FRONTEND_ESTRUTURA] [globals.css] verificar se há risco de XSS.
00180. [FRONTEND_ESTRUTURA] [globals.css] verificar se há risco de upload inseguro.
00181. [FRONTEND_ESTRUTURA] [globals.css] verificar se imagens têm fallback correto.
00182. [FRONTEND_ESTRUTURA] [globals.css] verificar se /core.png aparece como placeholder.
00183. [FRONTEND_ESTRUTURA] [globals.css] verificar se /logo.png está disponível.
00184. [FRONTEND_ESTRUTURA] [globals.css] verificar se rotas batem entre front e back.
00185. [FRONTEND_ESTRUTURA] [globals.css] verificar se payload esperado bate com payload real.
00186. [FRONTEND_ESTRUTURA] [globals.css] verificar se campos do banco batem com model.
00187. [FRONTEND_ESTRUTURA] [globals.css] verificar se controller retorna padrão consistente.
00188. [FRONTEND_ESTRUTURA] [globals.css] verificar se paginação existe e funciona.
00189. [FRONTEND_ESTRUTURA] [globals.css] verificar se filtros podem ser combinados.
00190. [FRONTEND_ESTRUTURA] [globals.css] verificar se dados null quebram a tela.
00191. [FRONTEND_ESTRUTURA] [globals.css] verificar se array vazio tem estado visual.
00192. [FRONTEND_ESTRUTURA] [globals.css] verificar se loading impede tela quebrada.
00193. [FRONTEND_ESTRUTURA] [globals.css] verificar se modal fecha corretamente.
00194. [FRONTEND_ESTRUTURA] [globals.css] verificar se header não sobrepõe conteúdo.
00195. [FRONTEND_ESTRUTURA] [globals.css] verificar se layout é responsivo.
00196. [FRONTEND_ESTRUTURA] [globals.css] verificar se contraste é legível.
00197. [FRONTEND_ESTRUTURA] [globals.css] verificar se texto é humano e não técnico.
00198. [FRONTEND_ESTRUTURA] [globals.css] verificar se existe teste manual possível.
00199. [FRONTEND_ESTRUTURA] [globals.css] classificar severidade.
00200. [FRONTEND_ESTRUTURA] [globals.css] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / páginas públicas
00201. [FRONTEND_ESTRUTURA] [páginas públicas] identificar arquivo responsável.
00202. [FRONTEND_ESTRUTURA] [páginas públicas] identificar dependências diretas.
00203. [FRONTEND_ESTRUTURA] [páginas públicas] identificar dependências indiretas.
00204. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há código morto.
00205. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há import não usado.
00206. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há variável indefinida.
00207. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há duplicação de lógica.
00208. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há comentário desatualizado.
00209. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se a regra de negócio está clara.
00210. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há tratamento de erro.
00211. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se o erro é amigável para usuário comum.
00212. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se erro técnico fica apenas no console ou relatório.
00213. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há validação de entrada.
00214. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há validação de saída.
00215. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há validação de permissão.
00216. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há risco de acesso indevido.
00217. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há risco de dados de outro usuário.
00218. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há risco de SQL injection.
00219. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há risco de XSS.
00220. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se há risco de upload inseguro.
00221. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se imagens têm fallback correto.
00222. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se /core.png aparece como placeholder.
00223. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se /logo.png está disponível.
00224. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se rotas batem entre front e back.
00225. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se payload esperado bate com payload real.
00226. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se campos do banco batem com model.
00227. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se controller retorna padrão consistente.
00228. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se paginação existe e funciona.
00229. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se filtros podem ser combinados.
00230. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se dados null quebram a tela.
00231. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se array vazio tem estado visual.
00232. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se loading impede tela quebrada.
00233. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se modal fecha corretamente.
00234. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se header não sobrepõe conteúdo.
00235. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se layout é responsivo.
00236. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se contraste é legível.
00237. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se texto é humano e não técnico.
00238. [FRONTEND_ESTRUTURA] [páginas públicas] verificar se existe teste manual possível.
00239. [FRONTEND_ESTRUTURA] [páginas públicas] classificar severidade.
00240. [FRONTEND_ESTRUTURA] [páginas públicas] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / páginas protegidas
00241. [FRONTEND_ESTRUTURA] [páginas protegidas] identificar arquivo responsável.
00242. [FRONTEND_ESTRUTURA] [páginas protegidas] identificar dependências diretas.
00243. [FRONTEND_ESTRUTURA] [páginas protegidas] identificar dependências indiretas.
00244. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há código morto.
00245. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há import não usado.
00246. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há variável indefinida.
00247. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há duplicação de lógica.
00248. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há comentário desatualizado.
00249. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se a regra de negócio está clara.
00250. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há tratamento de erro.
00251. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se o erro é amigável para usuário comum.
00252. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se erro técnico fica apenas no console ou relatório.
00253. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há validação de entrada.
00254. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há validação de saída.
00255. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há validação de permissão.
00256. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há risco de acesso indevido.
00257. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há risco de dados de outro usuário.
00258. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há risco de SQL injection.
00259. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há risco de XSS.
00260. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se há risco de upload inseguro.
00261. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se imagens têm fallback correto.
00262. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se /core.png aparece como placeholder.
00263. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se /logo.png está disponível.
00264. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se rotas batem entre front e back.
00265. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se payload esperado bate com payload real.
00266. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se campos do banco batem com model.
00267. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se controller retorna padrão consistente.
00268. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se paginação existe e funciona.
00269. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se filtros podem ser combinados.
00270. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se dados null quebram a tela.
00271. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se array vazio tem estado visual.
00272. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se loading impede tela quebrada.
00273. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se modal fecha corretamente.
00274. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se header não sobrepõe conteúdo.
00275. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se layout é responsivo.
00276. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se contraste é legível.
00277. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se texto é humano e não técnico.
00278. [FRONTEND_ESTRUTURA] [páginas protegidas] verificar se existe teste manual possível.
00279. [FRONTEND_ESTRUTURA] [páginas protegidas] classificar severidade.
00280. [FRONTEND_ESTRUTURA] [páginas protegidas] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / rotas dinâmicas
00281. [FRONTEND_ESTRUTURA] [rotas dinâmicas] identificar arquivo responsável.
00282. [FRONTEND_ESTRUTURA] [rotas dinâmicas] identificar dependências diretas.
00283. [FRONTEND_ESTRUTURA] [rotas dinâmicas] identificar dependências indiretas.
00284. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há código morto.
00285. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há import não usado.
00286. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há variável indefinida.
00287. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há duplicação de lógica.
00288. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há comentário desatualizado.
00289. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se a regra de negócio está clara.
00290. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há tratamento de erro.
00291. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se o erro é amigável para usuário comum.
00292. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se erro técnico fica apenas no console ou relatório.
00293. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há validação de entrada.
00294. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há validação de saída.
00295. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há validação de permissão.
00296. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há risco de acesso indevido.
00297. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há risco de dados de outro usuário.
00298. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há risco de SQL injection.
00299. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há risco de XSS.
00300. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se há risco de upload inseguro.
00301. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se imagens têm fallback correto.
00302. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se /core.png aparece como placeholder.
00303. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se /logo.png está disponível.
00304. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se rotas batem entre front e back.
00305. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se payload esperado bate com payload real.
00306. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se campos do banco batem com model.
00307. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se controller retorna padrão consistente.
00308. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se paginação existe e funciona.
00309. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se filtros podem ser combinados.
00310. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se dados null quebram a tela.
00311. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se array vazio tem estado visual.
00312. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se loading impede tela quebrada.
00313. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se modal fecha corretamente.
00314. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se header não sobrepõe conteúdo.
00315. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se layout é responsivo.
00316. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se contraste é legível.
00317. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se texto é humano e não técnico.
00318. [FRONTEND_ESTRUTURA] [rotas dinâmicas] verificar se existe teste manual possível.
00319. [FRONTEND_ESTRUTURA] [rotas dinâmicas] classificar severidade.
00320. [FRONTEND_ESTRUTURA] [rotas dinâmicas] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / imports
00321. [FRONTEND_ESTRUTURA] [imports] identificar arquivo responsável.
00322. [FRONTEND_ESTRUTURA] [imports] identificar dependências diretas.
00323. [FRONTEND_ESTRUTURA] [imports] identificar dependências indiretas.
00324. [FRONTEND_ESTRUTURA] [imports] verificar se há código morto.
00325. [FRONTEND_ESTRUTURA] [imports] verificar se há import não usado.
00326. [FRONTEND_ESTRUTURA] [imports] verificar se há variável indefinida.
00327. [FRONTEND_ESTRUTURA] [imports] verificar se há duplicação de lógica.
00328. [FRONTEND_ESTRUTURA] [imports] verificar se há comentário desatualizado.
00329. [FRONTEND_ESTRUTURA] [imports] verificar se a regra de negócio está clara.
00330. [FRONTEND_ESTRUTURA] [imports] verificar se há tratamento de erro.
00331. [FRONTEND_ESTRUTURA] [imports] verificar se o erro é amigável para usuário comum.
00332. [FRONTEND_ESTRUTURA] [imports] verificar se erro técnico fica apenas no console ou relatório.
00333. [FRONTEND_ESTRUTURA] [imports] verificar se há validação de entrada.
00334. [FRONTEND_ESTRUTURA] [imports] verificar se há validação de saída.
00335. [FRONTEND_ESTRUTURA] [imports] verificar se há validação de permissão.
00336. [FRONTEND_ESTRUTURA] [imports] verificar se há risco de acesso indevido.
00337. [FRONTEND_ESTRUTURA] [imports] verificar se há risco de dados de outro usuário.
00338. [FRONTEND_ESTRUTURA] [imports] verificar se há risco de SQL injection.
00339. [FRONTEND_ESTRUTURA] [imports] verificar se há risco de XSS.
00340. [FRONTEND_ESTRUTURA] [imports] verificar se há risco de upload inseguro.
00341. [FRONTEND_ESTRUTURA] [imports] verificar se imagens têm fallback correto.
00342. [FRONTEND_ESTRUTURA] [imports] verificar se /core.png aparece como placeholder.
00343. [FRONTEND_ESTRUTURA] [imports] verificar se /logo.png está disponível.
00344. [FRONTEND_ESTRUTURA] [imports] verificar se rotas batem entre front e back.
00345. [FRONTEND_ESTRUTURA] [imports] verificar se payload esperado bate com payload real.
00346. [FRONTEND_ESTRUTURA] [imports] verificar se campos do banco batem com model.
00347. [FRONTEND_ESTRUTURA] [imports] verificar se controller retorna padrão consistente.
00348. [FRONTEND_ESTRUTURA] [imports] verificar se paginação existe e funciona.
00349. [FRONTEND_ESTRUTURA] [imports] verificar se filtros podem ser combinados.
00350. [FRONTEND_ESTRUTURA] [imports] verificar se dados null quebram a tela.
00351. [FRONTEND_ESTRUTURA] [imports] verificar se array vazio tem estado visual.
00352. [FRONTEND_ESTRUTURA] [imports] verificar se loading impede tela quebrada.
00353. [FRONTEND_ESTRUTURA] [imports] verificar se modal fecha corretamente.
00354. [FRONTEND_ESTRUTURA] [imports] verificar se header não sobrepõe conteúdo.
00355. [FRONTEND_ESTRUTURA] [imports] verificar se layout é responsivo.
00356. [FRONTEND_ESTRUTURA] [imports] verificar se contraste é legível.
00357. [FRONTEND_ESTRUTURA] [imports] verificar se texto é humano e não técnico.
00358. [FRONTEND_ESTRUTURA] [imports] verificar se existe teste manual possível.
00359. [FRONTEND_ESTRUTURA] [imports] classificar severidade.
00360. [FRONTEND_ESTRUTURA] [imports] propor correção com risco estimado.

### FRONTEND_ESTRUTURA / assets public
00361. [FRONTEND_ESTRUTURA] [assets public] identificar arquivo responsável.
00362. [FRONTEND_ESTRUTURA] [assets public] identificar dependências diretas.
00363. [FRONTEND_ESTRUTURA] [assets public] identificar dependências indiretas.
00364. [FRONTEND_ESTRUTURA] [assets public] verificar se há código morto.
00365. [FRONTEND_ESTRUTURA] [assets public] verificar se há import não usado.
00366. [FRONTEND_ESTRUTURA] [assets public] verificar se há variável indefinida.
00367. [FRONTEND_ESTRUTURA] [assets public] verificar se há duplicação de lógica.
00368. [FRONTEND_ESTRUTURA] [assets public] verificar se há comentário desatualizado.
00369. [FRONTEND_ESTRUTURA] [assets public] verificar se a regra de negócio está clara.
00370. [FRONTEND_ESTRUTURA] [assets public] verificar se há tratamento de erro.
00371. [FRONTEND_ESTRUTURA] [assets public] verificar se o erro é amigável para usuário comum.
00372. [FRONTEND_ESTRUTURA] [assets public] verificar se erro técnico fica apenas no console ou relatório.
00373. [FRONTEND_ESTRUTURA] [assets public] verificar se há validação de entrada.
00374. [FRONTEND_ESTRUTURA] [assets public] verificar se há validação de saída.
00375. [FRONTEND_ESTRUTURA] [assets public] verificar se há validação de permissão.
00376. [FRONTEND_ESTRUTURA] [assets public] verificar se há risco de acesso indevido.
00377. [FRONTEND_ESTRUTURA] [assets public] verificar se há risco de dados de outro usuário.
00378. [FRONTEND_ESTRUTURA] [assets public] verificar se há risco de SQL injection.
00379. [FRONTEND_ESTRUTURA] [assets public] verificar se há risco de XSS.
00380. [FRONTEND_ESTRUTURA] [assets public] verificar se há risco de upload inseguro.
00381. [FRONTEND_ESTRUTURA] [assets public] verificar se imagens têm fallback correto.
00382. [FRONTEND_ESTRUTURA] [assets public] verificar se /core.png aparece como placeholder.
00383. [FRONTEND_ESTRUTURA] [assets public] verificar se /logo.png está disponível.
00384. [FRONTEND_ESTRUTURA] [assets public] verificar se rotas batem entre front e back.
00385. [FRONTEND_ESTRUTURA] [assets public] verificar se payload esperado bate com payload real.
00386. [FRONTEND_ESTRUTURA] [assets public] verificar se campos do banco batem com model.
00387. [FRONTEND_ESTRUTURA] [assets public] verificar se controller retorna padrão consistente.
00388. [FRONTEND_ESTRUTURA] [assets public] verificar se paginação existe e funciona.
00389. [FRONTEND_ESTRUTURA] [assets public] verificar se filtros podem ser combinados.
00390. [FRONTEND_ESTRUTURA] [assets public] verificar se dados null quebram a tela.
00391. [FRONTEND_ESTRUTURA] [assets public] verificar se array vazio tem estado visual.
00392. [FRONTEND_ESTRUTURA] [assets public] verificar se loading impede tela quebrada.
00393. [FRONTEND_ESTRUTURA] [assets public] verificar se modal fecha corretamente.
00394. [FRONTEND_ESTRUTURA] [assets public] verificar se header não sobrepõe conteúdo.
00395. [FRONTEND_ESTRUTURA] [assets public] verificar se layout é responsivo.
00396. [FRONTEND_ESTRUTURA] [assets public] verificar se contraste é legível.
00397. [FRONTEND_ESTRUTURA] [assets public] verificar se texto é humano e não técnico.
00398. [FRONTEND_ESTRUTURA] [assets public] verificar se existe teste manual possível.
00399. [FRONTEND_ESTRUTURA] [assets public] classificar severidade.
00400. [FRONTEND_ESTRUTURA] [assets public] propor correção com risco estimado.

---

## 6. Revisão detalhada — FRONTEND_UI_UX

### FRONTEND_UI_UX / home
00401. [FRONTEND_UI_UX] [home] identificar arquivo responsável.
00402. [FRONTEND_UI_UX] [home] identificar dependências diretas.
00403. [FRONTEND_UI_UX] [home] identificar dependências indiretas.
00404. [FRONTEND_UI_UX] [home] verificar se há código morto.
00405. [FRONTEND_UI_UX] [home] verificar se há import não usado.
00406. [FRONTEND_UI_UX] [home] verificar se há variável indefinida.
00407. [FRONTEND_UI_UX] [home] verificar se há duplicação de lógica.
00408. [FRONTEND_UI_UX] [home] verificar se há comentário desatualizado.
00409. [FRONTEND_UI_UX] [home] verificar se a regra de negócio está clara.
00410. [FRONTEND_UI_UX] [home] verificar se há tratamento de erro.
00411. [FRONTEND_UI_UX] [home] verificar se o erro é amigável para usuário comum.
00412. [FRONTEND_UI_UX] [home] verificar se erro técnico fica apenas no console ou relatório.
00413. [FRONTEND_UI_UX] [home] verificar se há validação de entrada.
00414. [FRONTEND_UI_UX] [home] verificar se há validação de saída.
00415. [FRONTEND_UI_UX] [home] verificar se há validação de permissão.
00416. [FRONTEND_UI_UX] [home] verificar se há risco de acesso indevido.
00417. [FRONTEND_UI_UX] [home] verificar se há risco de dados de outro usuário.
00418. [FRONTEND_UI_UX] [home] verificar se há risco de SQL injection.
00419. [FRONTEND_UI_UX] [home] verificar se há risco de XSS.
00420. [FRONTEND_UI_UX] [home] verificar se há risco de upload inseguro.
00421. [FRONTEND_UI_UX] [home] verificar se imagens têm fallback correto.
00422. [FRONTEND_UI_UX] [home] verificar se /core.png aparece como placeholder.
00423. [FRONTEND_UI_UX] [home] verificar se /logo.png está disponível.
00424. [FRONTEND_UI_UX] [home] verificar se rotas batem entre front e back.
00425. [FRONTEND_UI_UX] [home] verificar se payload esperado bate com payload real.
00426. [FRONTEND_UI_UX] [home] verificar se campos do banco batem com model.
00427. [FRONTEND_UI_UX] [home] verificar se controller retorna padrão consistente.
00428. [FRONTEND_UI_UX] [home] verificar se paginação existe e funciona.
00429. [FRONTEND_UI_UX] [home] verificar se filtros podem ser combinados.
00430. [FRONTEND_UI_UX] [home] verificar se dados null quebram a tela.
00431. [FRONTEND_UI_UX] [home] verificar se array vazio tem estado visual.
00432. [FRONTEND_UI_UX] [home] verificar se loading impede tela quebrada.
00433. [FRONTEND_UI_UX] [home] verificar se modal fecha corretamente.
00434. [FRONTEND_UI_UX] [home] verificar se header não sobrepõe conteúdo.
00435. [FRONTEND_UI_UX] [home] verificar se layout é responsivo.
00436. [FRONTEND_UI_UX] [home] verificar se contraste é legível.
00437. [FRONTEND_UI_UX] [home] verificar se texto é humano e não técnico.
00438. [FRONTEND_UI_UX] [home] verificar se existe teste manual possível.
00439. [FRONTEND_UI_UX] [home] classificar severidade.
00440. [FRONTEND_UI_UX] [home] propor correção com risco estimado.

### FRONTEND_UI_UX / produtos
00441. [FRONTEND_UI_UX] [produtos] identificar arquivo responsável.
00442. [FRONTEND_UI_UX] [produtos] identificar dependências diretas.
00443. [FRONTEND_UI_UX] [produtos] identificar dependências indiretas.
00444. [FRONTEND_UI_UX] [produtos] verificar se há código morto.
00445. [FRONTEND_UI_UX] [produtos] verificar se há import não usado.
00446. [FRONTEND_UI_UX] [produtos] verificar se há variável indefinida.
00447. [FRONTEND_UI_UX] [produtos] verificar se há duplicação de lógica.
00448. [FRONTEND_UI_UX] [produtos] verificar se há comentário desatualizado.
00449. [FRONTEND_UI_UX] [produtos] verificar se a regra de negócio está clara.
00450. [FRONTEND_UI_UX] [produtos] verificar se há tratamento de erro.
00451. [FRONTEND_UI_UX] [produtos] verificar se o erro é amigável para usuário comum.
00452. [FRONTEND_UI_UX] [produtos] verificar se erro técnico fica apenas no console ou relatório.
00453. [FRONTEND_UI_UX] [produtos] verificar se há validação de entrada.
00454. [FRONTEND_UI_UX] [produtos] verificar se há validação de saída.
00455. [FRONTEND_UI_UX] [produtos] verificar se há validação de permissão.
00456. [FRONTEND_UI_UX] [produtos] verificar se há risco de acesso indevido.
00457. [FRONTEND_UI_UX] [produtos] verificar se há risco de dados de outro usuário.
00458. [FRONTEND_UI_UX] [produtos] verificar se há risco de SQL injection.
00459. [FRONTEND_UI_UX] [produtos] verificar se há risco de XSS.
00460. [FRONTEND_UI_UX] [produtos] verificar se há risco de upload inseguro.
00461. [FRONTEND_UI_UX] [produtos] verificar se imagens têm fallback correto.
00462. [FRONTEND_UI_UX] [produtos] verificar se /core.png aparece como placeholder.
00463. [FRONTEND_UI_UX] [produtos] verificar se /logo.png está disponível.
00464. [FRONTEND_UI_UX] [produtos] verificar se rotas batem entre front e back.
00465. [FRONTEND_UI_UX] [produtos] verificar se payload esperado bate com payload real.
00466. [FRONTEND_UI_UX] [produtos] verificar se campos do banco batem com model.
00467. [FRONTEND_UI_UX] [produtos] verificar se controller retorna padrão consistente.
00468. [FRONTEND_UI_UX] [produtos] verificar se paginação existe e funciona.
00469. [FRONTEND_UI_UX] [produtos] verificar se filtros podem ser combinados.
00470. [FRONTEND_UI_UX] [produtos] verificar se dados null quebram a tela.
00471. [FRONTEND_UI_UX] [produtos] verificar se array vazio tem estado visual.
00472. [FRONTEND_UI_UX] [produtos] verificar se loading impede tela quebrada.
00473. [FRONTEND_UI_UX] [produtos] verificar se modal fecha corretamente.
00474. [FRONTEND_UI_UX] [produtos] verificar se header não sobrepõe conteúdo.
00475. [FRONTEND_UI_UX] [produtos] verificar se layout é responsivo.
00476. [FRONTEND_UI_UX] [produtos] verificar se contraste é legível.
00477. [FRONTEND_UI_UX] [produtos] verificar se texto é humano e não técnico.
00478. [FRONTEND_UI_UX] [produtos] verificar se existe teste manual possível.
00479. [FRONTEND_UI_UX] [produtos] classificar severidade.
00480. [FRONTEND_UI_UX] [produtos] propor correção com risco estimado.

### FRONTEND_UI_UX / detalhes produto
00481. [FRONTEND_UI_UX] [detalhes produto] identificar arquivo responsável.
00482. [FRONTEND_UI_UX] [detalhes produto] identificar dependências diretas.
00483. [FRONTEND_UI_UX] [detalhes produto] identificar dependências indiretas.
00484. [FRONTEND_UI_UX] [detalhes produto] verificar se há código morto.
00485. [FRONTEND_UI_UX] [detalhes produto] verificar se há import não usado.
00486. [FRONTEND_UI_UX] [detalhes produto] verificar se há variável indefinida.
00487. [FRONTEND_UI_UX] [detalhes produto] verificar se há duplicação de lógica.
00488. [FRONTEND_UI_UX] [detalhes produto] verificar se há comentário desatualizado.
00489. [FRONTEND_UI_UX] [detalhes produto] verificar se a regra de negócio está clara.
00490. [FRONTEND_UI_UX] [detalhes produto] verificar se há tratamento de erro.
00491. [FRONTEND_UI_UX] [detalhes produto] verificar se o erro é amigável para usuário comum.
00492. [FRONTEND_UI_UX] [detalhes produto] verificar se erro técnico fica apenas no console ou relatório.
00493. [FRONTEND_UI_UX] [detalhes produto] verificar se há validação de entrada.
00494. [FRONTEND_UI_UX] [detalhes produto] verificar se há validação de saída.
00495. [FRONTEND_UI_UX] [detalhes produto] verificar se há validação de permissão.
00496. [FRONTEND_UI_UX] [detalhes produto] verificar se há risco de acesso indevido.
00497. [FRONTEND_UI_UX] [detalhes produto] verificar se há risco de dados de outro usuário.
00498. [FRONTEND_UI_UX] [detalhes produto] verificar se há risco de SQL injection.
00499. [FRONTEND_UI_UX] [detalhes produto] verificar se há risco de XSS.
00500. [FRONTEND_UI_UX] [detalhes produto] verificar se há risco de upload inseguro.
00501. [FRONTEND_UI_UX] [detalhes produto] verificar se imagens têm fallback correto.
00502. [FRONTEND_UI_UX] [detalhes produto] verificar se /core.png aparece como placeholder.
00503. [FRONTEND_UI_UX] [detalhes produto] verificar se /logo.png está disponível.
00504. [FRONTEND_UI_UX] [detalhes produto] verificar se rotas batem entre front e back.
00505. [FRONTEND_UI_UX] [detalhes produto] verificar se payload esperado bate com payload real.
00506. [FRONTEND_UI_UX] [detalhes produto] verificar se campos do banco batem com model.
00507. [FRONTEND_UI_UX] [detalhes produto] verificar se controller retorna padrão consistente.
00508. [FRONTEND_UI_UX] [detalhes produto] verificar se paginação existe e funciona.
00509. [FRONTEND_UI_UX] [detalhes produto] verificar se filtros podem ser combinados.
00510. [FRONTEND_UI_UX] [detalhes produto] verificar se dados null quebram a tela.
00511. [FRONTEND_UI_UX] [detalhes produto] verificar se array vazio tem estado visual.
00512. [FRONTEND_UI_UX] [detalhes produto] verificar se loading impede tela quebrada.
00513. [FRONTEND_UI_UX] [detalhes produto] verificar se modal fecha corretamente.
00514. [FRONTEND_UI_UX] [detalhes produto] verificar se header não sobrepõe conteúdo.
00515. [FRONTEND_UI_UX] [detalhes produto] verificar se layout é responsivo.
00516. [FRONTEND_UI_UX] [detalhes produto] verificar se contraste é legível.
00517. [FRONTEND_UI_UX] [detalhes produto] verificar se texto é humano e não técnico.
00518. [FRONTEND_UI_UX] [detalhes produto] verificar se existe teste manual possível.
00519. [FRONTEND_UI_UX] [detalhes produto] classificar severidade.
00520. [FRONTEND_UI_UX] [detalhes produto] propor correção com risco estimado.

### FRONTEND_UI_UX / pedidos
00521. [FRONTEND_UI_UX] [pedidos] identificar arquivo responsável.
00522. [FRONTEND_UI_UX] [pedidos] identificar dependências diretas.
00523. [FRONTEND_UI_UX] [pedidos] identificar dependências indiretas.
00524. [FRONTEND_UI_UX] [pedidos] verificar se há código morto.
00525. [FRONTEND_UI_UX] [pedidos] verificar se há import não usado.
00526. [FRONTEND_UI_UX] [pedidos] verificar se há variável indefinida.
00527. [FRONTEND_UI_UX] [pedidos] verificar se há duplicação de lógica.
00528. [FRONTEND_UI_UX] [pedidos] verificar se há comentário desatualizado.
00529. [FRONTEND_UI_UX] [pedidos] verificar se a regra de negócio está clara.
00530. [FRONTEND_UI_UX] [pedidos] verificar se há tratamento de erro.
00531. [FRONTEND_UI_UX] [pedidos] verificar se o erro é amigável para usuário comum.
00532. [FRONTEND_UI_UX] [pedidos] verificar se erro técnico fica apenas no console ou relatório.
00533. [FRONTEND_UI_UX] [pedidos] verificar se há validação de entrada.
00534. [FRONTEND_UI_UX] [pedidos] verificar se há validação de saída.
00535. [FRONTEND_UI_UX] [pedidos] verificar se há validação de permissão.
00536. [FRONTEND_UI_UX] [pedidos] verificar se há risco de acesso indevido.
00537. [FRONTEND_UI_UX] [pedidos] verificar se há risco de dados de outro usuário.
00538. [FRONTEND_UI_UX] [pedidos] verificar se há risco de SQL injection.
00539. [FRONTEND_UI_UX] [pedidos] verificar se há risco de XSS.
00540. [FRONTEND_UI_UX] [pedidos] verificar se há risco de upload inseguro.
00541. [FRONTEND_UI_UX] [pedidos] verificar se imagens têm fallback correto.
00542. [FRONTEND_UI_UX] [pedidos] verificar se /core.png aparece como placeholder.
00543. [FRONTEND_UI_UX] [pedidos] verificar se /logo.png está disponível.
00544. [FRONTEND_UI_UX] [pedidos] verificar se rotas batem entre front e back.
00545. [FRONTEND_UI_UX] [pedidos] verificar se payload esperado bate com payload real.
00546. [FRONTEND_UI_UX] [pedidos] verificar se campos do banco batem com model.
00547. [FRONTEND_UI_UX] [pedidos] verificar se controller retorna padrão consistente.
00548. [FRONTEND_UI_UX] [pedidos] verificar se paginação existe e funciona.
00549. [FRONTEND_UI_UX] [pedidos] verificar se filtros podem ser combinados.
00550. [FRONTEND_UI_UX] [pedidos] verificar se dados null quebram a tela.
00551. [FRONTEND_UI_UX] [pedidos] verificar se array vazio tem estado visual.
00552. [FRONTEND_UI_UX] [pedidos] verificar se loading impede tela quebrada.
00553. [FRONTEND_UI_UX] [pedidos] verificar se modal fecha corretamente.
00554. [FRONTEND_UI_UX] [pedidos] verificar se header não sobrepõe conteúdo.
00555. [FRONTEND_UI_UX] [pedidos] verificar se layout é responsivo.
00556. [FRONTEND_UI_UX] [pedidos] verificar se contraste é legível.
00557. [FRONTEND_UI_UX] [pedidos] verificar se texto é humano e não técnico.
00558. [FRONTEND_UI_UX] [pedidos] verificar se existe teste manual possível.
00559. [FRONTEND_UI_UX] [pedidos] classificar severidade.
00560. [FRONTEND_UI_UX] [pedidos] propor correção com risco estimado.

### FRONTEND_UI_UX / encomendas
00561. [FRONTEND_UI_UX] [encomendas] identificar arquivo responsável.
00562. [FRONTEND_UI_UX] [encomendas] identificar dependências diretas.
00563. [FRONTEND_UI_UX] [encomendas] identificar dependências indiretas.
00564. [FRONTEND_UI_UX] [encomendas] verificar se há código morto.
00565. [FRONTEND_UI_UX] [encomendas] verificar se há import não usado.
00566. [FRONTEND_UI_UX] [encomendas] verificar se há variável indefinida.
00567. [FRONTEND_UI_UX] [encomendas] verificar se há duplicação de lógica.
00568. [FRONTEND_UI_UX] [encomendas] verificar se há comentário desatualizado.
00569. [FRONTEND_UI_UX] [encomendas] verificar se a regra de negócio está clara.
00570. [FRONTEND_UI_UX] [encomendas] verificar se há tratamento de erro.
00571. [FRONTEND_UI_UX] [encomendas] verificar se o erro é amigável para usuário comum.
00572. [FRONTEND_UI_UX] [encomendas] verificar se erro técnico fica apenas no console ou relatório.
00573. [FRONTEND_UI_UX] [encomendas] verificar se há validação de entrada.
00574. [FRONTEND_UI_UX] [encomendas] verificar se há validação de saída.
00575. [FRONTEND_UI_UX] [encomendas] verificar se há validação de permissão.
00576. [FRONTEND_UI_UX] [encomendas] verificar se há risco de acesso indevido.
00577. [FRONTEND_UI_UX] [encomendas] verificar se há risco de dados de outro usuário.
00578. [FRONTEND_UI_UX] [encomendas] verificar se há risco de SQL injection.
00579. [FRONTEND_UI_UX] [encomendas] verificar se há risco de XSS.
00580. [FRONTEND_UI_UX] [encomendas] verificar se há risco de upload inseguro.
00581. [FRONTEND_UI_UX] [encomendas] verificar se imagens têm fallback correto.
00582. [FRONTEND_UI_UX] [encomendas] verificar se /core.png aparece como placeholder.
00583. [FRONTEND_UI_UX] [encomendas] verificar se /logo.png está disponível.
00584. [FRONTEND_UI_UX] [encomendas] verificar se rotas batem entre front e back.
00585. [FRONTEND_UI_UX] [encomendas] verificar se payload esperado bate com payload real.
00586. [FRONTEND_UI_UX] [encomendas] verificar se campos do banco batem com model.
00587. [FRONTEND_UI_UX] [encomendas] verificar se controller retorna padrão consistente.
00588. [FRONTEND_UI_UX] [encomendas] verificar se paginação existe e funciona.
00589. [FRONTEND_UI_UX] [encomendas] verificar se filtros podem ser combinados.
00590. [FRONTEND_UI_UX] [encomendas] verificar se dados null quebram a tela.
00591. [FRONTEND_UI_UX] [encomendas] verificar se array vazio tem estado visual.
00592. [FRONTEND_UI_UX] [encomendas] verificar se loading impede tela quebrada.
00593. [FRONTEND_UI_UX] [encomendas] verificar se modal fecha corretamente.
00594. [FRONTEND_UI_UX] [encomendas] verificar se header não sobrepõe conteúdo.
00595. [FRONTEND_UI_UX] [encomendas] verificar se layout é responsivo.
00596. [FRONTEND_UI_UX] [encomendas] verificar se contraste é legível.
00597. [FRONTEND_UI_UX] [encomendas] verificar se texto é humano e não técnico.
00598. [FRONTEND_UI_UX] [encomendas] verificar se existe teste manual possível.
00599. [FRONTEND_UI_UX] [encomendas] classificar severidade.
00600. [FRONTEND_UI_UX] [encomendas] propor correção com risco estimado.

### FRONTEND_UI_UX / logística
00601. [FRONTEND_UI_UX] [logística] identificar arquivo responsável.
00602. [FRONTEND_UI_UX] [logística] identificar dependências diretas.
00603. [FRONTEND_UI_UX] [logística] identificar dependências indiretas.
00604. [FRONTEND_UI_UX] [logística] verificar se há código morto.
00605. [FRONTEND_UI_UX] [logística] verificar se há import não usado.
00606. [FRONTEND_UI_UX] [logística] verificar se há variável indefinida.
00607. [FRONTEND_UI_UX] [logística] verificar se há duplicação de lógica.
00608. [FRONTEND_UI_UX] [logística] verificar se há comentário desatualizado.
00609. [FRONTEND_UI_UX] [logística] verificar se a regra de negócio está clara.
00610. [FRONTEND_UI_UX] [logística] verificar se há tratamento de erro.
00611. [FRONTEND_UI_UX] [logística] verificar se o erro é amigável para usuário comum.
00612. [FRONTEND_UI_UX] [logística] verificar se erro técnico fica apenas no console ou relatório.
00613. [FRONTEND_UI_UX] [logística] verificar se há validação de entrada.
00614. [FRONTEND_UI_UX] [logística] verificar se há validação de saída.
00615. [FRONTEND_UI_UX] [logística] verificar se há validação de permissão.
00616. [FRONTEND_UI_UX] [logística] verificar se há risco de acesso indevido.
00617. [FRONTEND_UI_UX] [logística] verificar se há risco de dados de outro usuário.
00618. [FRONTEND_UI_UX] [logística] verificar se há risco de SQL injection.
00619. [FRONTEND_UI_UX] [logística] verificar se há risco de XSS.
00620. [FRONTEND_UI_UX] [logística] verificar se há risco de upload inseguro.
00621. [FRONTEND_UI_UX] [logística] verificar se imagens têm fallback correto.
00622. [FRONTEND_UI_UX] [logística] verificar se /core.png aparece como placeholder.
00623. [FRONTEND_UI_UX] [logística] verificar se /logo.png está disponível.
00624. [FRONTEND_UI_UX] [logística] verificar se rotas batem entre front e back.
00625. [FRONTEND_UI_UX] [logística] verificar se payload esperado bate com payload real.
00626. [FRONTEND_UI_UX] [logística] verificar se campos do banco batem com model.
00627. [FRONTEND_UI_UX] [logística] verificar se controller retorna padrão consistente.
00628. [FRONTEND_UI_UX] [logística] verificar se paginação existe e funciona.
00629. [FRONTEND_UI_UX] [logística] verificar se filtros podem ser combinados.
00630. [FRONTEND_UI_UX] [logística] verificar se dados null quebram a tela.
00631. [FRONTEND_UI_UX] [logística] verificar se array vazio tem estado visual.
00632. [FRONTEND_UI_UX] [logística] verificar se loading impede tela quebrada.
00633. [FRONTEND_UI_UX] [logística] verificar se modal fecha corretamente.
00634. [FRONTEND_UI_UX] [logística] verificar se header não sobrepõe conteúdo.
00635. [FRONTEND_UI_UX] [logística] verificar se layout é responsivo.
00636. [FRONTEND_UI_UX] [logística] verificar se contraste é legível.
00637. [FRONTEND_UI_UX] [logística] verificar se texto é humano e não técnico.
00638. [FRONTEND_UI_UX] [logística] verificar se existe teste manual possível.
00639. [FRONTEND_UI_UX] [logística] classificar severidade.
00640. [FRONTEND_UI_UX] [logística] propor correção com risco estimado.

### FRONTEND_UI_UX / suporte
00641. [FRONTEND_UI_UX] [suporte] identificar arquivo responsável.
00642. [FRONTEND_UI_UX] [suporte] identificar dependências diretas.
00643. [FRONTEND_UI_UX] [suporte] identificar dependências indiretas.
00644. [FRONTEND_UI_UX] [suporte] verificar se há código morto.
00645. [FRONTEND_UI_UX] [suporte] verificar se há import não usado.
00646. [FRONTEND_UI_UX] [suporte] verificar se há variável indefinida.
00647. [FRONTEND_UI_UX] [suporte] verificar se há duplicação de lógica.
00648. [FRONTEND_UI_UX] [suporte] verificar se há comentário desatualizado.
00649. [FRONTEND_UI_UX] [suporte] verificar se a regra de negócio está clara.
00650. [FRONTEND_UI_UX] [suporte] verificar se há tratamento de erro.
00651. [FRONTEND_UI_UX] [suporte] verificar se o erro é amigável para usuário comum.
00652. [FRONTEND_UI_UX] [suporte] verificar se erro técnico fica apenas no console ou relatório.
00653. [FRONTEND_UI_UX] [suporte] verificar se há validação de entrada.
00654. [FRONTEND_UI_UX] [suporte] verificar se há validação de saída.
00655. [FRONTEND_UI_UX] [suporte] verificar se há validação de permissão.
00656. [FRONTEND_UI_UX] [suporte] verificar se há risco de acesso indevido.
00657. [FRONTEND_UI_UX] [suporte] verificar se há risco de dados de outro usuário.
00658. [FRONTEND_UI_UX] [suporte] verificar se há risco de SQL injection.
00659. [FRONTEND_UI_UX] [suporte] verificar se há risco de XSS.
00660. [FRONTEND_UI_UX] [suporte] verificar se há risco de upload inseguro.
00661. [FRONTEND_UI_UX] [suporte] verificar se imagens têm fallback correto.
00662. [FRONTEND_UI_UX] [suporte] verificar se /core.png aparece como placeholder.
00663. [FRONTEND_UI_UX] [suporte] verificar se /logo.png está disponível.
00664. [FRONTEND_UI_UX] [suporte] verificar se rotas batem entre front e back.
00665. [FRONTEND_UI_UX] [suporte] verificar se payload esperado bate com payload real.
00666. [FRONTEND_UI_UX] [suporte] verificar se campos do banco batem com model.
00667. [FRONTEND_UI_UX] [suporte] verificar se controller retorna padrão consistente.
00668. [FRONTEND_UI_UX] [suporte] verificar se paginação existe e funciona.
00669. [FRONTEND_UI_UX] [suporte] verificar se filtros podem ser combinados.
00670. [FRONTEND_UI_UX] [suporte] verificar se dados null quebram a tela.
00671. [FRONTEND_UI_UX] [suporte] verificar se array vazio tem estado visual.
00672. [FRONTEND_UI_UX] [suporte] verificar se loading impede tela quebrada.
00673. [FRONTEND_UI_UX] [suporte] verificar se modal fecha corretamente.
00674. [FRONTEND_UI_UX] [suporte] verificar se header não sobrepõe conteúdo.
00675. [FRONTEND_UI_UX] [suporte] verificar se layout é responsivo.
00676. [FRONTEND_UI_UX] [suporte] verificar se contraste é legível.
00677. [FRONTEND_UI_UX] [suporte] verificar se texto é humano e não técnico.
00678. [FRONTEND_UI_UX] [suporte] verificar se existe teste manual possível.
00679. [FRONTEND_UI_UX] [suporte] classificar severidade.
00680. [FRONTEND_UI_UX] [suporte] propor correção com risco estimado.

### FRONTEND_UI_UX / perfil
00681. [FRONTEND_UI_UX] [perfil] identificar arquivo responsável.
00682. [FRONTEND_UI_UX] [perfil] identificar dependências diretas.
00683. [FRONTEND_UI_UX] [perfil] identificar dependências indiretas.
00684. [FRONTEND_UI_UX] [perfil] verificar se há código morto.
00685. [FRONTEND_UI_UX] [perfil] verificar se há import não usado.
00686. [FRONTEND_UI_UX] [perfil] verificar se há variável indefinida.
00687. [FRONTEND_UI_UX] [perfil] verificar se há duplicação de lógica.
00688. [FRONTEND_UI_UX] [perfil] verificar se há comentário desatualizado.
00689. [FRONTEND_UI_UX] [perfil] verificar se a regra de negócio está clara.
00690. [FRONTEND_UI_UX] [perfil] verificar se há tratamento de erro.
00691. [FRONTEND_UI_UX] [perfil] verificar se o erro é amigável para usuário comum.
00692. [FRONTEND_UI_UX] [perfil] verificar se erro técnico fica apenas no console ou relatório.
00693. [FRONTEND_UI_UX] [perfil] verificar se há validação de entrada.
00694. [FRONTEND_UI_UX] [perfil] verificar se há validação de saída.
00695. [FRONTEND_UI_UX] [perfil] verificar se há validação de permissão.
00696. [FRONTEND_UI_UX] [perfil] verificar se há risco de acesso indevido.
00697. [FRONTEND_UI_UX] [perfil] verificar se há risco de dados de outro usuário.
00698. [FRONTEND_UI_UX] [perfil] verificar se há risco de SQL injection.
00699. [FRONTEND_UI_UX] [perfil] verificar se há risco de XSS.
00700. [FRONTEND_UI_UX] [perfil] verificar se há risco de upload inseguro.
00701. [FRONTEND_UI_UX] [perfil] verificar se imagens têm fallback correto.
00702. [FRONTEND_UI_UX] [perfil] verificar se /core.png aparece como placeholder.
00703. [FRONTEND_UI_UX] [perfil] verificar se /logo.png está disponível.
00704. [FRONTEND_UI_UX] [perfil] verificar se rotas batem entre front e back.
00705. [FRONTEND_UI_UX] [perfil] verificar se payload esperado bate com payload real.
00706. [FRONTEND_UI_UX] [perfil] verificar se campos do banco batem com model.
00707. [FRONTEND_UI_UX] [perfil] verificar se controller retorna padrão consistente.
00708. [FRONTEND_UI_UX] [perfil] verificar se paginação existe e funciona.
00709. [FRONTEND_UI_UX] [perfil] verificar se filtros podem ser combinados.
00710. [FRONTEND_UI_UX] [perfil] verificar se dados null quebram a tela.
00711. [FRONTEND_UI_UX] [perfil] verificar se array vazio tem estado visual.
00712. [FRONTEND_UI_UX] [perfil] verificar se loading impede tela quebrada.
00713. [FRONTEND_UI_UX] [perfil] verificar se modal fecha corretamente.
00714. [FRONTEND_UI_UX] [perfil] verificar se header não sobrepõe conteúdo.
00715. [FRONTEND_UI_UX] [perfil] verificar se layout é responsivo.
00716. [FRONTEND_UI_UX] [perfil] verificar se contraste é legível.
00717. [FRONTEND_UI_UX] [perfil] verificar se texto é humano e não técnico.
00718. [FRONTEND_UI_UX] [perfil] verificar se existe teste manual possível.
00719. [FRONTEND_UI_UX] [perfil] classificar severidade.
00720. [FRONTEND_UI_UX] [perfil] propor correção com risco estimado.

### FRONTEND_UI_UX / login
00721. [FRONTEND_UI_UX] [login] identificar arquivo responsável.
00722. [FRONTEND_UI_UX] [login] identificar dependências diretas.
00723. [FRONTEND_UI_UX] [login] identificar dependências indiretas.
00724. [FRONTEND_UI_UX] [login] verificar se há código morto.
00725. [FRONTEND_UI_UX] [login] verificar se há import não usado.
00726. [FRONTEND_UI_UX] [login] verificar se há variável indefinida.
00727. [FRONTEND_UI_UX] [login] verificar se há duplicação de lógica.
00728. [FRONTEND_UI_UX] [login] verificar se há comentário desatualizado.
00729. [FRONTEND_UI_UX] [login] verificar se a regra de negócio está clara.
00730. [FRONTEND_UI_UX] [login] verificar se há tratamento de erro.
00731. [FRONTEND_UI_UX] [login] verificar se o erro é amigável para usuário comum.
00732. [FRONTEND_UI_UX] [login] verificar se erro técnico fica apenas no console ou relatório.
00733. [FRONTEND_UI_UX] [login] verificar se há validação de entrada.
00734. [FRONTEND_UI_UX] [login] verificar se há validação de saída.
00735. [FRONTEND_UI_UX] [login] verificar se há validação de permissão.
00736. [FRONTEND_UI_UX] [login] verificar se há risco de acesso indevido.
00737. [FRONTEND_UI_UX] [login] verificar se há risco de dados de outro usuário.
00738. [FRONTEND_UI_UX] [login] verificar se há risco de SQL injection.
00739. [FRONTEND_UI_UX] [login] verificar se há risco de XSS.
00740. [FRONTEND_UI_UX] [login] verificar se há risco de upload inseguro.
00741. [FRONTEND_UI_UX] [login] verificar se imagens têm fallback correto.
00742. [FRONTEND_UI_UX] [login] verificar se /core.png aparece como placeholder.
00743. [FRONTEND_UI_UX] [login] verificar se /logo.png está disponível.
00744. [FRONTEND_UI_UX] [login] verificar se rotas batem entre front e back.
00745. [FRONTEND_UI_UX] [login] verificar se payload esperado bate com payload real.
00746. [FRONTEND_UI_UX] [login] verificar se campos do banco batem com model.
00747. [FRONTEND_UI_UX] [login] verificar se controller retorna padrão consistente.
00748. [FRONTEND_UI_UX] [login] verificar se paginação existe e funciona.
00749. [FRONTEND_UI_UX] [login] verificar se filtros podem ser combinados.
00750. [FRONTEND_UI_UX] [login] verificar se dados null quebram a tela.
00751. [FRONTEND_UI_UX] [login] verificar se array vazio tem estado visual.
00752. [FRONTEND_UI_UX] [login] verificar se loading impede tela quebrada.
00753. [FRONTEND_UI_UX] [login] verificar se modal fecha corretamente.
00754. [FRONTEND_UI_UX] [login] verificar se header não sobrepõe conteúdo.
00755. [FRONTEND_UI_UX] [login] verificar se layout é responsivo.
00756. [FRONTEND_UI_UX] [login] verificar se contraste é legível.
00757. [FRONTEND_UI_UX] [login] verificar se texto é humano e não técnico.
00758. [FRONTEND_UI_UX] [login] verificar se existe teste manual possível.
00759. [FRONTEND_UI_UX] [login] classificar severidade.
00760. [FRONTEND_UI_UX] [login] propor correção com risco estimado.

### FRONTEND_UI_UX / cadastro
00761. [FRONTEND_UI_UX] [cadastro] identificar arquivo responsável.
00762. [FRONTEND_UI_UX] [cadastro] identificar dependências diretas.
00763. [FRONTEND_UI_UX] [cadastro] identificar dependências indiretas.
00764. [FRONTEND_UI_UX] [cadastro] verificar se há código morto.
00765. [FRONTEND_UI_UX] [cadastro] verificar se há import não usado.
00766. [FRONTEND_UI_UX] [cadastro] verificar se há variável indefinida.
00767. [FRONTEND_UI_UX] [cadastro] verificar se há duplicação de lógica.
00768. [FRONTEND_UI_UX] [cadastro] verificar se há comentário desatualizado.
00769. [FRONTEND_UI_UX] [cadastro] verificar se a regra de negócio está clara.
00770. [FRONTEND_UI_UX] [cadastro] verificar se há tratamento de erro.
00771. [FRONTEND_UI_UX] [cadastro] verificar se o erro é amigável para usuário comum.
00772. [FRONTEND_UI_UX] [cadastro] verificar se erro técnico fica apenas no console ou relatório.
00773. [FRONTEND_UI_UX] [cadastro] verificar se há validação de entrada.
00774. [FRONTEND_UI_UX] [cadastro] verificar se há validação de saída.
00775. [FRONTEND_UI_UX] [cadastro] verificar se há validação de permissão.
00776. [FRONTEND_UI_UX] [cadastro] verificar se há risco de acesso indevido.
00777. [FRONTEND_UI_UX] [cadastro] verificar se há risco de dados de outro usuário.
00778. [FRONTEND_UI_UX] [cadastro] verificar se há risco de SQL injection.
00779. [FRONTEND_UI_UX] [cadastro] verificar se há risco de XSS.
00780. [FRONTEND_UI_UX] [cadastro] verificar se há risco de upload inseguro.
00781. [FRONTEND_UI_UX] [cadastro] verificar se imagens têm fallback correto.
00782. [FRONTEND_UI_UX] [cadastro] verificar se /core.png aparece como placeholder.
00783. [FRONTEND_UI_UX] [cadastro] verificar se /logo.png está disponível.
00784. [FRONTEND_UI_UX] [cadastro] verificar se rotas batem entre front e back.
00785. [FRONTEND_UI_UX] [cadastro] verificar se payload esperado bate com payload real.
00786. [FRONTEND_UI_UX] [cadastro] verificar se campos do banco batem com model.
00787. [FRONTEND_UI_UX] [cadastro] verificar se controller retorna padrão consistente.
00788. [FRONTEND_UI_UX] [cadastro] verificar se paginação existe e funciona.
00789. [FRONTEND_UI_UX] [cadastro] verificar se filtros podem ser combinados.
00790. [FRONTEND_UI_UX] [cadastro] verificar se dados null quebram a tela.
00791. [FRONTEND_UI_UX] [cadastro] verificar se array vazio tem estado visual.
00792. [FRONTEND_UI_UX] [cadastro] verificar se loading impede tela quebrada.
00793. [FRONTEND_UI_UX] [cadastro] verificar se modal fecha corretamente.
00794. [FRONTEND_UI_UX] [cadastro] verificar se header não sobrepõe conteúdo.
00795. [FRONTEND_UI_UX] [cadastro] verificar se layout é responsivo.
00796. [FRONTEND_UI_UX] [cadastro] verificar se contraste é legível.
00797. [FRONTEND_UI_UX] [cadastro] verificar se texto é humano e não técnico.
00798. [FRONTEND_UI_UX] [cadastro] verificar se existe teste manual possível.
00799. [FRONTEND_UI_UX] [cadastro] classificar severidade.
00800. [FRONTEND_UI_UX] [cadastro] propor correção com risco estimado.

### FRONTEND_UI_UX / dashboard
00801. [FRONTEND_UI_UX] [dashboard] identificar arquivo responsável.
00802. [FRONTEND_UI_UX] [dashboard] identificar dependências diretas.
00803. [FRONTEND_UI_UX] [dashboard] identificar dependências indiretas.
00804. [FRONTEND_UI_UX] [dashboard] verificar se há código morto.
00805. [FRONTEND_UI_UX] [dashboard] verificar se há import não usado.
00806. [FRONTEND_UI_UX] [dashboard] verificar se há variável indefinida.
00807. [FRONTEND_UI_UX] [dashboard] verificar se há duplicação de lógica.
00808. [FRONTEND_UI_UX] [dashboard] verificar se há comentário desatualizado.
00809. [FRONTEND_UI_UX] [dashboard] verificar se a regra de negócio está clara.
00810. [FRONTEND_UI_UX] [dashboard] verificar se há tratamento de erro.
00811. [FRONTEND_UI_UX] [dashboard] verificar se o erro é amigável para usuário comum.
00812. [FRONTEND_UI_UX] [dashboard] verificar se erro técnico fica apenas no console ou relatório.
00813. [FRONTEND_UI_UX] [dashboard] verificar se há validação de entrada.
00814. [FRONTEND_UI_UX] [dashboard] verificar se há validação de saída.
00815. [FRONTEND_UI_UX] [dashboard] verificar se há validação de permissão.
00816. [FRONTEND_UI_UX] [dashboard] verificar se há risco de acesso indevido.
00817. [FRONTEND_UI_UX] [dashboard] verificar se há risco de dados de outro usuário.
00818. [FRONTEND_UI_UX] [dashboard] verificar se há risco de SQL injection.
00819. [FRONTEND_UI_UX] [dashboard] verificar se há risco de XSS.
00820. [FRONTEND_UI_UX] [dashboard] verificar se há risco de upload inseguro.
00821. [FRONTEND_UI_UX] [dashboard] verificar se imagens têm fallback correto.
00822. [FRONTEND_UI_UX] [dashboard] verificar se /core.png aparece como placeholder.
00823. [FRONTEND_UI_UX] [dashboard] verificar se /logo.png está disponível.
00824. [FRONTEND_UI_UX] [dashboard] verificar se rotas batem entre front e back.
00825. [FRONTEND_UI_UX] [dashboard] verificar se payload esperado bate com payload real.
00826. [FRONTEND_UI_UX] [dashboard] verificar se campos do banco batem com model.
00827. [FRONTEND_UI_UX] [dashboard] verificar se controller retorna padrão consistente.
00828. [FRONTEND_UI_UX] [dashboard] verificar se paginação existe e funciona.
00829. [FRONTEND_UI_UX] [dashboard] verificar se filtros podem ser combinados.
00830. [FRONTEND_UI_UX] [dashboard] verificar se dados null quebram a tela.
00831. [FRONTEND_UI_UX] [dashboard] verificar se array vazio tem estado visual.
00832. [FRONTEND_UI_UX] [dashboard] verificar se loading impede tela quebrada.
00833. [FRONTEND_UI_UX] [dashboard] verificar se modal fecha corretamente.
00834. [FRONTEND_UI_UX] [dashboard] verificar se header não sobrepõe conteúdo.
00835. [FRONTEND_UI_UX] [dashboard] verificar se layout é responsivo.
00836. [FRONTEND_UI_UX] [dashboard] verificar se contraste é legível.
00837. [FRONTEND_UI_UX] [dashboard] verificar se texto é humano e não técnico.
00838. [FRONTEND_UI_UX] [dashboard] verificar se existe teste manual possível.
00839. [FRONTEND_UI_UX] [dashboard] classificar severidade.
00840. [FRONTEND_UI_UX] [dashboard] propor correção com risco estimado.

### FRONTEND_UI_UX / tabelas
00841. [FRONTEND_UI_UX] [tabelas] identificar arquivo responsável.
00842. [FRONTEND_UI_UX] [tabelas] identificar dependências diretas.
00843. [FRONTEND_UI_UX] [tabelas] identificar dependências indiretas.
00844. [FRONTEND_UI_UX] [tabelas] verificar se há código morto.
00845. [FRONTEND_UI_UX] [tabelas] verificar se há import não usado.
00846. [FRONTEND_UI_UX] [tabelas] verificar se há variável indefinida.
00847. [FRONTEND_UI_UX] [tabelas] verificar se há duplicação de lógica.
00848. [FRONTEND_UI_UX] [tabelas] verificar se há comentário desatualizado.
00849. [FRONTEND_UI_UX] [tabelas] verificar se a regra de negócio está clara.
00850. [FRONTEND_UI_UX] [tabelas] verificar se há tratamento de erro.
00851. [FRONTEND_UI_UX] [tabelas] verificar se o erro é amigável para usuário comum.
00852. [FRONTEND_UI_UX] [tabelas] verificar se erro técnico fica apenas no console ou relatório.
00853. [FRONTEND_UI_UX] [tabelas] verificar se há validação de entrada.
00854. [FRONTEND_UI_UX] [tabelas] verificar se há validação de saída.
00855. [FRONTEND_UI_UX] [tabelas] verificar se há validação de permissão.
00856. [FRONTEND_UI_UX] [tabelas] verificar se há risco de acesso indevido.
00857. [FRONTEND_UI_UX] [tabelas] verificar se há risco de dados de outro usuário.
00858. [FRONTEND_UI_UX] [tabelas] verificar se há risco de SQL injection.
00859. [FRONTEND_UI_UX] [tabelas] verificar se há risco de XSS.
00860. [FRONTEND_UI_UX] [tabelas] verificar se há risco de upload inseguro.
00861. [FRONTEND_UI_UX] [tabelas] verificar se imagens têm fallback correto.
00862. [FRONTEND_UI_UX] [tabelas] verificar se /core.png aparece como placeholder.
00863. [FRONTEND_UI_UX] [tabelas] verificar se /logo.png está disponível.
00864. [FRONTEND_UI_UX] [tabelas] verificar se rotas batem entre front e back.
00865. [FRONTEND_UI_UX] [tabelas] verificar se payload esperado bate com payload real.
00866. [FRONTEND_UI_UX] [tabelas] verificar se campos do banco batem com model.
00867. [FRONTEND_UI_UX] [tabelas] verificar se controller retorna padrão consistente.
00868. [FRONTEND_UI_UX] [tabelas] verificar se paginação existe e funciona.
00869. [FRONTEND_UI_UX] [tabelas] verificar se filtros podem ser combinados.
00870. [FRONTEND_UI_UX] [tabelas] verificar se dados null quebram a tela.
00871. [FRONTEND_UI_UX] [tabelas] verificar se array vazio tem estado visual.
00872. [FRONTEND_UI_UX] [tabelas] verificar se loading impede tela quebrada.
00873. [FRONTEND_UI_UX] [tabelas] verificar se modal fecha corretamente.
00874. [FRONTEND_UI_UX] [tabelas] verificar se header não sobrepõe conteúdo.
00875. [FRONTEND_UI_UX] [tabelas] verificar se layout é responsivo.
00876. [FRONTEND_UI_UX] [tabelas] verificar se contraste é legível.
00877. [FRONTEND_UI_UX] [tabelas] verificar se texto é humano e não técnico.
00878. [FRONTEND_UI_UX] [tabelas] verificar se existe teste manual possível.
00879. [FRONTEND_UI_UX] [tabelas] classificar severidade.
00880. [FRONTEND_UI_UX] [tabelas] propor correção com risco estimado.

### FRONTEND_UI_UX / modais
00881. [FRONTEND_UI_UX] [modais] identificar arquivo responsável.
00882. [FRONTEND_UI_UX] [modais] identificar dependências diretas.
00883. [FRONTEND_UI_UX] [modais] identificar dependências indiretas.
00884. [FRONTEND_UI_UX] [modais] verificar se há código morto.
00885. [FRONTEND_UI_UX] [modais] verificar se há import não usado.
00886. [FRONTEND_UI_UX] [modais] verificar se há variável indefinida.
00887. [FRONTEND_UI_UX] [modais] verificar se há duplicação de lógica.
00888. [FRONTEND_UI_UX] [modais] verificar se há comentário desatualizado.
00889. [FRONTEND_UI_UX] [modais] verificar se a regra de negócio está clara.
00890. [FRONTEND_UI_UX] [modais] verificar se há tratamento de erro.
00891. [FRONTEND_UI_UX] [modais] verificar se o erro é amigável para usuário comum.
00892. [FRONTEND_UI_UX] [modais] verificar se erro técnico fica apenas no console ou relatório.
00893. [FRONTEND_UI_UX] [modais] verificar se há validação de entrada.
00894. [FRONTEND_UI_UX] [modais] verificar se há validação de saída.
00895. [FRONTEND_UI_UX] [modais] verificar se há validação de permissão.
00896. [FRONTEND_UI_UX] [modais] verificar se há risco de acesso indevido.
00897. [FRONTEND_UI_UX] [modais] verificar se há risco de dados de outro usuário.
00898. [FRONTEND_UI_UX] [modais] verificar se há risco de SQL injection.
00899. [FRONTEND_UI_UX] [modais] verificar se há risco de XSS.
00900. [FRONTEND_UI_UX] [modais] verificar se há risco de upload inseguro.
00901. [FRONTEND_UI_UX] [modais] verificar se imagens têm fallback correto.
00902. [FRONTEND_UI_UX] [modais] verificar se /core.png aparece como placeholder.
00903. [FRONTEND_UI_UX] [modais] verificar se /logo.png está disponível.
00904. [FRONTEND_UI_UX] [modais] verificar se rotas batem entre front e back.
00905. [FRONTEND_UI_UX] [modais] verificar se payload esperado bate com payload real.
00906. [FRONTEND_UI_UX] [modais] verificar se campos do banco batem com model.
00907. [FRONTEND_UI_UX] [modais] verificar se controller retorna padrão consistente.
00908. [FRONTEND_UI_UX] [modais] verificar se paginação existe e funciona.
00909. [FRONTEND_UI_UX] [modais] verificar se filtros podem ser combinados.
00910. [FRONTEND_UI_UX] [modais] verificar se dados null quebram a tela.
00911. [FRONTEND_UI_UX] [modais] verificar se array vazio tem estado visual.
00912. [FRONTEND_UI_UX] [modais] verificar se loading impede tela quebrada.
00913. [FRONTEND_UI_UX] [modais] verificar se modal fecha corretamente.
00914. [FRONTEND_UI_UX] [modais] verificar se header não sobrepõe conteúdo.
00915. [FRONTEND_UI_UX] [modais] verificar se layout é responsivo.
00916. [FRONTEND_UI_UX] [modais] verificar se contraste é legível.
00917. [FRONTEND_UI_UX] [modais] verificar se texto é humano e não técnico.
00918. [FRONTEND_UI_UX] [modais] verificar se existe teste manual possível.
00919. [FRONTEND_UI_UX] [modais] classificar severidade.
00920. [FRONTEND_UI_UX] [modais] propor correção com risco estimado.

### FRONTEND_UI_UX / cards
00921. [FRONTEND_UI_UX] [cards] identificar arquivo responsável.
00922. [FRONTEND_UI_UX] [cards] identificar dependências diretas.
00923. [FRONTEND_UI_UX] [cards] identificar dependências indiretas.
00924. [FRONTEND_UI_UX] [cards] verificar se há código morto.
00925. [FRONTEND_UI_UX] [cards] verificar se há import não usado.
00926. [FRONTEND_UI_UX] [cards] verificar se há variável indefinida.
00927. [FRONTEND_UI_UX] [cards] verificar se há duplicação de lógica.
00928. [FRONTEND_UI_UX] [cards] verificar se há comentário desatualizado.
00929. [FRONTEND_UI_UX] [cards] verificar se a regra de negócio está clara.
00930. [FRONTEND_UI_UX] [cards] verificar se há tratamento de erro.
00931. [FRONTEND_UI_UX] [cards] verificar se o erro é amigável para usuário comum.
00932. [FRONTEND_UI_UX] [cards] verificar se erro técnico fica apenas no console ou relatório.
00933. [FRONTEND_UI_UX] [cards] verificar se há validação de entrada.
00934. [FRONTEND_UI_UX] [cards] verificar se há validação de saída.
00935. [FRONTEND_UI_UX] [cards] verificar se há validação de permissão.
00936. [FRONTEND_UI_UX] [cards] verificar se há risco de acesso indevido.
00937. [FRONTEND_UI_UX] [cards] verificar se há risco de dados de outro usuário.
00938. [FRONTEND_UI_UX] [cards] verificar se há risco de SQL injection.
00939. [FRONTEND_UI_UX] [cards] verificar se há risco de XSS.
00940. [FRONTEND_UI_UX] [cards] verificar se há risco de upload inseguro.
00941. [FRONTEND_UI_UX] [cards] verificar se imagens têm fallback correto.
00942. [FRONTEND_UI_UX] [cards] verificar se /core.png aparece como placeholder.
00943. [FRONTEND_UI_UX] [cards] verificar se /logo.png está disponível.
00944. [FRONTEND_UI_UX] [cards] verificar se rotas batem entre front e back.
00945. [FRONTEND_UI_UX] [cards] verificar se payload esperado bate com payload real.
00946. [FRONTEND_UI_UX] [cards] verificar se campos do banco batem com model.
00947. [FRONTEND_UI_UX] [cards] verificar se controller retorna padrão consistente.
00948. [FRONTEND_UI_UX] [cards] verificar se paginação existe e funciona.
00949. [FRONTEND_UI_UX] [cards] verificar se filtros podem ser combinados.
00950. [FRONTEND_UI_UX] [cards] verificar se dados null quebram a tela.
00951. [FRONTEND_UI_UX] [cards] verificar se array vazio tem estado visual.
00952. [FRONTEND_UI_UX] [cards] verificar se loading impede tela quebrada.
00953. [FRONTEND_UI_UX] [cards] verificar se modal fecha corretamente.
00954. [FRONTEND_UI_UX] [cards] verificar se header não sobrepõe conteúdo.
00955. [FRONTEND_UI_UX] [cards] verificar se layout é responsivo.
00956. [FRONTEND_UI_UX] [cards] verificar se contraste é legível.
00957. [FRONTEND_UI_UX] [cards] verificar se texto é humano e não técnico.
00958. [FRONTEND_UI_UX] [cards] verificar se existe teste manual possível.
00959. [FRONTEND_UI_UX] [cards] classificar severidade.
00960. [FRONTEND_UI_UX] [cards] propor correção com risco estimado.

### FRONTEND_UI_UX / header
00961. [FRONTEND_UI_UX] [header] identificar arquivo responsável.
00962. [FRONTEND_UI_UX] [header] identificar dependências diretas.
00963. [FRONTEND_UI_UX] [header] identificar dependências indiretas.
00964. [FRONTEND_UI_UX] [header] verificar se há código morto.
00965. [FRONTEND_UI_UX] [header] verificar se há import não usado.
00966. [FRONTEND_UI_UX] [header] verificar se há variável indefinida.
00967. [FRONTEND_UI_UX] [header] verificar se há duplicação de lógica.
00968. [FRONTEND_UI_UX] [header] verificar se há comentário desatualizado.
00969. [FRONTEND_UI_UX] [header] verificar se a regra de negócio está clara.
00970. [FRONTEND_UI_UX] [header] verificar se há tratamento de erro.
00971. [FRONTEND_UI_UX] [header] verificar se o erro é amigável para usuário comum.
00972. [FRONTEND_UI_UX] [header] verificar se erro técnico fica apenas no console ou relatório.
00973. [FRONTEND_UI_UX] [header] verificar se há validação de entrada.
00974. [FRONTEND_UI_UX] [header] verificar se há validação de saída.
00975. [FRONTEND_UI_UX] [header] verificar se há validação de permissão.
00976. [FRONTEND_UI_UX] [header] verificar se há risco de acesso indevido.
00977. [FRONTEND_UI_UX] [header] verificar se há risco de dados de outro usuário.
00978. [FRONTEND_UI_UX] [header] verificar se há risco de SQL injection.
00979. [FRONTEND_UI_UX] [header] verificar se há risco de XSS.
00980. [FRONTEND_UI_UX] [header] verificar se há risco de upload inseguro.
00981. [FRONTEND_UI_UX] [header] verificar se imagens têm fallback correto.
00982. [FRONTEND_UI_UX] [header] verificar se /core.png aparece como placeholder.
00983. [FRONTEND_UI_UX] [header] verificar se /logo.png está disponível.
00984. [FRONTEND_UI_UX] [header] verificar se rotas batem entre front e back.
00985. [FRONTEND_UI_UX] [header] verificar se payload esperado bate com payload real.
00986. [FRONTEND_UI_UX] [header] verificar se campos do banco batem com model.
00987. [FRONTEND_UI_UX] [header] verificar se controller retorna padrão consistente.
00988. [FRONTEND_UI_UX] [header] verificar se paginação existe e funciona.
00989. [FRONTEND_UI_UX] [header] verificar se filtros podem ser combinados.
00990. [FRONTEND_UI_UX] [header] verificar se dados null quebram a tela.
00991. [FRONTEND_UI_UX] [header] verificar se array vazio tem estado visual.
00992. [FRONTEND_UI_UX] [header] verificar se loading impede tela quebrada.
00993. [FRONTEND_UI_UX] [header] verificar se modal fecha corretamente.
00994. [FRONTEND_UI_UX] [header] verificar se header não sobrepõe conteúdo.
00995. [FRONTEND_UI_UX] [header] verificar se layout é responsivo.
00996. [FRONTEND_UI_UX] [header] verificar se contraste é legível.
00997. [FRONTEND_UI_UX] [header] verificar se texto é humano e não técnico.
00998. [FRONTEND_UI_UX] [header] verificar se existe teste manual possível.
00999. [FRONTEND_UI_UX] [header] classificar severidade.
01000. [FRONTEND_UI_UX] [header] propor correção com risco estimado.

### FRONTEND_UI_UX / footer
01001. [FRONTEND_UI_UX] [footer] identificar arquivo responsável.
01002. [FRONTEND_UI_UX] [footer] identificar dependências diretas.
01003. [FRONTEND_UI_UX] [footer] identificar dependências indiretas.
01004. [FRONTEND_UI_UX] [footer] verificar se há código morto.
01005. [FRONTEND_UI_UX] [footer] verificar se há import não usado.
01006. [FRONTEND_UI_UX] [footer] verificar se há variável indefinida.
01007. [FRONTEND_UI_UX] [footer] verificar se há duplicação de lógica.
01008. [FRONTEND_UI_UX] [footer] verificar se há comentário desatualizado.
01009. [FRONTEND_UI_UX] [footer] verificar se a regra de negócio está clara.
01010. [FRONTEND_UI_UX] [footer] verificar se há tratamento de erro.
01011. [FRONTEND_UI_UX] [footer] verificar se o erro é amigável para usuário comum.
01012. [FRONTEND_UI_UX] [footer] verificar se erro técnico fica apenas no console ou relatório.
01013. [FRONTEND_UI_UX] [footer] verificar se há validação de entrada.
01014. [FRONTEND_UI_UX] [footer] verificar se há validação de saída.
01015. [FRONTEND_UI_UX] [footer] verificar se há validação de permissão.
01016. [FRONTEND_UI_UX] [footer] verificar se há risco de acesso indevido.
01017. [FRONTEND_UI_UX] [footer] verificar se há risco de dados de outro usuário.
01018. [FRONTEND_UI_UX] [footer] verificar se há risco de SQL injection.
01019. [FRONTEND_UI_UX] [footer] verificar se há risco de XSS.
01020. [FRONTEND_UI_UX] [footer] verificar se há risco de upload inseguro.
01021. [FRONTEND_UI_UX] [footer] verificar se imagens têm fallback correto.
01022. [FRONTEND_UI_UX] [footer] verificar se /core.png aparece como placeholder.
01023. [FRONTEND_UI_UX] [footer] verificar se /logo.png está disponível.
01024. [FRONTEND_UI_UX] [footer] verificar se rotas batem entre front e back.
01025. [FRONTEND_UI_UX] [footer] verificar se payload esperado bate com payload real.
01026. [FRONTEND_UI_UX] [footer] verificar se campos do banco batem com model.
01027. [FRONTEND_UI_UX] [footer] verificar se controller retorna padrão consistente.
01028. [FRONTEND_UI_UX] [footer] verificar se paginação existe e funciona.
01029. [FRONTEND_UI_UX] [footer] verificar se filtros podem ser combinados.
01030. [FRONTEND_UI_UX] [footer] verificar se dados null quebram a tela.
01031. [FRONTEND_UI_UX] [footer] verificar se array vazio tem estado visual.
01032. [FRONTEND_UI_UX] [footer] verificar se loading impede tela quebrada.
01033. [FRONTEND_UI_UX] [footer] verificar se modal fecha corretamente.
01034. [FRONTEND_UI_UX] [footer] verificar se header não sobrepõe conteúdo.
01035. [FRONTEND_UI_UX] [footer] verificar se layout é responsivo.
01036. [FRONTEND_UI_UX] [footer] verificar se contraste é legível.
01037. [FRONTEND_UI_UX] [footer] verificar se texto é humano e não técnico.
01038. [FRONTEND_UI_UX] [footer] verificar se existe teste manual possível.
01039. [FRONTEND_UI_UX] [footer] classificar severidade.
01040. [FRONTEND_UI_UX] [footer] propor correção com risco estimado.

### FRONTEND_UI_UX / sidebar
01041. [FRONTEND_UI_UX] [sidebar] identificar arquivo responsável.
01042. [FRONTEND_UI_UX] [sidebar] identificar dependências diretas.
01043. [FRONTEND_UI_UX] [sidebar] identificar dependências indiretas.
01044. [FRONTEND_UI_UX] [sidebar] verificar se há código morto.
01045. [FRONTEND_UI_UX] [sidebar] verificar se há import não usado.
01046. [FRONTEND_UI_UX] [sidebar] verificar se há variável indefinida.
01047. [FRONTEND_UI_UX] [sidebar] verificar se há duplicação de lógica.
01048. [FRONTEND_UI_UX] [sidebar] verificar se há comentário desatualizado.
01049. [FRONTEND_UI_UX] [sidebar] verificar se a regra de negócio está clara.
01050. [FRONTEND_UI_UX] [sidebar] verificar se há tratamento de erro.
01051. [FRONTEND_UI_UX] [sidebar] verificar se o erro é amigável para usuário comum.
01052. [FRONTEND_UI_UX] [sidebar] verificar se erro técnico fica apenas no console ou relatório.
01053. [FRONTEND_UI_UX] [sidebar] verificar se há validação de entrada.
01054. [FRONTEND_UI_UX] [sidebar] verificar se há validação de saída.
01055. [FRONTEND_UI_UX] [sidebar] verificar se há validação de permissão.
01056. [FRONTEND_UI_UX] [sidebar] verificar se há risco de acesso indevido.
01057. [FRONTEND_UI_UX] [sidebar] verificar se há risco de dados de outro usuário.
01058. [FRONTEND_UI_UX] [sidebar] verificar se há risco de SQL injection.
01059. [FRONTEND_UI_UX] [sidebar] verificar se há risco de XSS.
01060. [FRONTEND_UI_UX] [sidebar] verificar se há risco de upload inseguro.
01061. [FRONTEND_UI_UX] [sidebar] verificar se imagens têm fallback correto.
01062. [FRONTEND_UI_UX] [sidebar] verificar se /core.png aparece como placeholder.
01063. [FRONTEND_UI_UX] [sidebar] verificar se /logo.png está disponível.
01064. [FRONTEND_UI_UX] [sidebar] verificar se rotas batem entre front e back.
01065. [FRONTEND_UI_UX] [sidebar] verificar se payload esperado bate com payload real.
01066. [FRONTEND_UI_UX] [sidebar] verificar se campos do banco batem com model.
01067. [FRONTEND_UI_UX] [sidebar] verificar se controller retorna padrão consistente.
01068. [FRONTEND_UI_UX] [sidebar] verificar se paginação existe e funciona.
01069. [FRONTEND_UI_UX] [sidebar] verificar se filtros podem ser combinados.
01070. [FRONTEND_UI_UX] [sidebar] verificar se dados null quebram a tela.
01071. [FRONTEND_UI_UX] [sidebar] verificar se array vazio tem estado visual.
01072. [FRONTEND_UI_UX] [sidebar] verificar se loading impede tela quebrada.
01073. [FRONTEND_UI_UX] [sidebar] verificar se modal fecha corretamente.
01074. [FRONTEND_UI_UX] [sidebar] verificar se header não sobrepõe conteúdo.
01075. [FRONTEND_UI_UX] [sidebar] verificar se layout é responsivo.
01076. [FRONTEND_UI_UX] [sidebar] verificar se contraste é legível.
01077. [FRONTEND_UI_UX] [sidebar] verificar se texto é humano e não técnico.
01078. [FRONTEND_UI_UX] [sidebar] verificar se existe teste manual possível.
01079. [FRONTEND_UI_UX] [sidebar] classificar severidade.
01080. [FRONTEND_UI_UX] [sidebar] propor correção com risco estimado.

### FRONTEND_UI_UX / not-found
01081. [FRONTEND_UI_UX] [not-found] identificar arquivo responsável.
01082. [FRONTEND_UI_UX] [not-found] identificar dependências diretas.
01083. [FRONTEND_UI_UX] [not-found] identificar dependências indiretas.
01084. [FRONTEND_UI_UX] [not-found] verificar se há código morto.
01085. [FRONTEND_UI_UX] [not-found] verificar se há import não usado.
01086. [FRONTEND_UI_UX] [not-found] verificar se há variável indefinida.
01087. [FRONTEND_UI_UX] [not-found] verificar se há duplicação de lógica.
01088. [FRONTEND_UI_UX] [not-found] verificar se há comentário desatualizado.
01089. [FRONTEND_UI_UX] [not-found] verificar se a regra de negócio está clara.
01090. [FRONTEND_UI_UX] [not-found] verificar se há tratamento de erro.
01091. [FRONTEND_UI_UX] [not-found] verificar se o erro é amigável para usuário comum.
01092. [FRONTEND_UI_UX] [not-found] verificar se erro técnico fica apenas no console ou relatório.
01093. [FRONTEND_UI_UX] [not-found] verificar se há validação de entrada.
01094. [FRONTEND_UI_UX] [not-found] verificar se há validação de saída.
01095. [FRONTEND_UI_UX] [not-found] verificar se há validação de permissão.
01096. [FRONTEND_UI_UX] [not-found] verificar se há risco de acesso indevido.
01097. [FRONTEND_UI_UX] [not-found] verificar se há risco de dados de outro usuário.
01098. [FRONTEND_UI_UX] [not-found] verificar se há risco de SQL injection.
01099. [FRONTEND_UI_UX] [not-found] verificar se há risco de XSS.
01100. [FRONTEND_UI_UX] [not-found] verificar se há risco de upload inseguro.
01101. [FRONTEND_UI_UX] [not-found] verificar se imagens têm fallback correto.
01102. [FRONTEND_UI_UX] [not-found] verificar se /core.png aparece como placeholder.
01103. [FRONTEND_UI_UX] [not-found] verificar se /logo.png está disponível.
01104. [FRONTEND_UI_UX] [not-found] verificar se rotas batem entre front e back.
01105. [FRONTEND_UI_UX] [not-found] verificar se payload esperado bate com payload real.
01106. [FRONTEND_UI_UX] [not-found] verificar se campos do banco batem com model.
01107. [FRONTEND_UI_UX] [not-found] verificar se controller retorna padrão consistente.
01108. [FRONTEND_UI_UX] [not-found] verificar se paginação existe e funciona.
01109. [FRONTEND_UI_UX] [not-found] verificar se filtros podem ser combinados.
01110. [FRONTEND_UI_UX] [not-found] verificar se dados null quebram a tela.
01111. [FRONTEND_UI_UX] [not-found] verificar se array vazio tem estado visual.
01112. [FRONTEND_UI_UX] [not-found] verificar se loading impede tela quebrada.
01113. [FRONTEND_UI_UX] [not-found] verificar se modal fecha corretamente.
01114. [FRONTEND_UI_UX] [not-found] verificar se header não sobrepõe conteúdo.
01115. [FRONTEND_UI_UX] [not-found] verificar se layout é responsivo.
01116. [FRONTEND_UI_UX] [not-found] verificar se contraste é legível.
01117. [FRONTEND_UI_UX] [not-found] verificar se texto é humano e não técnico.
01118. [FRONTEND_UI_UX] [not-found] verificar se existe teste manual possível.
01119. [FRONTEND_UI_UX] [not-found] classificar severidade.
01120. [FRONTEND_UI_UX] [not-found] propor correção com risco estimado.

### FRONTEND_UI_UX / loading
01121. [FRONTEND_UI_UX] [loading] identificar arquivo responsável.
01122. [FRONTEND_UI_UX] [loading] identificar dependências diretas.
01123. [FRONTEND_UI_UX] [loading] identificar dependências indiretas.
01124. [FRONTEND_UI_UX] [loading] verificar se há código morto.
01125. [FRONTEND_UI_UX] [loading] verificar se há import não usado.
01126. [FRONTEND_UI_UX] [loading] verificar se há variável indefinida.
01127. [FRONTEND_UI_UX] [loading] verificar se há duplicação de lógica.
01128. [FRONTEND_UI_UX] [loading] verificar se há comentário desatualizado.
01129. [FRONTEND_UI_UX] [loading] verificar se a regra de negócio está clara.
01130. [FRONTEND_UI_UX] [loading] verificar se há tratamento de erro.
01131. [FRONTEND_UI_UX] [loading] verificar se o erro é amigável para usuário comum.
01132. [FRONTEND_UI_UX] [loading] verificar se erro técnico fica apenas no console ou relatório.
01133. [FRONTEND_UI_UX] [loading] verificar se há validação de entrada.
01134. [FRONTEND_UI_UX] [loading] verificar se há validação de saída.
01135. [FRONTEND_UI_UX] [loading] verificar se há validação de permissão.
01136. [FRONTEND_UI_UX] [loading] verificar se há risco de acesso indevido.
01137. [FRONTEND_UI_UX] [loading] verificar se há risco de dados de outro usuário.
01138. [FRONTEND_UI_UX] [loading] verificar se há risco de SQL injection.
01139. [FRONTEND_UI_UX] [loading] verificar se há risco de XSS.
01140. [FRONTEND_UI_UX] [loading] verificar se há risco de upload inseguro.
01141. [FRONTEND_UI_UX] [loading] verificar se imagens têm fallback correto.
01142. [FRONTEND_UI_UX] [loading] verificar se /core.png aparece como placeholder.
01143. [FRONTEND_UI_UX] [loading] verificar se /logo.png está disponível.
01144. [FRONTEND_UI_UX] [loading] verificar se rotas batem entre front e back.
01145. [FRONTEND_UI_UX] [loading] verificar se payload esperado bate com payload real.
01146. [FRONTEND_UI_UX] [loading] verificar se campos do banco batem com model.
01147. [FRONTEND_UI_UX] [loading] verificar se controller retorna padrão consistente.
01148. [FRONTEND_UI_UX] [loading] verificar se paginação existe e funciona.
01149. [FRONTEND_UI_UX] [loading] verificar se filtros podem ser combinados.
01150. [FRONTEND_UI_UX] [loading] verificar se dados null quebram a tela.
01151. [FRONTEND_UI_UX] [loading] verificar se array vazio tem estado visual.
01152. [FRONTEND_UI_UX] [loading] verificar se loading impede tela quebrada.
01153. [FRONTEND_UI_UX] [loading] verificar se modal fecha corretamente.
01154. [FRONTEND_UI_UX] [loading] verificar se header não sobrepõe conteúdo.
01155. [FRONTEND_UI_UX] [loading] verificar se layout é responsivo.
01156. [FRONTEND_UI_UX] [loading] verificar se contraste é legível.
01157. [FRONTEND_UI_UX] [loading] verificar se texto é humano e não técnico.
01158. [FRONTEND_UI_UX] [loading] verificar se existe teste manual possível.
01159. [FRONTEND_UI_UX] [loading] classificar severidade.
01160. [FRONTEND_UI_UX] [loading] propor correção com risco estimado.

---

## 6. Revisão detalhada — FRONTEND_DADOS

### FRONTEND_DADOS / fetch GET
01161. [FRONTEND_DADOS] [fetch GET] identificar arquivo responsável.
01162. [FRONTEND_DADOS] [fetch GET] identificar dependências diretas.
01163. [FRONTEND_DADOS] [fetch GET] identificar dependências indiretas.
01164. [FRONTEND_DADOS] [fetch GET] verificar se há código morto.
01165. [FRONTEND_DADOS] [fetch GET] verificar se há import não usado.
01166. [FRONTEND_DADOS] [fetch GET] verificar se há variável indefinida.
01167. [FRONTEND_DADOS] [fetch GET] verificar se há duplicação de lógica.
01168. [FRONTEND_DADOS] [fetch GET] verificar se há comentário desatualizado.
01169. [FRONTEND_DADOS] [fetch GET] verificar se a regra de negócio está clara.
01170. [FRONTEND_DADOS] [fetch GET] verificar se há tratamento de erro.
01171. [FRONTEND_DADOS] [fetch GET] verificar se o erro é amigável para usuário comum.
01172. [FRONTEND_DADOS] [fetch GET] verificar se erro técnico fica apenas no console ou relatório.
01173. [FRONTEND_DADOS] [fetch GET] verificar se há validação de entrada.
01174. [FRONTEND_DADOS] [fetch GET] verificar se há validação de saída.
01175. [FRONTEND_DADOS] [fetch GET] verificar se há validação de permissão.
01176. [FRONTEND_DADOS] [fetch GET] verificar se há risco de acesso indevido.
01177. [FRONTEND_DADOS] [fetch GET] verificar se há risco de dados de outro usuário.
01178. [FRONTEND_DADOS] [fetch GET] verificar se há risco de SQL injection.
01179. [FRONTEND_DADOS] [fetch GET] verificar se há risco de XSS.
01180. [FRONTEND_DADOS] [fetch GET] verificar se há risco de upload inseguro.
01181. [FRONTEND_DADOS] [fetch GET] verificar se imagens têm fallback correto.
01182. [FRONTEND_DADOS] [fetch GET] verificar se /core.png aparece como placeholder.
01183. [FRONTEND_DADOS] [fetch GET] verificar se /logo.png está disponível.
01184. [FRONTEND_DADOS] [fetch GET] verificar se rotas batem entre front e back.
01185. [FRONTEND_DADOS] [fetch GET] verificar se payload esperado bate com payload real.
01186. [FRONTEND_DADOS] [fetch GET] verificar se campos do banco batem com model.
01187. [FRONTEND_DADOS] [fetch GET] verificar se controller retorna padrão consistente.
01188. [FRONTEND_DADOS] [fetch GET] verificar se paginação existe e funciona.
01189. [FRONTEND_DADOS] [fetch GET] verificar se filtros podem ser combinados.
01190. [FRONTEND_DADOS] [fetch GET] verificar se dados null quebram a tela.
01191. [FRONTEND_DADOS] [fetch GET] verificar se array vazio tem estado visual.
01192. [FRONTEND_DADOS] [fetch GET] verificar se loading impede tela quebrada.
01193. [FRONTEND_DADOS] [fetch GET] verificar se modal fecha corretamente.
01194. [FRONTEND_DADOS] [fetch GET] verificar se header não sobrepõe conteúdo.
01195. [FRONTEND_DADOS] [fetch GET] verificar se layout é responsivo.
01196. [FRONTEND_DADOS] [fetch GET] verificar se contraste é legível.
01197. [FRONTEND_DADOS] [fetch GET] verificar se texto é humano e não técnico.
01198. [FRONTEND_DADOS] [fetch GET] verificar se existe teste manual possível.
01199. [FRONTEND_DADOS] [fetch GET] classificar severidade.
01200. [FRONTEND_DADOS] [fetch GET] propor correção com risco estimado.

### FRONTEND_DADOS / fetch POST
01201. [FRONTEND_DADOS] [fetch POST] identificar arquivo responsável.
01202. [FRONTEND_DADOS] [fetch POST] identificar dependências diretas.
01203. [FRONTEND_DADOS] [fetch POST] identificar dependências indiretas.
01204. [FRONTEND_DADOS] [fetch POST] verificar se há código morto.
01205. [FRONTEND_DADOS] [fetch POST] verificar se há import não usado.
01206. [FRONTEND_DADOS] [fetch POST] verificar se há variável indefinida.
01207. [FRONTEND_DADOS] [fetch POST] verificar se há duplicação de lógica.
01208. [FRONTEND_DADOS] [fetch POST] verificar se há comentário desatualizado.
01209. [FRONTEND_DADOS] [fetch POST] verificar se a regra de negócio está clara.
01210. [FRONTEND_DADOS] [fetch POST] verificar se há tratamento de erro.
01211. [FRONTEND_DADOS] [fetch POST] verificar se o erro é amigável para usuário comum.
01212. [FRONTEND_DADOS] [fetch POST] verificar se erro técnico fica apenas no console ou relatório.
01213. [FRONTEND_DADOS] [fetch POST] verificar se há validação de entrada.
01214. [FRONTEND_DADOS] [fetch POST] verificar se há validação de saída.
01215. [FRONTEND_DADOS] [fetch POST] verificar se há validação de permissão.
01216. [FRONTEND_DADOS] [fetch POST] verificar se há risco de acesso indevido.
01217. [FRONTEND_DADOS] [fetch POST] verificar se há risco de dados de outro usuário.
01218. [FRONTEND_DADOS] [fetch POST] verificar se há risco de SQL injection.
01219. [FRONTEND_DADOS] [fetch POST] verificar se há risco de XSS.
01220. [FRONTEND_DADOS] [fetch POST] verificar se há risco de upload inseguro.
01221. [FRONTEND_DADOS] [fetch POST] verificar se imagens têm fallback correto.
01222. [FRONTEND_DADOS] [fetch POST] verificar se /core.png aparece como placeholder.
01223. [FRONTEND_DADOS] [fetch POST] verificar se /logo.png está disponível.
01224. [FRONTEND_DADOS] [fetch POST] verificar se rotas batem entre front e back.
01225. [FRONTEND_DADOS] [fetch POST] verificar se payload esperado bate com payload real.
01226. [FRONTEND_DADOS] [fetch POST] verificar se campos do banco batem com model.
01227. [FRONTEND_DADOS] [fetch POST] verificar se controller retorna padrão consistente.
01228. [FRONTEND_DADOS] [fetch POST] verificar se paginação existe e funciona.
01229. [FRONTEND_DADOS] [fetch POST] verificar se filtros podem ser combinados.
01230. [FRONTEND_DADOS] [fetch POST] verificar se dados null quebram a tela.
01231. [FRONTEND_DADOS] [fetch POST] verificar se array vazio tem estado visual.
01232. [FRONTEND_DADOS] [fetch POST] verificar se loading impede tela quebrada.
01233. [FRONTEND_DADOS] [fetch POST] verificar se modal fecha corretamente.
01234. [FRONTEND_DADOS] [fetch POST] verificar se header não sobrepõe conteúdo.
01235. [FRONTEND_DADOS] [fetch POST] verificar se layout é responsivo.
01236. [FRONTEND_DADOS] [fetch POST] verificar se contraste é legível.
01237. [FRONTEND_DADOS] [fetch POST] verificar se texto é humano e não técnico.
01238. [FRONTEND_DADOS] [fetch POST] verificar se existe teste manual possível.
01239. [FRONTEND_DADOS] [fetch POST] classificar severidade.
01240. [FRONTEND_DADOS] [fetch POST] propor correção com risco estimado.

### FRONTEND_DADOS / fetch PUT
01241. [FRONTEND_DADOS] [fetch PUT] identificar arquivo responsável.
01242. [FRONTEND_DADOS] [fetch PUT] identificar dependências diretas.
01243. [FRONTEND_DADOS] [fetch PUT] identificar dependências indiretas.
01244. [FRONTEND_DADOS] [fetch PUT] verificar se há código morto.
01245. [FRONTEND_DADOS] [fetch PUT] verificar se há import não usado.
01246. [FRONTEND_DADOS] [fetch PUT] verificar se há variável indefinida.
01247. [FRONTEND_DADOS] [fetch PUT] verificar se há duplicação de lógica.
01248. [FRONTEND_DADOS] [fetch PUT] verificar se há comentário desatualizado.
01249. [FRONTEND_DADOS] [fetch PUT] verificar se a regra de negócio está clara.
01250. [FRONTEND_DADOS] [fetch PUT] verificar se há tratamento de erro.
01251. [FRONTEND_DADOS] [fetch PUT] verificar se o erro é amigável para usuário comum.
01252. [FRONTEND_DADOS] [fetch PUT] verificar se erro técnico fica apenas no console ou relatório.
01253. [FRONTEND_DADOS] [fetch PUT] verificar se há validação de entrada.
01254. [FRONTEND_DADOS] [fetch PUT] verificar se há validação de saída.
01255. [FRONTEND_DADOS] [fetch PUT] verificar se há validação de permissão.
01256. [FRONTEND_DADOS] [fetch PUT] verificar se há risco de acesso indevido.
01257. [FRONTEND_DADOS] [fetch PUT] verificar se há risco de dados de outro usuário.
01258. [FRONTEND_DADOS] [fetch PUT] verificar se há risco de SQL injection.
01259. [FRONTEND_DADOS] [fetch PUT] verificar se há risco de XSS.
01260. [FRONTEND_DADOS] [fetch PUT] verificar se há risco de upload inseguro.
01261. [FRONTEND_DADOS] [fetch PUT] verificar se imagens têm fallback correto.
01262. [FRONTEND_DADOS] [fetch PUT] verificar se /core.png aparece como placeholder.
01263. [FRONTEND_DADOS] [fetch PUT] verificar se /logo.png está disponível.
01264. [FRONTEND_DADOS] [fetch PUT] verificar se rotas batem entre front e back.
01265. [FRONTEND_DADOS] [fetch PUT] verificar se payload esperado bate com payload real.
01266. [FRONTEND_DADOS] [fetch PUT] verificar se campos do banco batem com model.
01267. [FRONTEND_DADOS] [fetch PUT] verificar se controller retorna padrão consistente.
01268. [FRONTEND_DADOS] [fetch PUT] verificar se paginação existe e funciona.
01269. [FRONTEND_DADOS] [fetch PUT] verificar se filtros podem ser combinados.
01270. [FRONTEND_DADOS] [fetch PUT] verificar se dados null quebram a tela.
01271. [FRONTEND_DADOS] [fetch PUT] verificar se array vazio tem estado visual.
01272. [FRONTEND_DADOS] [fetch PUT] verificar se loading impede tela quebrada.
01273. [FRONTEND_DADOS] [fetch PUT] verificar se modal fecha corretamente.
01274. [FRONTEND_DADOS] [fetch PUT] verificar se header não sobrepõe conteúdo.
01275. [FRONTEND_DADOS] [fetch PUT] verificar se layout é responsivo.
01276. [FRONTEND_DADOS] [fetch PUT] verificar se contraste é legível.
01277. [FRONTEND_DADOS] [fetch PUT] verificar se texto é humano e não técnico.
01278. [FRONTEND_DADOS] [fetch PUT] verificar se existe teste manual possível.
01279. [FRONTEND_DADOS] [fetch PUT] classificar severidade.
01280. [FRONTEND_DADOS] [fetch PUT] propor correção com risco estimado.

### FRONTEND_DADOS / fetch DELETE
01281. [FRONTEND_DADOS] [fetch DELETE] identificar arquivo responsável.
01282. [FRONTEND_DADOS] [fetch DELETE] identificar dependências diretas.
01283. [FRONTEND_DADOS] [fetch DELETE] identificar dependências indiretas.
01284. [FRONTEND_DADOS] [fetch DELETE] verificar se há código morto.
01285. [FRONTEND_DADOS] [fetch DELETE] verificar se há import não usado.
01286. [FRONTEND_DADOS] [fetch DELETE] verificar se há variável indefinida.
01287. [FRONTEND_DADOS] [fetch DELETE] verificar se há duplicação de lógica.
01288. [FRONTEND_DADOS] [fetch DELETE] verificar se há comentário desatualizado.
01289. [FRONTEND_DADOS] [fetch DELETE] verificar se a regra de negócio está clara.
01290. [FRONTEND_DADOS] [fetch DELETE] verificar se há tratamento de erro.
01291. [FRONTEND_DADOS] [fetch DELETE] verificar se o erro é amigável para usuário comum.
01292. [FRONTEND_DADOS] [fetch DELETE] verificar se erro técnico fica apenas no console ou relatório.
01293. [FRONTEND_DADOS] [fetch DELETE] verificar se há validação de entrada.
01294. [FRONTEND_DADOS] [fetch DELETE] verificar se há validação de saída.
01295. [FRONTEND_DADOS] [fetch DELETE] verificar se há validação de permissão.
01296. [FRONTEND_DADOS] [fetch DELETE] verificar se há risco de acesso indevido.
01297. [FRONTEND_DADOS] [fetch DELETE] verificar se há risco de dados de outro usuário.
01298. [FRONTEND_DADOS] [fetch DELETE] verificar se há risco de SQL injection.
01299. [FRONTEND_DADOS] [fetch DELETE] verificar se há risco de XSS.
01300. [FRONTEND_DADOS] [fetch DELETE] verificar se há risco de upload inseguro.
01301. [FRONTEND_DADOS] [fetch DELETE] verificar se imagens têm fallback correto.
01302. [FRONTEND_DADOS] [fetch DELETE] verificar se /core.png aparece como placeholder.
01303. [FRONTEND_DADOS] [fetch DELETE] verificar se /logo.png está disponível.
01304. [FRONTEND_DADOS] [fetch DELETE] verificar se rotas batem entre front e back.
01305. [FRONTEND_DADOS] [fetch DELETE] verificar se payload esperado bate com payload real.
01306. [FRONTEND_DADOS] [fetch DELETE] verificar se campos do banco batem com model.
01307. [FRONTEND_DADOS] [fetch DELETE] verificar se controller retorna padrão consistente.
01308. [FRONTEND_DADOS] [fetch DELETE] verificar se paginação existe e funciona.
01309. [FRONTEND_DADOS] [fetch DELETE] verificar se filtros podem ser combinados.
01310. [FRONTEND_DADOS] [fetch DELETE] verificar se dados null quebram a tela.
01311. [FRONTEND_DADOS] [fetch DELETE] verificar se array vazio tem estado visual.
01312. [FRONTEND_DADOS] [fetch DELETE] verificar se loading impede tela quebrada.
01313. [FRONTEND_DADOS] [fetch DELETE] verificar se modal fecha corretamente.
01314. [FRONTEND_DADOS] [fetch DELETE] verificar se header não sobrepõe conteúdo.
01315. [FRONTEND_DADOS] [fetch DELETE] verificar se layout é responsivo.
01316. [FRONTEND_DADOS] [fetch DELETE] verificar se contraste é legível.
01317. [FRONTEND_DADOS] [fetch DELETE] verificar se texto é humano e não técnico.
01318. [FRONTEND_DADOS] [fetch DELETE] verificar se existe teste manual possível.
01319. [FRONTEND_DADOS] [fetch DELETE] classificar severidade.
01320. [FRONTEND_DADOS] [fetch DELETE] propor correção com risco estimado.

### FRONTEND_DADOS / headers
01321. [FRONTEND_DADOS] [headers] identificar arquivo responsável.
01322. [FRONTEND_DADOS] [headers] identificar dependências diretas.
01323. [FRONTEND_DADOS] [headers] identificar dependências indiretas.
01324. [FRONTEND_DADOS] [headers] verificar se há código morto.
01325. [FRONTEND_DADOS] [headers] verificar se há import não usado.
01326. [FRONTEND_DADOS] [headers] verificar se há variável indefinida.
01327. [FRONTEND_DADOS] [headers] verificar se há duplicação de lógica.
01328. [FRONTEND_DADOS] [headers] verificar se há comentário desatualizado.
01329. [FRONTEND_DADOS] [headers] verificar se a regra de negócio está clara.
01330. [FRONTEND_DADOS] [headers] verificar se há tratamento de erro.
01331. [FRONTEND_DADOS] [headers] verificar se o erro é amigável para usuário comum.
01332. [FRONTEND_DADOS] [headers] verificar se erro técnico fica apenas no console ou relatório.
01333. [FRONTEND_DADOS] [headers] verificar se há validação de entrada.
01334. [FRONTEND_DADOS] [headers] verificar se há validação de saída.
01335. [FRONTEND_DADOS] [headers] verificar se há validação de permissão.
01336. [FRONTEND_DADOS] [headers] verificar se há risco de acesso indevido.
01337. [FRONTEND_DADOS] [headers] verificar se há risco de dados de outro usuário.
01338. [FRONTEND_DADOS] [headers] verificar se há risco de SQL injection.
01339. [FRONTEND_DADOS] [headers] verificar se há risco de XSS.
01340. [FRONTEND_DADOS] [headers] verificar se há risco de upload inseguro.
01341. [FRONTEND_DADOS] [headers] verificar se imagens têm fallback correto.
01342. [FRONTEND_DADOS] [headers] verificar se /core.png aparece como placeholder.
01343. [FRONTEND_DADOS] [headers] verificar se /logo.png está disponível.
01344. [FRONTEND_DADOS] [headers] verificar se rotas batem entre front e back.
01345. [FRONTEND_DADOS] [headers] verificar se payload esperado bate com payload real.
01346. [FRONTEND_DADOS] [headers] verificar se campos do banco batem com model.
01347. [FRONTEND_DADOS] [headers] verificar se controller retorna padrão consistente.
01348. [FRONTEND_DADOS] [headers] verificar se paginação existe e funciona.
01349. [FRONTEND_DADOS] [headers] verificar se filtros podem ser combinados.
01350. [FRONTEND_DADOS] [headers] verificar se dados null quebram a tela.
01351. [FRONTEND_DADOS] [headers] verificar se array vazio tem estado visual.
01352. [FRONTEND_DADOS] [headers] verificar se loading impede tela quebrada.
01353. [FRONTEND_DADOS] [headers] verificar se modal fecha corretamente.
01354. [FRONTEND_DADOS] [headers] verificar se header não sobrepõe conteúdo.
01355. [FRONTEND_DADOS] [headers] verificar se layout é responsivo.
01356. [FRONTEND_DADOS] [headers] verificar se contraste é legível.
01357. [FRONTEND_DADOS] [headers] verificar se texto é humano e não técnico.
01358. [FRONTEND_DADOS] [headers] verificar se existe teste manual possível.
01359. [FRONTEND_DADOS] [headers] classificar severidade.
01360. [FRONTEND_DADOS] [headers] propor correção com risco estimado.

### FRONTEND_DADOS / token
01361. [FRONTEND_DADOS] [token] identificar arquivo responsável.
01362. [FRONTEND_DADOS] [token] identificar dependências diretas.
01363. [FRONTEND_DADOS] [token] identificar dependências indiretas.
01364. [FRONTEND_DADOS] [token] verificar se há código morto.
01365. [FRONTEND_DADOS] [token] verificar se há import não usado.
01366. [FRONTEND_DADOS] [token] verificar se há variável indefinida.
01367. [FRONTEND_DADOS] [token] verificar se há duplicação de lógica.
01368. [FRONTEND_DADOS] [token] verificar se há comentário desatualizado.
01369. [FRONTEND_DADOS] [token] verificar se a regra de negócio está clara.
01370. [FRONTEND_DADOS] [token] verificar se há tratamento de erro.
01371. [FRONTEND_DADOS] [token] verificar se o erro é amigável para usuário comum.
01372. [FRONTEND_DADOS] [token] verificar se erro técnico fica apenas no console ou relatório.
01373. [FRONTEND_DADOS] [token] verificar se há validação de entrada.
01374. [FRONTEND_DADOS] [token] verificar se há validação de saída.
01375. [FRONTEND_DADOS] [token] verificar se há validação de permissão.
01376. [FRONTEND_DADOS] [token] verificar se há risco de acesso indevido.
01377. [FRONTEND_DADOS] [token] verificar se há risco de dados de outro usuário.
01378. [FRONTEND_DADOS] [token] verificar se há risco de SQL injection.
01379. [FRONTEND_DADOS] [token] verificar se há risco de XSS.
01380. [FRONTEND_DADOS] [token] verificar se há risco de upload inseguro.
01381. [FRONTEND_DADOS] [token] verificar se imagens têm fallback correto.
01382. [FRONTEND_DADOS] [token] verificar se /core.png aparece como placeholder.
01383. [FRONTEND_DADOS] [token] verificar se /logo.png está disponível.
01384. [FRONTEND_DADOS] [token] verificar se rotas batem entre front e back.
01385. [FRONTEND_DADOS] [token] verificar se payload esperado bate com payload real.
01386. [FRONTEND_DADOS] [token] verificar se campos do banco batem com model.
01387. [FRONTEND_DADOS] [token] verificar se controller retorna padrão consistente.
01388. [FRONTEND_DADOS] [token] verificar se paginação existe e funciona.
01389. [FRONTEND_DADOS] [token] verificar se filtros podem ser combinados.
01390. [FRONTEND_DADOS] [token] verificar se dados null quebram a tela.
01391. [FRONTEND_DADOS] [token] verificar se array vazio tem estado visual.
01392. [FRONTEND_DADOS] [token] verificar se loading impede tela quebrada.
01393. [FRONTEND_DADOS] [token] verificar se modal fecha corretamente.
01394. [FRONTEND_DADOS] [token] verificar se header não sobrepõe conteúdo.
01395. [FRONTEND_DADOS] [token] verificar se layout é responsivo.
01396. [FRONTEND_DADOS] [token] verificar se contraste é legível.
01397. [FRONTEND_DADOS] [token] verificar se texto é humano e não técnico.
01398. [FRONTEND_DADOS] [token] verificar se existe teste manual possível.
01399. [FRONTEND_DADOS] [token] classificar severidade.
01400. [FRONTEND_DADOS] [token] propor correção com risco estimado.

### FRONTEND_DADOS / localStorage
01401. [FRONTEND_DADOS] [localStorage] identificar arquivo responsável.
01402. [FRONTEND_DADOS] [localStorage] identificar dependências diretas.
01403. [FRONTEND_DADOS] [localStorage] identificar dependências indiretas.
01404. [FRONTEND_DADOS] [localStorage] verificar se há código morto.
01405. [FRONTEND_DADOS] [localStorage] verificar se há import não usado.
01406. [FRONTEND_DADOS] [localStorage] verificar se há variável indefinida.
01407. [FRONTEND_DADOS] [localStorage] verificar se há duplicação de lógica.
01408. [FRONTEND_DADOS] [localStorage] verificar se há comentário desatualizado.
01409. [FRONTEND_DADOS] [localStorage] verificar se a regra de negócio está clara.
01410. [FRONTEND_DADOS] [localStorage] verificar se há tratamento de erro.
01411. [FRONTEND_DADOS] [localStorage] verificar se o erro é amigável para usuário comum.
01412. [FRONTEND_DADOS] [localStorage] verificar se erro técnico fica apenas no console ou relatório.
01413. [FRONTEND_DADOS] [localStorage] verificar se há validação de entrada.
01414. [FRONTEND_DADOS] [localStorage] verificar se há validação de saída.
01415. [FRONTEND_DADOS] [localStorage] verificar se há validação de permissão.
01416. [FRONTEND_DADOS] [localStorage] verificar se há risco de acesso indevido.
01417. [FRONTEND_DADOS] [localStorage] verificar se há risco de dados de outro usuário.
01418. [FRONTEND_DADOS] [localStorage] verificar se há risco de SQL injection.
01419. [FRONTEND_DADOS] [localStorage] verificar se há risco de XSS.
01420. [FRONTEND_DADOS] [localStorage] verificar se há risco de upload inseguro.
01421. [FRONTEND_DADOS] [localStorage] verificar se imagens têm fallback correto.
01422. [FRONTEND_DADOS] [localStorage] verificar se /core.png aparece como placeholder.
01423. [FRONTEND_DADOS] [localStorage] verificar se /logo.png está disponível.
01424. [FRONTEND_DADOS] [localStorage] verificar se rotas batem entre front e back.
01425. [FRONTEND_DADOS] [localStorage] verificar se payload esperado bate com payload real.
01426. [FRONTEND_DADOS] [localStorage] verificar se campos do banco batem com model.
01427. [FRONTEND_DADOS] [localStorage] verificar se controller retorna padrão consistente.
01428. [FRONTEND_DADOS] [localStorage] verificar se paginação existe e funciona.
01429. [FRONTEND_DADOS] [localStorage] verificar se filtros podem ser combinados.
01430. [FRONTEND_DADOS] [localStorage] verificar se dados null quebram a tela.
01431. [FRONTEND_DADOS] [localStorage] verificar se array vazio tem estado visual.
01432. [FRONTEND_DADOS] [localStorage] verificar se loading impede tela quebrada.
01433. [FRONTEND_DADOS] [localStorage] verificar se modal fecha corretamente.
01434. [FRONTEND_DADOS] [localStorage] verificar se header não sobrepõe conteúdo.
01435. [FRONTEND_DADOS] [localStorage] verificar se layout é responsivo.
01436. [FRONTEND_DADOS] [localStorage] verificar se contraste é legível.
01437. [FRONTEND_DADOS] [localStorage] verificar se texto é humano e não técnico.
01438. [FRONTEND_DADOS] [localStorage] verificar se existe teste manual possível.
01439. [FRONTEND_DADOS] [localStorage] classificar severidade.
01440. [FRONTEND_DADOS] [localStorage] propor correção com risco estimado.

### FRONTEND_DADOS / normalização de payload
01441. [FRONTEND_DADOS] [normalização de payload] identificar arquivo responsável.
01442. [FRONTEND_DADOS] [normalização de payload] identificar dependências diretas.
01443. [FRONTEND_DADOS] [normalização de payload] identificar dependências indiretas.
01444. [FRONTEND_DADOS] [normalização de payload] verificar se há código morto.
01445. [FRONTEND_DADOS] [normalização de payload] verificar se há import não usado.
01446. [FRONTEND_DADOS] [normalização de payload] verificar se há variável indefinida.
01447. [FRONTEND_DADOS] [normalização de payload] verificar se há duplicação de lógica.
01448. [FRONTEND_DADOS] [normalização de payload] verificar se há comentário desatualizado.
01449. [FRONTEND_DADOS] [normalização de payload] verificar se a regra de negócio está clara.
01450. [FRONTEND_DADOS] [normalização de payload] verificar se há tratamento de erro.
01451. [FRONTEND_DADOS] [normalização de payload] verificar se o erro é amigável para usuário comum.
01452. [FRONTEND_DADOS] [normalização de payload] verificar se erro técnico fica apenas no console ou relatório.
01453. [FRONTEND_DADOS] [normalização de payload] verificar se há validação de entrada.
01454. [FRONTEND_DADOS] [normalização de payload] verificar se há validação de saída.
01455. [FRONTEND_DADOS] [normalização de payload] verificar se há validação de permissão.
01456. [FRONTEND_DADOS] [normalização de payload] verificar se há risco de acesso indevido.
01457. [FRONTEND_DADOS] [normalização de payload] verificar se há risco de dados de outro usuário.
01458. [FRONTEND_DADOS] [normalização de payload] verificar se há risco de SQL injection.
01459. [FRONTEND_DADOS] [normalização de payload] verificar se há risco de XSS.
01460. [FRONTEND_DADOS] [normalização de payload] verificar se há risco de upload inseguro.
01461. [FRONTEND_DADOS] [normalização de payload] verificar se imagens têm fallback correto.
01462. [FRONTEND_DADOS] [normalização de payload] verificar se /core.png aparece como placeholder.
01463. [FRONTEND_DADOS] [normalização de payload] verificar se /logo.png está disponível.
01464. [FRONTEND_DADOS] [normalização de payload] verificar se rotas batem entre front e back.
01465. [FRONTEND_DADOS] [normalização de payload] verificar se payload esperado bate com payload real.
01466. [FRONTEND_DADOS] [normalização de payload] verificar se campos do banco batem com model.
01467. [FRONTEND_DADOS] [normalização de payload] verificar se controller retorna padrão consistente.
01468. [FRONTEND_DADOS] [normalização de payload] verificar se paginação existe e funciona.
01469. [FRONTEND_DADOS] [normalização de payload] verificar se filtros podem ser combinados.
01470. [FRONTEND_DADOS] [normalização de payload] verificar se dados null quebram a tela.
01471. [FRONTEND_DADOS] [normalização de payload] verificar se array vazio tem estado visual.
01472. [FRONTEND_DADOS] [normalização de payload] verificar se loading impede tela quebrada.
01473. [FRONTEND_DADOS] [normalização de payload] verificar se modal fecha corretamente.
01474. [FRONTEND_DADOS] [normalização de payload] verificar se header não sobrepõe conteúdo.
01475. [FRONTEND_DADOS] [normalização de payload] verificar se layout é responsivo.
01476. [FRONTEND_DADOS] [normalização de payload] verificar se contraste é legível.
01477. [FRONTEND_DADOS] [normalização de payload] verificar se texto é humano e não técnico.
01478. [FRONTEND_DADOS] [normalização de payload] verificar se existe teste manual possível.
01479. [FRONTEND_DADOS] [normalização de payload] classificar severidade.
01480. [FRONTEND_DADOS] [normalização de payload] propor correção com risco estimado.

### FRONTEND_DADOS / tratamento de erro
01481. [FRONTEND_DADOS] [tratamento de erro] identificar arquivo responsável.
01482. [FRONTEND_DADOS] [tratamento de erro] identificar dependências diretas.
01483. [FRONTEND_DADOS] [tratamento de erro] identificar dependências indiretas.
01484. [FRONTEND_DADOS] [tratamento de erro] verificar se há código morto.
01485. [FRONTEND_DADOS] [tratamento de erro] verificar se há import não usado.
01486. [FRONTEND_DADOS] [tratamento de erro] verificar se há variável indefinida.
01487. [FRONTEND_DADOS] [tratamento de erro] verificar se há duplicação de lógica.
01488. [FRONTEND_DADOS] [tratamento de erro] verificar se há comentário desatualizado.
01489. [FRONTEND_DADOS] [tratamento de erro] verificar se a regra de negócio está clara.
01490. [FRONTEND_DADOS] [tratamento de erro] verificar se há tratamento de erro.
01491. [FRONTEND_DADOS] [tratamento de erro] verificar se o erro é amigável para usuário comum.
01492. [FRONTEND_DADOS] [tratamento de erro] verificar se erro técnico fica apenas no console ou relatório.
01493. [FRONTEND_DADOS] [tratamento de erro] verificar se há validação de entrada.
01494. [FRONTEND_DADOS] [tratamento de erro] verificar se há validação de saída.
01495. [FRONTEND_DADOS] [tratamento de erro] verificar se há validação de permissão.
01496. [FRONTEND_DADOS] [tratamento de erro] verificar se há risco de acesso indevido.
01497. [FRONTEND_DADOS] [tratamento de erro] verificar se há risco de dados de outro usuário.
01498. [FRONTEND_DADOS] [tratamento de erro] verificar se há risco de SQL injection.
01499. [FRONTEND_DADOS] [tratamento de erro] verificar se há risco de XSS.
01500. [FRONTEND_DADOS] [tratamento de erro] verificar se há risco de upload inseguro.
01501. [FRONTEND_DADOS] [tratamento de erro] verificar se imagens têm fallback correto.
01502. [FRONTEND_DADOS] [tratamento de erro] verificar se /core.png aparece como placeholder.
01503. [FRONTEND_DADOS] [tratamento de erro] verificar se /logo.png está disponível.
01504. [FRONTEND_DADOS] [tratamento de erro] verificar se rotas batem entre front e back.
01505. [FRONTEND_DADOS] [tratamento de erro] verificar se payload esperado bate com payload real.
01506. [FRONTEND_DADOS] [tratamento de erro] verificar se campos do banco batem com model.
01507. [FRONTEND_DADOS] [tratamento de erro] verificar se controller retorna padrão consistente.
01508. [FRONTEND_DADOS] [tratamento de erro] verificar se paginação existe e funciona.
01509. [FRONTEND_DADOS] [tratamento de erro] verificar se filtros podem ser combinados.
01510. [FRONTEND_DADOS] [tratamento de erro] verificar se dados null quebram a tela.
01511. [FRONTEND_DADOS] [tratamento de erro] verificar se array vazio tem estado visual.
01512. [FRONTEND_DADOS] [tratamento de erro] verificar se loading impede tela quebrada.
01513. [FRONTEND_DADOS] [tratamento de erro] verificar se modal fecha corretamente.
01514. [FRONTEND_DADOS] [tratamento de erro] verificar se header não sobrepõe conteúdo.
01515. [FRONTEND_DADOS] [tratamento de erro] verificar se layout é responsivo.
01516. [FRONTEND_DADOS] [tratamento de erro] verificar se contraste é legível.
01517. [FRONTEND_DADOS] [tratamento de erro] verificar se texto é humano e não técnico.
01518. [FRONTEND_DADOS] [tratamento de erro] verificar se existe teste manual possível.
01519. [FRONTEND_DADOS] [tratamento de erro] classificar severidade.
01520. [FRONTEND_DADOS] [tratamento de erro] propor correção com risco estimado.

### FRONTEND_DADOS / estado vazio
01521. [FRONTEND_DADOS] [estado vazio] identificar arquivo responsável.
01522. [FRONTEND_DADOS] [estado vazio] identificar dependências diretas.
01523. [FRONTEND_DADOS] [estado vazio] identificar dependências indiretas.
01524. [FRONTEND_DADOS] [estado vazio] verificar se há código morto.
01525. [FRONTEND_DADOS] [estado vazio] verificar se há import não usado.
01526. [FRONTEND_DADOS] [estado vazio] verificar se há variável indefinida.
01527. [FRONTEND_DADOS] [estado vazio] verificar se há duplicação de lógica.
01528. [FRONTEND_DADOS] [estado vazio] verificar se há comentário desatualizado.
01529. [FRONTEND_DADOS] [estado vazio] verificar se a regra de negócio está clara.
01530. [FRONTEND_DADOS] [estado vazio] verificar se há tratamento de erro.
01531. [FRONTEND_DADOS] [estado vazio] verificar se o erro é amigável para usuário comum.
01532. [FRONTEND_DADOS] [estado vazio] verificar se erro técnico fica apenas no console ou relatório.
01533. [FRONTEND_DADOS] [estado vazio] verificar se há validação de entrada.
01534. [FRONTEND_DADOS] [estado vazio] verificar se há validação de saída.
01535. [FRONTEND_DADOS] [estado vazio] verificar se há validação de permissão.
01536. [FRONTEND_DADOS] [estado vazio] verificar se há risco de acesso indevido.
01537. [FRONTEND_DADOS] [estado vazio] verificar se há risco de dados de outro usuário.
01538. [FRONTEND_DADOS] [estado vazio] verificar se há risco de SQL injection.
01539. [FRONTEND_DADOS] [estado vazio] verificar se há risco de XSS.
01540. [FRONTEND_DADOS] [estado vazio] verificar se há risco de upload inseguro.
01541. [FRONTEND_DADOS] [estado vazio] verificar se imagens têm fallback correto.
01542. [FRONTEND_DADOS] [estado vazio] verificar se /core.png aparece como placeholder.
01543. [FRONTEND_DADOS] [estado vazio] verificar se /logo.png está disponível.
01544. [FRONTEND_DADOS] [estado vazio] verificar se rotas batem entre front e back.
01545. [FRONTEND_DADOS] [estado vazio] verificar se payload esperado bate com payload real.
01546. [FRONTEND_DADOS] [estado vazio] verificar se campos do banco batem com model.
01547. [FRONTEND_DADOS] [estado vazio] verificar se controller retorna padrão consistente.
01548. [FRONTEND_DADOS] [estado vazio] verificar se paginação existe e funciona.
01549. [FRONTEND_DADOS] [estado vazio] verificar se filtros podem ser combinados.
01550. [FRONTEND_DADOS] [estado vazio] verificar se dados null quebram a tela.
01551. [FRONTEND_DADOS] [estado vazio] verificar se array vazio tem estado visual.
01552. [FRONTEND_DADOS] [estado vazio] verificar se loading impede tela quebrada.
01553. [FRONTEND_DADOS] [estado vazio] verificar se modal fecha corretamente.
01554. [FRONTEND_DADOS] [estado vazio] verificar se header não sobrepõe conteúdo.
01555. [FRONTEND_DADOS] [estado vazio] verificar se layout é responsivo.
01556. [FRONTEND_DADOS] [estado vazio] verificar se contraste é legível.
01557. [FRONTEND_DADOS] [estado vazio] verificar se texto é humano e não técnico.
01558. [FRONTEND_DADOS] [estado vazio] verificar se existe teste manual possível.
01559. [FRONTEND_DADOS] [estado vazio] classificar severidade.
01560. [FRONTEND_DADOS] [estado vazio] propor correção com risco estimado.

### FRONTEND_DADOS / loading state
01561. [FRONTEND_DADOS] [loading state] identificar arquivo responsável.
01562. [FRONTEND_DADOS] [loading state] identificar dependências diretas.
01563. [FRONTEND_DADOS] [loading state] identificar dependências indiretas.
01564. [FRONTEND_DADOS] [loading state] verificar se há código morto.
01565. [FRONTEND_DADOS] [loading state] verificar se há import não usado.
01566. [FRONTEND_DADOS] [loading state] verificar se há variável indefinida.
01567. [FRONTEND_DADOS] [loading state] verificar se há duplicação de lógica.
01568. [FRONTEND_DADOS] [loading state] verificar se há comentário desatualizado.
01569. [FRONTEND_DADOS] [loading state] verificar se a regra de negócio está clara.
01570. [FRONTEND_DADOS] [loading state] verificar se há tratamento de erro.
01571. [FRONTEND_DADOS] [loading state] verificar se o erro é amigável para usuário comum.
01572. [FRONTEND_DADOS] [loading state] verificar se erro técnico fica apenas no console ou relatório.
01573. [FRONTEND_DADOS] [loading state] verificar se há validação de entrada.
01574. [FRONTEND_DADOS] [loading state] verificar se há validação de saída.
01575. [FRONTEND_DADOS] [loading state] verificar se há validação de permissão.
01576. [FRONTEND_DADOS] [loading state] verificar se há risco de acesso indevido.
01577. [FRONTEND_DADOS] [loading state] verificar se há risco de dados de outro usuário.
01578. [FRONTEND_DADOS] [loading state] verificar se há risco de SQL injection.
01579. [FRONTEND_DADOS] [loading state] verificar se há risco de XSS.
01580. [FRONTEND_DADOS] [loading state] verificar se há risco de upload inseguro.
01581. [FRONTEND_DADOS] [loading state] verificar se imagens têm fallback correto.
01582. [FRONTEND_DADOS] [loading state] verificar se /core.png aparece como placeholder.
01583. [FRONTEND_DADOS] [loading state] verificar se /logo.png está disponível.
01584. [FRONTEND_DADOS] [loading state] verificar se rotas batem entre front e back.
01585. [FRONTEND_DADOS] [loading state] verificar se payload esperado bate com payload real.
01586. [FRONTEND_DADOS] [loading state] verificar se campos do banco batem com model.
01587. [FRONTEND_DADOS] [loading state] verificar se controller retorna padrão consistente.
01588. [FRONTEND_DADOS] [loading state] verificar se paginação existe e funciona.
01589. [FRONTEND_DADOS] [loading state] verificar se filtros podem ser combinados.
01590. [FRONTEND_DADOS] [loading state] verificar se dados null quebram a tela.
01591. [FRONTEND_DADOS] [loading state] verificar se array vazio tem estado visual.
01592. [FRONTEND_DADOS] [loading state] verificar se loading impede tela quebrada.
01593. [FRONTEND_DADOS] [loading state] verificar se modal fecha corretamente.
01594. [FRONTEND_DADOS] [loading state] verificar se header não sobrepõe conteúdo.
01595. [FRONTEND_DADOS] [loading state] verificar se layout é responsivo.
01596. [FRONTEND_DADOS] [loading state] verificar se contraste é legível.
01597. [FRONTEND_DADOS] [loading state] verificar se texto é humano e não técnico.
01598. [FRONTEND_DADOS] [loading state] verificar se existe teste manual possível.
01599. [FRONTEND_DADOS] [loading state] classificar severidade.
01600. [FRONTEND_DADOS] [loading state] propor correção com risco estimado.

### FRONTEND_DADOS / paginação
01601. [FRONTEND_DADOS] [paginação] identificar arquivo responsável.
01602. [FRONTEND_DADOS] [paginação] identificar dependências diretas.
01603. [FRONTEND_DADOS] [paginação] identificar dependências indiretas.
01604. [FRONTEND_DADOS] [paginação] verificar se há código morto.
01605. [FRONTEND_DADOS] [paginação] verificar se há import não usado.
01606. [FRONTEND_DADOS] [paginação] verificar se há variável indefinida.
01607. [FRONTEND_DADOS] [paginação] verificar se há duplicação de lógica.
01608. [FRONTEND_DADOS] [paginação] verificar se há comentário desatualizado.
01609. [FRONTEND_DADOS] [paginação] verificar se a regra de negócio está clara.
01610. [FRONTEND_DADOS] [paginação] verificar se há tratamento de erro.
01611. [FRONTEND_DADOS] [paginação] verificar se o erro é amigável para usuário comum.
01612. [FRONTEND_DADOS] [paginação] verificar se erro técnico fica apenas no console ou relatório.
01613. [FRONTEND_DADOS] [paginação] verificar se há validação de entrada.
01614. [FRONTEND_DADOS] [paginação] verificar se há validação de saída.
01615. [FRONTEND_DADOS] [paginação] verificar se há validação de permissão.
01616. [FRONTEND_DADOS] [paginação] verificar se há risco de acesso indevido.
01617. [FRONTEND_DADOS] [paginação] verificar se há risco de dados de outro usuário.
01618. [FRONTEND_DADOS] [paginação] verificar se há risco de SQL injection.
01619. [FRONTEND_DADOS] [paginação] verificar se há risco de XSS.
01620. [FRONTEND_DADOS] [paginação] verificar se há risco de upload inseguro.
01621. [FRONTEND_DADOS] [paginação] verificar se imagens têm fallback correto.
01622. [FRONTEND_DADOS] [paginação] verificar se /core.png aparece como placeholder.
01623. [FRONTEND_DADOS] [paginação] verificar se /logo.png está disponível.
01624. [FRONTEND_DADOS] [paginação] verificar se rotas batem entre front e back.
01625. [FRONTEND_DADOS] [paginação] verificar se payload esperado bate com payload real.
01626. [FRONTEND_DADOS] [paginação] verificar se campos do banco batem com model.
01627. [FRONTEND_DADOS] [paginação] verificar se controller retorna padrão consistente.
01628. [FRONTEND_DADOS] [paginação] verificar se paginação existe e funciona.
01629. [FRONTEND_DADOS] [paginação] verificar se filtros podem ser combinados.
01630. [FRONTEND_DADOS] [paginação] verificar se dados null quebram a tela.
01631. [FRONTEND_DADOS] [paginação] verificar se array vazio tem estado visual.
01632. [FRONTEND_DADOS] [paginação] verificar se loading impede tela quebrada.
01633. [FRONTEND_DADOS] [paginação] verificar se modal fecha corretamente.
01634. [FRONTEND_DADOS] [paginação] verificar se header não sobrepõe conteúdo.
01635. [FRONTEND_DADOS] [paginação] verificar se layout é responsivo.
01636. [FRONTEND_DADOS] [paginação] verificar se contraste é legível.
01637. [FRONTEND_DADOS] [paginação] verificar se texto é humano e não técnico.
01638. [FRONTEND_DADOS] [paginação] verificar se existe teste manual possível.
01639. [FRONTEND_DADOS] [paginação] classificar severidade.
01640. [FRONTEND_DADOS] [paginação] propor correção com risco estimado.

### FRONTEND_DADOS / filtros
01641. [FRONTEND_DADOS] [filtros] identificar arquivo responsável.
01642. [FRONTEND_DADOS] [filtros] identificar dependências diretas.
01643. [FRONTEND_DADOS] [filtros] identificar dependências indiretas.
01644. [FRONTEND_DADOS] [filtros] verificar se há código morto.
01645. [FRONTEND_DADOS] [filtros] verificar se há import não usado.
01646. [FRONTEND_DADOS] [filtros] verificar se há variável indefinida.
01647. [FRONTEND_DADOS] [filtros] verificar se há duplicação de lógica.
01648. [FRONTEND_DADOS] [filtros] verificar se há comentário desatualizado.
01649. [FRONTEND_DADOS] [filtros] verificar se a regra de negócio está clara.
01650. [FRONTEND_DADOS] [filtros] verificar se há tratamento de erro.
01651. [FRONTEND_DADOS] [filtros] verificar se o erro é amigável para usuário comum.
01652. [FRONTEND_DADOS] [filtros] verificar se erro técnico fica apenas no console ou relatório.
01653. [FRONTEND_DADOS] [filtros] verificar se há validação de entrada.
01654. [FRONTEND_DADOS] [filtros] verificar se há validação de saída.
01655. [FRONTEND_DADOS] [filtros] verificar se há validação de permissão.
01656. [FRONTEND_DADOS] [filtros] verificar se há risco de acesso indevido.
01657. [FRONTEND_DADOS] [filtros] verificar se há risco de dados de outro usuário.
01658. [FRONTEND_DADOS] [filtros] verificar se há risco de SQL injection.
01659. [FRONTEND_DADOS] [filtros] verificar se há risco de XSS.
01660. [FRONTEND_DADOS] [filtros] verificar se há risco de upload inseguro.
01661. [FRONTEND_DADOS] [filtros] verificar se imagens têm fallback correto.
01662. [FRONTEND_DADOS] [filtros] verificar se /core.png aparece como placeholder.
01663. [FRONTEND_DADOS] [filtros] verificar se /logo.png está disponível.
01664. [FRONTEND_DADOS] [filtros] verificar se rotas batem entre front e back.
01665. [FRONTEND_DADOS] [filtros] verificar se payload esperado bate com payload real.
01666. [FRONTEND_DADOS] [filtros] verificar se campos do banco batem com model.
01667. [FRONTEND_DADOS] [filtros] verificar se controller retorna padrão consistente.
01668. [FRONTEND_DADOS] [filtros] verificar se paginação existe e funciona.
01669. [FRONTEND_DADOS] [filtros] verificar se filtros podem ser combinados.
01670. [FRONTEND_DADOS] [filtros] verificar se dados null quebram a tela.
01671. [FRONTEND_DADOS] [filtros] verificar se array vazio tem estado visual.
01672. [FRONTEND_DADOS] [filtros] verificar se loading impede tela quebrada.
01673. [FRONTEND_DADOS] [filtros] verificar se modal fecha corretamente.
01674. [FRONTEND_DADOS] [filtros] verificar se header não sobrepõe conteúdo.
01675. [FRONTEND_DADOS] [filtros] verificar se layout é responsivo.
01676. [FRONTEND_DADOS] [filtros] verificar se contraste é legível.
01677. [FRONTEND_DADOS] [filtros] verificar se texto é humano e não técnico.
01678. [FRONTEND_DADOS] [filtros] verificar se existe teste manual possível.
01679. [FRONTEND_DADOS] [filtros] classificar severidade.
01680. [FRONTEND_DADOS] [filtros] propor correção com risco estimado.

### FRONTEND_DADOS / upload
01681. [FRONTEND_DADOS] [upload] identificar arquivo responsável.
01682. [FRONTEND_DADOS] [upload] identificar dependências diretas.
01683. [FRONTEND_DADOS] [upload] identificar dependências indiretas.
01684. [FRONTEND_DADOS] [upload] verificar se há código morto.
01685. [FRONTEND_DADOS] [upload] verificar se há import não usado.
01686. [FRONTEND_DADOS] [upload] verificar se há variável indefinida.
01687. [FRONTEND_DADOS] [upload] verificar se há duplicação de lógica.
01688. [FRONTEND_DADOS] [upload] verificar se há comentário desatualizado.
01689. [FRONTEND_DADOS] [upload] verificar se a regra de negócio está clara.
01690. [FRONTEND_DADOS] [upload] verificar se há tratamento de erro.
01691. [FRONTEND_DADOS] [upload] verificar se o erro é amigável para usuário comum.
01692. [FRONTEND_DADOS] [upload] verificar se erro técnico fica apenas no console ou relatório.
01693. [FRONTEND_DADOS] [upload] verificar se há validação de entrada.
01694. [FRONTEND_DADOS] [upload] verificar se há validação de saída.
01695. [FRONTEND_DADOS] [upload] verificar se há validação de permissão.
01696. [FRONTEND_DADOS] [upload] verificar se há risco de acesso indevido.
01697. [FRONTEND_DADOS] [upload] verificar se há risco de dados de outro usuário.
01698. [FRONTEND_DADOS] [upload] verificar se há risco de SQL injection.
01699. [FRONTEND_DADOS] [upload] verificar se há risco de XSS.
01700. [FRONTEND_DADOS] [upload] verificar se há risco de upload inseguro.
01701. [FRONTEND_DADOS] [upload] verificar se imagens têm fallback correto.
01702. [FRONTEND_DADOS] [upload] verificar se /core.png aparece como placeholder.
01703. [FRONTEND_DADOS] [upload] verificar se /logo.png está disponível.
01704. [FRONTEND_DADOS] [upload] verificar se rotas batem entre front e back.
01705. [FRONTEND_DADOS] [upload] verificar se payload esperado bate com payload real.
01706. [FRONTEND_DADOS] [upload] verificar se campos do banco batem com model.
01707. [FRONTEND_DADOS] [upload] verificar se controller retorna padrão consistente.
01708. [FRONTEND_DADOS] [upload] verificar se paginação existe e funciona.
01709. [FRONTEND_DADOS] [upload] verificar se filtros podem ser combinados.
01710. [FRONTEND_DADOS] [upload] verificar se dados null quebram a tela.
01711. [FRONTEND_DADOS] [upload] verificar se array vazio tem estado visual.
01712. [FRONTEND_DADOS] [upload] verificar se loading impede tela quebrada.
01713. [FRONTEND_DADOS] [upload] verificar se modal fecha corretamente.
01714. [FRONTEND_DADOS] [upload] verificar se header não sobrepõe conteúdo.
01715. [FRONTEND_DADOS] [upload] verificar se layout é responsivo.
01716. [FRONTEND_DADOS] [upload] verificar se contraste é legível.
01717. [FRONTEND_DADOS] [upload] verificar se texto é humano e não técnico.
01718. [FRONTEND_DADOS] [upload] verificar se existe teste manual possível.
01719. [FRONTEND_DADOS] [upload] classificar severidade.
01720. [FRONTEND_DADOS] [upload] propor correção com risco estimado.

### FRONTEND_DADOS / imagens
01721. [FRONTEND_DADOS] [imagens] identificar arquivo responsável.
01722. [FRONTEND_DADOS] [imagens] identificar dependências diretas.
01723. [FRONTEND_DADOS] [imagens] identificar dependências indiretas.
01724. [FRONTEND_DADOS] [imagens] verificar se há código morto.
01725. [FRONTEND_DADOS] [imagens] verificar se há import não usado.
01726. [FRONTEND_DADOS] [imagens] verificar se há variável indefinida.
01727. [FRONTEND_DADOS] [imagens] verificar se há duplicação de lógica.
01728. [FRONTEND_DADOS] [imagens] verificar se há comentário desatualizado.
01729. [FRONTEND_DADOS] [imagens] verificar se a regra de negócio está clara.
01730. [FRONTEND_DADOS] [imagens] verificar se há tratamento de erro.
01731. [FRONTEND_DADOS] [imagens] verificar se o erro é amigável para usuário comum.
01732. [FRONTEND_DADOS] [imagens] verificar se erro técnico fica apenas no console ou relatório.
01733. [FRONTEND_DADOS] [imagens] verificar se há validação de entrada.
01734. [FRONTEND_DADOS] [imagens] verificar se há validação de saída.
01735. [FRONTEND_DADOS] [imagens] verificar se há validação de permissão.
01736. [FRONTEND_DADOS] [imagens] verificar se há risco de acesso indevido.
01737. [FRONTEND_DADOS] [imagens] verificar se há risco de dados de outro usuário.
01738. [FRONTEND_DADOS] [imagens] verificar se há risco de SQL injection.
01739. [FRONTEND_DADOS] [imagens] verificar se há risco de XSS.
01740. [FRONTEND_DADOS] [imagens] verificar se há risco de upload inseguro.
01741. [FRONTEND_DADOS] [imagens] verificar se imagens têm fallback correto.
01742. [FRONTEND_DADOS] [imagens] verificar se /core.png aparece como placeholder.
01743. [FRONTEND_DADOS] [imagens] verificar se /logo.png está disponível.
01744. [FRONTEND_DADOS] [imagens] verificar se rotas batem entre front e back.
01745. [FRONTEND_DADOS] [imagens] verificar se payload esperado bate com payload real.
01746. [FRONTEND_DADOS] [imagens] verificar se campos do banco batem com model.
01747. [FRONTEND_DADOS] [imagens] verificar se controller retorna padrão consistente.
01748. [FRONTEND_DADOS] [imagens] verificar se paginação existe e funciona.
01749. [FRONTEND_DADOS] [imagens] verificar se filtros podem ser combinados.
01750. [FRONTEND_DADOS] [imagens] verificar se dados null quebram a tela.
01751. [FRONTEND_DADOS] [imagens] verificar se array vazio tem estado visual.
01752. [FRONTEND_DADOS] [imagens] verificar se loading impede tela quebrada.
01753. [FRONTEND_DADOS] [imagens] verificar se modal fecha corretamente.
01754. [FRONTEND_DADOS] [imagens] verificar se header não sobrepõe conteúdo.
01755. [FRONTEND_DADOS] [imagens] verificar se layout é responsivo.
01756. [FRONTEND_DADOS] [imagens] verificar se contraste é legível.
01757. [FRONTEND_DADOS] [imagens] verificar se texto é humano e não técnico.
01758. [FRONTEND_DADOS] [imagens] verificar se existe teste manual possível.
01759. [FRONTEND_DADOS] [imagens] classificar severidade.
01760. [FRONTEND_DADOS] [imagens] propor correção com risco estimado.

---

## 6. Revisão detalhada — BACKEND_ESTRUTURA

### BACKEND_ESTRUTURA / server
01761. [BACKEND_ESTRUTURA] [server] identificar arquivo responsável.
01762. [BACKEND_ESTRUTURA] [server] identificar dependências diretas.
01763. [BACKEND_ESTRUTURA] [server] identificar dependências indiretas.
01764. [BACKEND_ESTRUTURA] [server] verificar se há código morto.
01765. [BACKEND_ESTRUTURA] [server] verificar se há import não usado.
01766. [BACKEND_ESTRUTURA] [server] verificar se há variável indefinida.
01767. [BACKEND_ESTRUTURA] [server] verificar se há duplicação de lógica.
01768. [BACKEND_ESTRUTURA] [server] verificar se há comentário desatualizado.
01769. [BACKEND_ESTRUTURA] [server] verificar se a regra de negócio está clara.
01770. [BACKEND_ESTRUTURA] [server] verificar se há tratamento de erro.
01771. [BACKEND_ESTRUTURA] [server] verificar se o erro é amigável para usuário comum.
01772. [BACKEND_ESTRUTURA] [server] verificar se erro técnico fica apenas no console ou relatório.
01773. [BACKEND_ESTRUTURA] [server] verificar se há validação de entrada.
01774. [BACKEND_ESTRUTURA] [server] verificar se há validação de saída.
01775. [BACKEND_ESTRUTURA] [server] verificar se há validação de permissão.
01776. [BACKEND_ESTRUTURA] [server] verificar se há risco de acesso indevido.
01777. [BACKEND_ESTRUTURA] [server] verificar se há risco de dados de outro usuário.
01778. [BACKEND_ESTRUTURA] [server] verificar se há risco de SQL injection.
01779. [BACKEND_ESTRUTURA] [server] verificar se há risco de XSS.
01780. [BACKEND_ESTRUTURA] [server] verificar se há risco de upload inseguro.
01781. [BACKEND_ESTRUTURA] [server] verificar se imagens têm fallback correto.
01782. [BACKEND_ESTRUTURA] [server] verificar se /core.png aparece como placeholder.
01783. [BACKEND_ESTRUTURA] [server] verificar se /logo.png está disponível.
01784. [BACKEND_ESTRUTURA] [server] verificar se rotas batem entre front e back.
01785. [BACKEND_ESTRUTURA] [server] verificar se payload esperado bate com payload real.
01786. [BACKEND_ESTRUTURA] [server] verificar se campos do banco batem com model.
01787. [BACKEND_ESTRUTURA] [server] verificar se controller retorna padrão consistente.
01788. [BACKEND_ESTRUTURA] [server] verificar se paginação existe e funciona.
01789. [BACKEND_ESTRUTURA] [server] verificar se filtros podem ser combinados.
01790. [BACKEND_ESTRUTURA] [server] verificar se dados null quebram a tela.
01791. [BACKEND_ESTRUTURA] [server] verificar se array vazio tem estado visual.
01792. [BACKEND_ESTRUTURA] [server] verificar se loading impede tela quebrada.
01793. [BACKEND_ESTRUTURA] [server] verificar se modal fecha corretamente.
01794. [BACKEND_ESTRUTURA] [server] verificar se header não sobrepõe conteúdo.
01795. [BACKEND_ESTRUTURA] [server] verificar se layout é responsivo.
01796. [BACKEND_ESTRUTURA] [server] verificar se contraste é legível.
01797. [BACKEND_ESTRUTURA] [server] verificar se texto é humano e não técnico.
01798. [BACKEND_ESTRUTURA] [server] verificar se existe teste manual possível.
01799. [BACKEND_ESTRUTURA] [server] classificar severidade.
01800. [BACKEND_ESTRUTURA] [server] propor correção com risco estimado.

### BACKEND_ESTRUTURA / app
01801. [BACKEND_ESTRUTURA] [app] identificar arquivo responsável.
01802. [BACKEND_ESTRUTURA] [app] identificar dependências diretas.
01803. [BACKEND_ESTRUTURA] [app] identificar dependências indiretas.
01804. [BACKEND_ESTRUTURA] [app] verificar se há código morto.
01805. [BACKEND_ESTRUTURA] [app] verificar se há import não usado.
01806. [BACKEND_ESTRUTURA] [app] verificar se há variável indefinida.
01807. [BACKEND_ESTRUTURA] [app] verificar se há duplicação de lógica.
01808. [BACKEND_ESTRUTURA] [app] verificar se há comentário desatualizado.
01809. [BACKEND_ESTRUTURA] [app] verificar se a regra de negócio está clara.
01810. [BACKEND_ESTRUTURA] [app] verificar se há tratamento de erro.
01811. [BACKEND_ESTRUTURA] [app] verificar se o erro é amigável para usuário comum.
01812. [BACKEND_ESTRUTURA] [app] verificar se erro técnico fica apenas no console ou relatório.
01813. [BACKEND_ESTRUTURA] [app] verificar se há validação de entrada.
01814. [BACKEND_ESTRUTURA] [app] verificar se há validação de saída.
01815. [BACKEND_ESTRUTURA] [app] verificar se há validação de permissão.
01816. [BACKEND_ESTRUTURA] [app] verificar se há risco de acesso indevido.
01817. [BACKEND_ESTRUTURA] [app] verificar se há risco de dados de outro usuário.
01818. [BACKEND_ESTRUTURA] [app] verificar se há risco de SQL injection.
01819. [BACKEND_ESTRUTURA] [app] verificar se há risco de XSS.
01820. [BACKEND_ESTRUTURA] [app] verificar se há risco de upload inseguro.
01821. [BACKEND_ESTRUTURA] [app] verificar se imagens têm fallback correto.
01822. [BACKEND_ESTRUTURA] [app] verificar se /core.png aparece como placeholder.
01823. [BACKEND_ESTRUTURA] [app] verificar se /logo.png está disponível.
01824. [BACKEND_ESTRUTURA] [app] verificar se rotas batem entre front e back.
01825. [BACKEND_ESTRUTURA] [app] verificar se payload esperado bate com payload real.
01826. [BACKEND_ESTRUTURA] [app] verificar se campos do banco batem com model.
01827. [BACKEND_ESTRUTURA] [app] verificar se controller retorna padrão consistente.
01828. [BACKEND_ESTRUTURA] [app] verificar se paginação existe e funciona.
01829. [BACKEND_ESTRUTURA] [app] verificar se filtros podem ser combinados.
01830. [BACKEND_ESTRUTURA] [app] verificar se dados null quebram a tela.
01831. [BACKEND_ESTRUTURA] [app] verificar se array vazio tem estado visual.
01832. [BACKEND_ESTRUTURA] [app] verificar se loading impede tela quebrada.
01833. [BACKEND_ESTRUTURA] [app] verificar se modal fecha corretamente.
01834. [BACKEND_ESTRUTURA] [app] verificar se header não sobrepõe conteúdo.
01835. [BACKEND_ESTRUTURA] [app] verificar se layout é responsivo.
01836. [BACKEND_ESTRUTURA] [app] verificar se contraste é legível.
01837. [BACKEND_ESTRUTURA] [app] verificar se texto é humano e não técnico.
01838. [BACKEND_ESTRUTURA] [app] verificar se existe teste manual possível.
01839. [BACKEND_ESTRUTURA] [app] classificar severidade.
01840. [BACKEND_ESTRUTURA] [app] propor correção com risco estimado.

### BACKEND_ESTRUTURA / routes
01841. [BACKEND_ESTRUTURA] [routes] identificar arquivo responsável.
01842. [BACKEND_ESTRUTURA] [routes] identificar dependências diretas.
01843. [BACKEND_ESTRUTURA] [routes] identificar dependências indiretas.
01844. [BACKEND_ESTRUTURA] [routes] verificar se há código morto.
01845. [BACKEND_ESTRUTURA] [routes] verificar se há import não usado.
01846. [BACKEND_ESTRUTURA] [routes] verificar se há variável indefinida.
01847. [BACKEND_ESTRUTURA] [routes] verificar se há duplicação de lógica.
01848. [BACKEND_ESTRUTURA] [routes] verificar se há comentário desatualizado.
01849. [BACKEND_ESTRUTURA] [routes] verificar se a regra de negócio está clara.
01850. [BACKEND_ESTRUTURA] [routes] verificar se há tratamento de erro.
01851. [BACKEND_ESTRUTURA] [routes] verificar se o erro é amigável para usuário comum.
01852. [BACKEND_ESTRUTURA] [routes] verificar se erro técnico fica apenas no console ou relatório.
01853. [BACKEND_ESTRUTURA] [routes] verificar se há validação de entrada.
01854. [BACKEND_ESTRUTURA] [routes] verificar se há validação de saída.
01855. [BACKEND_ESTRUTURA] [routes] verificar se há validação de permissão.
01856. [BACKEND_ESTRUTURA] [routes] verificar se há risco de acesso indevido.
01857. [BACKEND_ESTRUTURA] [routes] verificar se há risco de dados de outro usuário.
01858. [BACKEND_ESTRUTURA] [routes] verificar se há risco de SQL injection.
01859. [BACKEND_ESTRUTURA] [routes] verificar se há risco de XSS.
01860. [BACKEND_ESTRUTURA] [routes] verificar se há risco de upload inseguro.
01861. [BACKEND_ESTRUTURA] [routes] verificar se imagens têm fallback correto.
01862. [BACKEND_ESTRUTURA] [routes] verificar se /core.png aparece como placeholder.
01863. [BACKEND_ESTRUTURA] [routes] verificar se /logo.png está disponível.
01864. [BACKEND_ESTRUTURA] [routes] verificar se rotas batem entre front e back.
01865. [BACKEND_ESTRUTURA] [routes] verificar se payload esperado bate com payload real.
01866. [BACKEND_ESTRUTURA] [routes] verificar se campos do banco batem com model.
01867. [BACKEND_ESTRUTURA] [routes] verificar se controller retorna padrão consistente.
01868. [BACKEND_ESTRUTURA] [routes] verificar se paginação existe e funciona.
01869. [BACKEND_ESTRUTURA] [routes] verificar se filtros podem ser combinados.
01870. [BACKEND_ESTRUTURA] [routes] verificar se dados null quebram a tela.
01871. [BACKEND_ESTRUTURA] [routes] verificar se array vazio tem estado visual.
01872. [BACKEND_ESTRUTURA] [routes] verificar se loading impede tela quebrada.
01873. [BACKEND_ESTRUTURA] [routes] verificar se modal fecha corretamente.
01874. [BACKEND_ESTRUTURA] [routes] verificar se header não sobrepõe conteúdo.
01875. [BACKEND_ESTRUTURA] [routes] verificar se layout é responsivo.
01876. [BACKEND_ESTRUTURA] [routes] verificar se contraste é legível.
01877. [BACKEND_ESTRUTURA] [routes] verificar se texto é humano e não técnico.
01878. [BACKEND_ESTRUTURA] [routes] verificar se existe teste manual possível.
01879. [BACKEND_ESTRUTURA] [routes] classificar severidade.
01880. [BACKEND_ESTRUTURA] [routes] propor correção com risco estimado.

### BACKEND_ESTRUTURA / controllers
01881. [BACKEND_ESTRUTURA] [controllers] identificar arquivo responsável.
01882. [BACKEND_ESTRUTURA] [controllers] identificar dependências diretas.
01883. [BACKEND_ESTRUTURA] [controllers] identificar dependências indiretas.
01884. [BACKEND_ESTRUTURA] [controllers] verificar se há código morto.
01885. [BACKEND_ESTRUTURA] [controllers] verificar se há import não usado.
01886. [BACKEND_ESTRUTURA] [controllers] verificar se há variável indefinida.
01887. [BACKEND_ESTRUTURA] [controllers] verificar se há duplicação de lógica.
01888. [BACKEND_ESTRUTURA] [controllers] verificar se há comentário desatualizado.
01889. [BACKEND_ESTRUTURA] [controllers] verificar se a regra de negócio está clara.
01890. [BACKEND_ESTRUTURA] [controllers] verificar se há tratamento de erro.
01891. [BACKEND_ESTRUTURA] [controllers] verificar se o erro é amigável para usuário comum.
01892. [BACKEND_ESTRUTURA] [controllers] verificar se erro técnico fica apenas no console ou relatório.
01893. [BACKEND_ESTRUTURA] [controllers] verificar se há validação de entrada.
01894. [BACKEND_ESTRUTURA] [controllers] verificar se há validação de saída.
01895. [BACKEND_ESTRUTURA] [controllers] verificar se há validação de permissão.
01896. [BACKEND_ESTRUTURA] [controllers] verificar se há risco de acesso indevido.
01897. [BACKEND_ESTRUTURA] [controllers] verificar se há risco de dados de outro usuário.
01898. [BACKEND_ESTRUTURA] [controllers] verificar se há risco de SQL injection.
01899. [BACKEND_ESTRUTURA] [controllers] verificar se há risco de XSS.
01900. [BACKEND_ESTRUTURA] [controllers] verificar se há risco de upload inseguro.
01901. [BACKEND_ESTRUTURA] [controllers] verificar se imagens têm fallback correto.
01902. [BACKEND_ESTRUTURA] [controllers] verificar se /core.png aparece como placeholder.
01903. [BACKEND_ESTRUTURA] [controllers] verificar se /logo.png está disponível.
01904. [BACKEND_ESTRUTURA] [controllers] verificar se rotas batem entre front e back.
01905. [BACKEND_ESTRUTURA] [controllers] verificar se payload esperado bate com payload real.
01906. [BACKEND_ESTRUTURA] [controllers] verificar se campos do banco batem com model.
01907. [BACKEND_ESTRUTURA] [controllers] verificar se controller retorna padrão consistente.
01908. [BACKEND_ESTRUTURA] [controllers] verificar se paginação existe e funciona.
01909. [BACKEND_ESTRUTURA] [controllers] verificar se filtros podem ser combinados.
01910. [BACKEND_ESTRUTURA] [controllers] verificar se dados null quebram a tela.
01911. [BACKEND_ESTRUTURA] [controllers] verificar se array vazio tem estado visual.
01912. [BACKEND_ESTRUTURA] [controllers] verificar se loading impede tela quebrada.
01913. [BACKEND_ESTRUTURA] [controllers] verificar se modal fecha corretamente.
01914. [BACKEND_ESTRUTURA] [controllers] verificar se header não sobrepõe conteúdo.
01915. [BACKEND_ESTRUTURA] [controllers] verificar se layout é responsivo.
01916. [BACKEND_ESTRUTURA] [controllers] verificar se contraste é legível.
01917. [BACKEND_ESTRUTURA] [controllers] verificar se texto é humano e não técnico.
01918. [BACKEND_ESTRUTURA] [controllers] verificar se existe teste manual possível.
01919. [BACKEND_ESTRUTURA] [controllers] classificar severidade.
01920. [BACKEND_ESTRUTURA] [controllers] propor correção com risco estimado.

### BACKEND_ESTRUTURA / models
01921. [BACKEND_ESTRUTURA] [models] identificar arquivo responsável.
01922. [BACKEND_ESTRUTURA] [models] identificar dependências diretas.
01923. [BACKEND_ESTRUTURA] [models] identificar dependências indiretas.
01924. [BACKEND_ESTRUTURA] [models] verificar se há código morto.
01925. [BACKEND_ESTRUTURA] [models] verificar se há import não usado.
01926. [BACKEND_ESTRUTURA] [models] verificar se há variável indefinida.
01927. [BACKEND_ESTRUTURA] [models] verificar se há duplicação de lógica.
01928. [BACKEND_ESTRUTURA] [models] verificar se há comentário desatualizado.
01929. [BACKEND_ESTRUTURA] [models] verificar se a regra de negócio está clara.
01930. [BACKEND_ESTRUTURA] [models] verificar se há tratamento de erro.
01931. [BACKEND_ESTRUTURA] [models] verificar se o erro é amigável para usuário comum.
01932. [BACKEND_ESTRUTURA] [models] verificar se erro técnico fica apenas no console ou relatório.
01933. [BACKEND_ESTRUTURA] [models] verificar se há validação de entrada.
01934. [BACKEND_ESTRUTURA] [models] verificar se há validação de saída.
01935. [BACKEND_ESTRUTURA] [models] verificar se há validação de permissão.
01936. [BACKEND_ESTRUTURA] [models] verificar se há risco de acesso indevido.
01937. [BACKEND_ESTRUTURA] [models] verificar se há risco de dados de outro usuário.
01938. [BACKEND_ESTRUTURA] [models] verificar se há risco de SQL injection.
01939. [BACKEND_ESTRUTURA] [models] verificar se há risco de XSS.
01940. [BACKEND_ESTRUTURA] [models] verificar se há risco de upload inseguro.
01941. [BACKEND_ESTRUTURA] [models] verificar se imagens têm fallback correto.
01942. [BACKEND_ESTRUTURA] [models] verificar se /core.png aparece como placeholder.
01943. [BACKEND_ESTRUTURA] [models] verificar se /logo.png está disponível.
01944. [BACKEND_ESTRUTURA] [models] verificar se rotas batem entre front e back.
01945. [BACKEND_ESTRUTURA] [models] verificar se payload esperado bate com payload real.
01946. [BACKEND_ESTRUTURA] [models] verificar se campos do banco batem com model.
01947. [BACKEND_ESTRUTURA] [models] verificar se controller retorna padrão consistente.
01948. [BACKEND_ESTRUTURA] [models] verificar se paginação existe e funciona.
01949. [BACKEND_ESTRUTURA] [models] verificar se filtros podem ser combinados.
01950. [BACKEND_ESTRUTURA] [models] verificar se dados null quebram a tela.
01951. [BACKEND_ESTRUTURA] [models] verificar se array vazio tem estado visual.
01952. [BACKEND_ESTRUTURA] [models] verificar se loading impede tela quebrada.
01953. [BACKEND_ESTRUTURA] [models] verificar se modal fecha corretamente.
01954. [BACKEND_ESTRUTURA] [models] verificar se header não sobrepõe conteúdo.
01955. [BACKEND_ESTRUTURA] [models] verificar se layout é responsivo.
01956. [BACKEND_ESTRUTURA] [models] verificar se contraste é legível.
01957. [BACKEND_ESTRUTURA] [models] verificar se texto é humano e não técnico.
01958. [BACKEND_ESTRUTURA] [models] verificar se existe teste manual possível.
01959. [BACKEND_ESTRUTURA] [models] classificar severidade.
01960. [BACKEND_ESTRUTURA] [models] propor correção com risco estimado.

### BACKEND_ESTRUTURA / middlewares
01961. [BACKEND_ESTRUTURA] [middlewares] identificar arquivo responsável.
01962. [BACKEND_ESTRUTURA] [middlewares] identificar dependências diretas.
01963. [BACKEND_ESTRUTURA] [middlewares] identificar dependências indiretas.
01964. [BACKEND_ESTRUTURA] [middlewares] verificar se há código morto.
01965. [BACKEND_ESTRUTURA] [middlewares] verificar se há import não usado.
01966. [BACKEND_ESTRUTURA] [middlewares] verificar se há variável indefinida.
01967. [BACKEND_ESTRUTURA] [middlewares] verificar se há duplicação de lógica.
01968. [BACKEND_ESTRUTURA] [middlewares] verificar se há comentário desatualizado.
01969. [BACKEND_ESTRUTURA] [middlewares] verificar se a regra de negócio está clara.
01970. [BACKEND_ESTRUTURA] [middlewares] verificar se há tratamento de erro.
01971. [BACKEND_ESTRUTURA] [middlewares] verificar se o erro é amigável para usuário comum.
01972. [BACKEND_ESTRUTURA] [middlewares] verificar se erro técnico fica apenas no console ou relatório.
01973. [BACKEND_ESTRUTURA] [middlewares] verificar se há validação de entrada.
01974. [BACKEND_ESTRUTURA] [middlewares] verificar se há validação de saída.
01975. [BACKEND_ESTRUTURA] [middlewares] verificar se há validação de permissão.
01976. [BACKEND_ESTRUTURA] [middlewares] verificar se há risco de acesso indevido.
01977. [BACKEND_ESTRUTURA] [middlewares] verificar se há risco de dados de outro usuário.
01978. [BACKEND_ESTRUTURA] [middlewares] verificar se há risco de SQL injection.
01979. [BACKEND_ESTRUTURA] [middlewares] verificar se há risco de XSS.
01980. [BACKEND_ESTRUTURA] [middlewares] verificar se há risco de upload inseguro.
01981. [BACKEND_ESTRUTURA] [middlewares] verificar se imagens têm fallback correto.
01982. [BACKEND_ESTRUTURA] [middlewares] verificar se /core.png aparece como placeholder.
01983. [BACKEND_ESTRUTURA] [middlewares] verificar se /logo.png está disponível.
01984. [BACKEND_ESTRUTURA] [middlewares] verificar se rotas batem entre front e back.
01985. [BACKEND_ESTRUTURA] [middlewares] verificar se payload esperado bate com payload real.
01986. [BACKEND_ESTRUTURA] [middlewares] verificar se campos do banco batem com model.
01987. [BACKEND_ESTRUTURA] [middlewares] verificar se controller retorna padrão consistente.
01988. [BACKEND_ESTRUTURA] [middlewares] verificar se paginação existe e funciona.
01989. [BACKEND_ESTRUTURA] [middlewares] verificar se filtros podem ser combinados.
01990. [BACKEND_ESTRUTURA] [middlewares] verificar se dados null quebram a tela.
01991. [BACKEND_ESTRUTURA] [middlewares] verificar se array vazio tem estado visual.
01992. [BACKEND_ESTRUTURA] [middlewares] verificar se loading impede tela quebrada.
01993. [BACKEND_ESTRUTURA] [middlewares] verificar se modal fecha corretamente.
01994. [BACKEND_ESTRUTURA] [middlewares] verificar se header não sobrepõe conteúdo.
01995. [BACKEND_ESTRUTURA] [middlewares] verificar se layout é responsivo.
01996. [BACKEND_ESTRUTURA] [middlewares] verificar se contraste é legível.
01997. [BACKEND_ESTRUTURA] [middlewares] verificar se texto é humano e não técnico.
01998. [BACKEND_ESTRUTURA] [middlewares] verificar se existe teste manual possível.
01999. [BACKEND_ESTRUTURA] [middlewares] classificar severidade.
02000. [BACKEND_ESTRUTURA] [middlewares] propor correção com risco estimado.

### BACKEND_ESTRUTURA / config
02001. [BACKEND_ESTRUTURA] [config] identificar arquivo responsável.
02002. [BACKEND_ESTRUTURA] [config] identificar dependências diretas.
02003. [BACKEND_ESTRUTURA] [config] identificar dependências indiretas.
02004. [BACKEND_ESTRUTURA] [config] verificar se há código morto.
02005. [BACKEND_ESTRUTURA] [config] verificar se há import não usado.
02006. [BACKEND_ESTRUTURA] [config] verificar se há variável indefinida.
02007. [BACKEND_ESTRUTURA] [config] verificar se há duplicação de lógica.
02008. [BACKEND_ESTRUTURA] [config] verificar se há comentário desatualizado.
02009. [BACKEND_ESTRUTURA] [config] verificar se a regra de negócio está clara.
02010. [BACKEND_ESTRUTURA] [config] verificar se há tratamento de erro.
02011. [BACKEND_ESTRUTURA] [config] verificar se o erro é amigável para usuário comum.
02012. [BACKEND_ESTRUTURA] [config] verificar se erro técnico fica apenas no console ou relatório.
02013. [BACKEND_ESTRUTURA] [config] verificar se há validação de entrada.
02014. [BACKEND_ESTRUTURA] [config] verificar se há validação de saída.
02015. [BACKEND_ESTRUTURA] [config] verificar se há validação de permissão.
02016. [BACKEND_ESTRUTURA] [config] verificar se há risco de acesso indevido.
02017. [BACKEND_ESTRUTURA] [config] verificar se há risco de dados de outro usuário.
02018. [BACKEND_ESTRUTURA] [config] verificar se há risco de SQL injection.
02019. [BACKEND_ESTRUTURA] [config] verificar se há risco de XSS.
02020. [BACKEND_ESTRUTURA] [config] verificar se há risco de upload inseguro.
02021. [BACKEND_ESTRUTURA] [config] verificar se imagens têm fallback correto.
02022. [BACKEND_ESTRUTURA] [config] verificar se /core.png aparece como placeholder.
02023. [BACKEND_ESTRUTURA] [config] verificar se /logo.png está disponível.
02024. [BACKEND_ESTRUTURA] [config] verificar se rotas batem entre front e back.
02025. [BACKEND_ESTRUTURA] [config] verificar se payload esperado bate com payload real.
02026. [BACKEND_ESTRUTURA] [config] verificar se campos do banco batem com model.
02027. [BACKEND_ESTRUTURA] [config] verificar se controller retorna padrão consistente.
02028. [BACKEND_ESTRUTURA] [config] verificar se paginação existe e funciona.
02029. [BACKEND_ESTRUTURA] [config] verificar se filtros podem ser combinados.
02030. [BACKEND_ESTRUTURA] [config] verificar se dados null quebram a tela.
02031. [BACKEND_ESTRUTURA] [config] verificar se array vazio tem estado visual.
02032. [BACKEND_ESTRUTURA] [config] verificar se loading impede tela quebrada.
02033. [BACKEND_ESTRUTURA] [config] verificar se modal fecha corretamente.
02034. [BACKEND_ESTRUTURA] [config] verificar se header não sobrepõe conteúdo.
02035. [BACKEND_ESTRUTURA] [config] verificar se layout é responsivo.
02036. [BACKEND_ESTRUTURA] [config] verificar se contraste é legível.
02037. [BACKEND_ESTRUTURA] [config] verificar se texto é humano e não técnico.
02038. [BACKEND_ESTRUTURA] [config] verificar se existe teste manual possível.
02039. [BACKEND_ESTRUTURA] [config] classificar severidade.
02040. [BACKEND_ESTRUTURA] [config] propor correção com risco estimado.

### BACKEND_ESTRUTURA / database
02041. [BACKEND_ESTRUTURA] [database] identificar arquivo responsável.
02042. [BACKEND_ESTRUTURA] [database] identificar dependências diretas.
02043. [BACKEND_ESTRUTURA] [database] identificar dependências indiretas.
02044. [BACKEND_ESTRUTURA] [database] verificar se há código morto.
02045. [BACKEND_ESTRUTURA] [database] verificar se há import não usado.
02046. [BACKEND_ESTRUTURA] [database] verificar se há variável indefinida.
02047. [BACKEND_ESTRUTURA] [database] verificar se há duplicação de lógica.
02048. [BACKEND_ESTRUTURA] [database] verificar se há comentário desatualizado.
02049. [BACKEND_ESTRUTURA] [database] verificar se a regra de negócio está clara.
02050. [BACKEND_ESTRUTURA] [database] verificar se há tratamento de erro.
02051. [BACKEND_ESTRUTURA] [database] verificar se o erro é amigável para usuário comum.
02052. [BACKEND_ESTRUTURA] [database] verificar se erro técnico fica apenas no console ou relatório.
02053. [BACKEND_ESTRUTURA] [database] verificar se há validação de entrada.
02054. [BACKEND_ESTRUTURA] [database] verificar se há validação de saída.
02055. [BACKEND_ESTRUTURA] [database] verificar se há validação de permissão.
02056. [BACKEND_ESTRUTURA] [database] verificar se há risco de acesso indevido.
02057. [BACKEND_ESTRUTURA] [database] verificar se há risco de dados de outro usuário.
02058. [BACKEND_ESTRUTURA] [database] verificar se há risco de SQL injection.
02059. [BACKEND_ESTRUTURA] [database] verificar se há risco de XSS.
02060. [BACKEND_ESTRUTURA] [database] verificar se há risco de upload inseguro.
02061. [BACKEND_ESTRUTURA] [database] verificar se imagens têm fallback correto.
02062. [BACKEND_ESTRUTURA] [database] verificar se /core.png aparece como placeholder.
02063. [BACKEND_ESTRUTURA] [database] verificar se /logo.png está disponível.
02064. [BACKEND_ESTRUTURA] [database] verificar se rotas batem entre front e back.
02065. [BACKEND_ESTRUTURA] [database] verificar se payload esperado bate com payload real.
02066. [BACKEND_ESTRUTURA] [database] verificar se campos do banco batem com model.
02067. [BACKEND_ESTRUTURA] [database] verificar se controller retorna padrão consistente.
02068. [BACKEND_ESTRUTURA] [database] verificar se paginação existe e funciona.
02069. [BACKEND_ESTRUTURA] [database] verificar se filtros podem ser combinados.
02070. [BACKEND_ESTRUTURA] [database] verificar se dados null quebram a tela.
02071. [BACKEND_ESTRUTURA] [database] verificar se array vazio tem estado visual.
02072. [BACKEND_ESTRUTURA] [database] verificar se loading impede tela quebrada.
02073. [BACKEND_ESTRUTURA] [database] verificar se modal fecha corretamente.
02074. [BACKEND_ESTRUTURA] [database] verificar se header não sobrepõe conteúdo.
02075. [BACKEND_ESTRUTURA] [database] verificar se layout é responsivo.
02076. [BACKEND_ESTRUTURA] [database] verificar se contraste é legível.
02077. [BACKEND_ESTRUTURA] [database] verificar se texto é humano e não técnico.
02078. [BACKEND_ESTRUTURA] [database] verificar se existe teste manual possível.
02079. [BACKEND_ESTRUTURA] [database] classificar severidade.
02080. [BACKEND_ESTRUTURA] [database] propor correção com risco estimado.

### BACKEND_ESTRUTURA / uploads
02081. [BACKEND_ESTRUTURA] [uploads] identificar arquivo responsável.
02082. [BACKEND_ESTRUTURA] [uploads] identificar dependências diretas.
02083. [BACKEND_ESTRUTURA] [uploads] identificar dependências indiretas.
02084. [BACKEND_ESTRUTURA] [uploads] verificar se há código morto.
02085. [BACKEND_ESTRUTURA] [uploads] verificar se há import não usado.
02086. [BACKEND_ESTRUTURA] [uploads] verificar se há variável indefinida.
02087. [BACKEND_ESTRUTURA] [uploads] verificar se há duplicação de lógica.
02088. [BACKEND_ESTRUTURA] [uploads] verificar se há comentário desatualizado.
02089. [BACKEND_ESTRUTURA] [uploads] verificar se a regra de negócio está clara.
02090. [BACKEND_ESTRUTURA] [uploads] verificar se há tratamento de erro.
02091. [BACKEND_ESTRUTURA] [uploads] verificar se o erro é amigável para usuário comum.
02092. [BACKEND_ESTRUTURA] [uploads] verificar se erro técnico fica apenas no console ou relatório.
02093. [BACKEND_ESTRUTURA] [uploads] verificar se há validação de entrada.
02094. [BACKEND_ESTRUTURA] [uploads] verificar se há validação de saída.
02095. [BACKEND_ESTRUTURA] [uploads] verificar se há validação de permissão.
02096. [BACKEND_ESTRUTURA] [uploads] verificar se há risco de acesso indevido.
02097. [BACKEND_ESTRUTURA] [uploads] verificar se há risco de dados de outro usuário.
02098. [BACKEND_ESTRUTURA] [uploads] verificar se há risco de SQL injection.
02099. [BACKEND_ESTRUTURA] [uploads] verificar se há risco de XSS.
02100. [BACKEND_ESTRUTURA] [uploads] verificar se há risco de upload inseguro.
02101. [BACKEND_ESTRUTURA] [uploads] verificar se imagens têm fallback correto.
02102. [BACKEND_ESTRUTURA] [uploads] verificar se /core.png aparece como placeholder.
02103. [BACKEND_ESTRUTURA] [uploads] verificar se /logo.png está disponível.
02104. [BACKEND_ESTRUTURA] [uploads] verificar se rotas batem entre front e back.
02105. [BACKEND_ESTRUTURA] [uploads] verificar se payload esperado bate com payload real.
02106. [BACKEND_ESTRUTURA] [uploads] verificar se campos do banco batem com model.
02107. [BACKEND_ESTRUTURA] [uploads] verificar se controller retorna padrão consistente.
02108. [BACKEND_ESTRUTURA] [uploads] verificar se paginação existe e funciona.
02109. [BACKEND_ESTRUTURA] [uploads] verificar se filtros podem ser combinados.
02110. [BACKEND_ESTRUTURA] [uploads] verificar se dados null quebram a tela.
02111. [BACKEND_ESTRUTURA] [uploads] verificar se array vazio tem estado visual.
02112. [BACKEND_ESTRUTURA] [uploads] verificar se loading impede tela quebrada.
02113. [BACKEND_ESTRUTURA] [uploads] verificar se modal fecha corretamente.
02114. [BACKEND_ESTRUTURA] [uploads] verificar se header não sobrepõe conteúdo.
02115. [BACKEND_ESTRUTURA] [uploads] verificar se layout é responsivo.
02116. [BACKEND_ESTRUTURA] [uploads] verificar se contraste é legível.
02117. [BACKEND_ESTRUTURA] [uploads] verificar se texto é humano e não técnico.
02118. [BACKEND_ESTRUTURA] [uploads] verificar se existe teste manual possível.
02119. [BACKEND_ESTRUTURA] [uploads] classificar severidade.
02120. [BACKEND_ESTRUTURA] [uploads] propor correção com risco estimado.

### BACKEND_ESTRUTURA / utils
02121. [BACKEND_ESTRUTURA] [utils] identificar arquivo responsável.
02122. [BACKEND_ESTRUTURA] [utils] identificar dependências diretas.
02123. [BACKEND_ESTRUTURA] [utils] identificar dependências indiretas.
02124. [BACKEND_ESTRUTURA] [utils] verificar se há código morto.
02125. [BACKEND_ESTRUTURA] [utils] verificar se há import não usado.
02126. [BACKEND_ESTRUTURA] [utils] verificar se há variável indefinida.
02127. [BACKEND_ESTRUTURA] [utils] verificar se há duplicação de lógica.
02128. [BACKEND_ESTRUTURA] [utils] verificar se há comentário desatualizado.
02129. [BACKEND_ESTRUTURA] [utils] verificar se a regra de negócio está clara.
02130. [BACKEND_ESTRUTURA] [utils] verificar se há tratamento de erro.
02131. [BACKEND_ESTRUTURA] [utils] verificar se o erro é amigável para usuário comum.
02132. [BACKEND_ESTRUTURA] [utils] verificar se erro técnico fica apenas no console ou relatório.
02133. [BACKEND_ESTRUTURA] [utils] verificar se há validação de entrada.
02134. [BACKEND_ESTRUTURA] [utils] verificar se há validação de saída.
02135. [BACKEND_ESTRUTURA] [utils] verificar se há validação de permissão.
02136. [BACKEND_ESTRUTURA] [utils] verificar se há risco de acesso indevido.
02137. [BACKEND_ESTRUTURA] [utils] verificar se há risco de dados de outro usuário.
02138. [BACKEND_ESTRUTURA] [utils] verificar se há risco de SQL injection.
02139. [BACKEND_ESTRUTURA] [utils] verificar se há risco de XSS.
02140. [BACKEND_ESTRUTURA] [utils] verificar se há risco de upload inseguro.
02141. [BACKEND_ESTRUTURA] [utils] verificar se imagens têm fallback correto.
02142. [BACKEND_ESTRUTURA] [utils] verificar se /core.png aparece como placeholder.
02143. [BACKEND_ESTRUTURA] [utils] verificar se /logo.png está disponível.
02144. [BACKEND_ESTRUTURA] [utils] verificar se rotas batem entre front e back.
02145. [BACKEND_ESTRUTURA] [utils] verificar se payload esperado bate com payload real.
02146. [BACKEND_ESTRUTURA] [utils] verificar se campos do banco batem com model.
02147. [BACKEND_ESTRUTURA] [utils] verificar se controller retorna padrão consistente.
02148. [BACKEND_ESTRUTURA] [utils] verificar se paginação existe e funciona.
02149. [BACKEND_ESTRUTURA] [utils] verificar se filtros podem ser combinados.
02150. [BACKEND_ESTRUTURA] [utils] verificar se dados null quebram a tela.
02151. [BACKEND_ESTRUTURA] [utils] verificar se array vazio tem estado visual.
02152. [BACKEND_ESTRUTURA] [utils] verificar se loading impede tela quebrada.
02153. [BACKEND_ESTRUTURA] [utils] verificar se modal fecha corretamente.
02154. [BACKEND_ESTRUTURA] [utils] verificar se header não sobrepõe conteúdo.
02155. [BACKEND_ESTRUTURA] [utils] verificar se layout é responsivo.
02156. [BACKEND_ESTRUTURA] [utils] verificar se contraste é legível.
02157. [BACKEND_ESTRUTURA] [utils] verificar se texto é humano e não técnico.
02158. [BACKEND_ESTRUTURA] [utils] verificar se existe teste manual possível.
02159. [BACKEND_ESTRUTURA] [utils] classificar severidade.
02160. [BACKEND_ESTRUTURA] [utils] propor correção com risco estimado.

### BACKEND_ESTRUTURA / migrations
02161. [BACKEND_ESTRUTURA] [migrations] identificar arquivo responsável.
02162. [BACKEND_ESTRUTURA] [migrations] identificar dependências diretas.
02163. [BACKEND_ESTRUTURA] [migrations] identificar dependências indiretas.
02164. [BACKEND_ESTRUTURA] [migrations] verificar se há código morto.
02165. [BACKEND_ESTRUTURA] [migrations] verificar se há import não usado.
02166. [BACKEND_ESTRUTURA] [migrations] verificar se há variável indefinida.
02167. [BACKEND_ESTRUTURA] [migrations] verificar se há duplicação de lógica.
02168. [BACKEND_ESTRUTURA] [migrations] verificar se há comentário desatualizado.
02169. [BACKEND_ESTRUTURA] [migrations] verificar se a regra de negócio está clara.
02170. [BACKEND_ESTRUTURA] [migrations] verificar se há tratamento de erro.
02171. [BACKEND_ESTRUTURA] [migrations] verificar se o erro é amigável para usuário comum.
02172. [BACKEND_ESTRUTURA] [migrations] verificar se erro técnico fica apenas no console ou relatório.
02173. [BACKEND_ESTRUTURA] [migrations] verificar se há validação de entrada.
02174. [BACKEND_ESTRUTURA] [migrations] verificar se há validação de saída.
02175. [BACKEND_ESTRUTURA] [migrations] verificar se há validação de permissão.
02176. [BACKEND_ESTRUTURA] [migrations] verificar se há risco de acesso indevido.
02177. [BACKEND_ESTRUTURA] [migrations] verificar se há risco de dados de outro usuário.
02178. [BACKEND_ESTRUTURA] [migrations] verificar se há risco de SQL injection.
02179. [BACKEND_ESTRUTURA] [migrations] verificar se há risco de XSS.
02180. [BACKEND_ESTRUTURA] [migrations] verificar se há risco de upload inseguro.
02181. [BACKEND_ESTRUTURA] [migrations] verificar se imagens têm fallback correto.
02182. [BACKEND_ESTRUTURA] [migrations] verificar se /core.png aparece como placeholder.
02183. [BACKEND_ESTRUTURA] [migrations] verificar se /logo.png está disponível.
02184. [BACKEND_ESTRUTURA] [migrations] verificar se rotas batem entre front e back.
02185. [BACKEND_ESTRUTURA] [migrations] verificar se payload esperado bate com payload real.
02186. [BACKEND_ESTRUTURA] [migrations] verificar se campos do banco batem com model.
02187. [BACKEND_ESTRUTURA] [migrations] verificar se controller retorna padrão consistente.
02188. [BACKEND_ESTRUTURA] [migrations] verificar se paginação existe e funciona.
02189. [BACKEND_ESTRUTURA] [migrations] verificar se filtros podem ser combinados.
02190. [BACKEND_ESTRUTURA] [migrations] verificar se dados null quebram a tela.
02191. [BACKEND_ESTRUTURA] [migrations] verificar se array vazio tem estado visual.
02192. [BACKEND_ESTRUTURA] [migrations] verificar se loading impede tela quebrada.
02193. [BACKEND_ESTRUTURA] [migrations] verificar se modal fecha corretamente.
02194. [BACKEND_ESTRUTURA] [migrations] verificar se header não sobrepõe conteúdo.
02195. [BACKEND_ESTRUTURA] [migrations] verificar se layout é responsivo.
02196. [BACKEND_ESTRUTURA] [migrations] verificar se contraste é legível.
02197. [BACKEND_ESTRUTURA] [migrations] verificar se texto é humano e não técnico.
02198. [BACKEND_ESTRUTURA] [migrations] verificar se existe teste manual possível.
02199. [BACKEND_ESTRUTURA] [migrations] classificar severidade.
02200. [BACKEND_ESTRUTURA] [migrations] propor correção com risco estimado.

### BACKEND_ESTRUTURA / env
02201. [BACKEND_ESTRUTURA] [env] identificar arquivo responsável.
02202. [BACKEND_ESTRUTURA] [env] identificar dependências diretas.
02203. [BACKEND_ESTRUTURA] [env] identificar dependências indiretas.
02204. [BACKEND_ESTRUTURA] [env] verificar se há código morto.
02205. [BACKEND_ESTRUTURA] [env] verificar se há import não usado.
02206. [BACKEND_ESTRUTURA] [env] verificar se há variável indefinida.
02207. [BACKEND_ESTRUTURA] [env] verificar se há duplicação de lógica.
02208. [BACKEND_ESTRUTURA] [env] verificar se há comentário desatualizado.
02209. [BACKEND_ESTRUTURA] [env] verificar se a regra de negócio está clara.
02210. [BACKEND_ESTRUTURA] [env] verificar se há tratamento de erro.
02211. [BACKEND_ESTRUTURA] [env] verificar se o erro é amigável para usuário comum.
02212. [BACKEND_ESTRUTURA] [env] verificar se erro técnico fica apenas no console ou relatório.
02213. [BACKEND_ESTRUTURA] [env] verificar se há validação de entrada.
02214. [BACKEND_ESTRUTURA] [env] verificar se há validação de saída.
02215. [BACKEND_ESTRUTURA] [env] verificar se há validação de permissão.
02216. [BACKEND_ESTRUTURA] [env] verificar se há risco de acesso indevido.
02217. [BACKEND_ESTRUTURA] [env] verificar se há risco de dados de outro usuário.
02218. [BACKEND_ESTRUTURA] [env] verificar se há risco de SQL injection.
02219. [BACKEND_ESTRUTURA] [env] verificar se há risco de XSS.
02220. [BACKEND_ESTRUTURA] [env] verificar se há risco de upload inseguro.
02221. [BACKEND_ESTRUTURA] [env] verificar se imagens têm fallback correto.
02222. [BACKEND_ESTRUTURA] [env] verificar se /core.png aparece como placeholder.
02223. [BACKEND_ESTRUTURA] [env] verificar se /logo.png está disponível.
02224. [BACKEND_ESTRUTURA] [env] verificar se rotas batem entre front e back.
02225. [BACKEND_ESTRUTURA] [env] verificar se payload esperado bate com payload real.
02226. [BACKEND_ESTRUTURA] [env] verificar se campos do banco batem com model.
02227. [BACKEND_ESTRUTURA] [env] verificar se controller retorna padrão consistente.
02228. [BACKEND_ESTRUTURA] [env] verificar se paginação existe e funciona.
02229. [BACKEND_ESTRUTURA] [env] verificar se filtros podem ser combinados.
02230. [BACKEND_ESTRUTURA] [env] verificar se dados null quebram a tela.
02231. [BACKEND_ESTRUTURA] [env] verificar se array vazio tem estado visual.
02232. [BACKEND_ESTRUTURA] [env] verificar se loading impede tela quebrada.
02233. [BACKEND_ESTRUTURA] [env] verificar se modal fecha corretamente.
02234. [BACKEND_ESTRUTURA] [env] verificar se header não sobrepõe conteúdo.
02235. [BACKEND_ESTRUTURA] [env] verificar se layout é responsivo.
02236. [BACKEND_ESTRUTURA] [env] verificar se contraste é legível.
02237. [BACKEND_ESTRUTURA] [env] verificar se texto é humano e não técnico.
02238. [BACKEND_ESTRUTURA] [env] verificar se existe teste manual possível.
02239. [BACKEND_ESTRUTURA] [env] classificar severidade.
02240. [BACKEND_ESTRUTURA] [env] propor correção com risco estimado.

### BACKEND_ESTRUTURA / package scripts
02241. [BACKEND_ESTRUTURA] [package scripts] identificar arquivo responsável.
02242. [BACKEND_ESTRUTURA] [package scripts] identificar dependências diretas.
02243. [BACKEND_ESTRUTURA] [package scripts] identificar dependências indiretas.
02244. [BACKEND_ESTRUTURA] [package scripts] verificar se há código morto.
02245. [BACKEND_ESTRUTURA] [package scripts] verificar se há import não usado.
02246. [BACKEND_ESTRUTURA] [package scripts] verificar se há variável indefinida.
02247. [BACKEND_ESTRUTURA] [package scripts] verificar se há duplicação de lógica.
02248. [BACKEND_ESTRUTURA] [package scripts] verificar se há comentário desatualizado.
02249. [BACKEND_ESTRUTURA] [package scripts] verificar se a regra de negócio está clara.
02250. [BACKEND_ESTRUTURA] [package scripts] verificar se há tratamento de erro.
02251. [BACKEND_ESTRUTURA] [package scripts] verificar se o erro é amigável para usuário comum.
02252. [BACKEND_ESTRUTURA] [package scripts] verificar se erro técnico fica apenas no console ou relatório.
02253. [BACKEND_ESTRUTURA] [package scripts] verificar se há validação de entrada.
02254. [BACKEND_ESTRUTURA] [package scripts] verificar se há validação de saída.
02255. [BACKEND_ESTRUTURA] [package scripts] verificar se há validação de permissão.
02256. [BACKEND_ESTRUTURA] [package scripts] verificar se há risco de acesso indevido.
02257. [BACKEND_ESTRUTURA] [package scripts] verificar se há risco de dados de outro usuário.
02258. [BACKEND_ESTRUTURA] [package scripts] verificar se há risco de SQL injection.
02259. [BACKEND_ESTRUTURA] [package scripts] verificar se há risco de XSS.
02260. [BACKEND_ESTRUTURA] [package scripts] verificar se há risco de upload inseguro.
02261. [BACKEND_ESTRUTURA] [package scripts] verificar se imagens têm fallback correto.
02262. [BACKEND_ESTRUTURA] [package scripts] verificar se /core.png aparece como placeholder.
02263. [BACKEND_ESTRUTURA] [package scripts] verificar se /logo.png está disponível.
02264. [BACKEND_ESTRUTURA] [package scripts] verificar se rotas batem entre front e back.
02265. [BACKEND_ESTRUTURA] [package scripts] verificar se payload esperado bate com payload real.
02266. [BACKEND_ESTRUTURA] [package scripts] verificar se campos do banco batem com model.
02267. [BACKEND_ESTRUTURA] [package scripts] verificar se controller retorna padrão consistente.
02268. [BACKEND_ESTRUTURA] [package scripts] verificar se paginação existe e funciona.
02269. [BACKEND_ESTRUTURA] [package scripts] verificar se filtros podem ser combinados.
02270. [BACKEND_ESTRUTURA] [package scripts] verificar se dados null quebram a tela.
02271. [BACKEND_ESTRUTURA] [package scripts] verificar se array vazio tem estado visual.
02272. [BACKEND_ESTRUTURA] [package scripts] verificar se loading impede tela quebrada.
02273. [BACKEND_ESTRUTURA] [package scripts] verificar se modal fecha corretamente.
02274. [BACKEND_ESTRUTURA] [package scripts] verificar se header não sobrepõe conteúdo.
02275. [BACKEND_ESTRUTURA] [package scripts] verificar se layout é responsivo.
02276. [BACKEND_ESTRUTURA] [package scripts] verificar se contraste é legível.
02277. [BACKEND_ESTRUTURA] [package scripts] verificar se texto é humano e não técnico.
02278. [BACKEND_ESTRUTURA] [package scripts] verificar se existe teste manual possível.
02279. [BACKEND_ESTRUTURA] [package scripts] classificar severidade.
02280. [BACKEND_ESTRUTURA] [package scripts] propor correção com risco estimado.

---

## 6. Revisão detalhada — BACKEND_API

### BACKEND_API / auth
02281. [BACKEND_API] [auth] identificar arquivo responsável.
02282. [BACKEND_API] [auth] identificar dependências diretas.
02283. [BACKEND_API] [auth] identificar dependências indiretas.
02284. [BACKEND_API] [auth] verificar se há código morto.
02285. [BACKEND_API] [auth] verificar se há import não usado.
02286. [BACKEND_API] [auth] verificar se há variável indefinida.
02287. [BACKEND_API] [auth] verificar se há duplicação de lógica.
02288. [BACKEND_API] [auth] verificar se há comentário desatualizado.
02289. [BACKEND_API] [auth] verificar se a regra de negócio está clara.
02290. [BACKEND_API] [auth] verificar se há tratamento de erro.
02291. [BACKEND_API] [auth] verificar se o erro é amigável para usuário comum.
02292. [BACKEND_API] [auth] verificar se erro técnico fica apenas no console ou relatório.
02293. [BACKEND_API] [auth] verificar se há validação de entrada.
02294. [BACKEND_API] [auth] verificar se há validação de saída.
02295. [BACKEND_API] [auth] verificar se há validação de permissão.
02296. [BACKEND_API] [auth] verificar se há risco de acesso indevido.
02297. [BACKEND_API] [auth] verificar se há risco de dados de outro usuário.
02298. [BACKEND_API] [auth] verificar se há risco de SQL injection.
02299. [BACKEND_API] [auth] verificar se há risco de XSS.
02300. [BACKEND_API] [auth] verificar se há risco de upload inseguro.
02301. [BACKEND_API] [auth] verificar se imagens têm fallback correto.
02302. [BACKEND_API] [auth] verificar se /core.png aparece como placeholder.
02303. [BACKEND_API] [auth] verificar se /logo.png está disponível.
02304. [BACKEND_API] [auth] verificar se rotas batem entre front e back.
02305. [BACKEND_API] [auth] verificar se payload esperado bate com payload real.
02306. [BACKEND_API] [auth] verificar se campos do banco batem com model.
02307. [BACKEND_API] [auth] verificar se controller retorna padrão consistente.
02308. [BACKEND_API] [auth] verificar se paginação existe e funciona.
02309. [BACKEND_API] [auth] verificar se filtros podem ser combinados.
02310. [BACKEND_API] [auth] verificar se dados null quebram a tela.
02311. [BACKEND_API] [auth] verificar se array vazio tem estado visual.
02312. [BACKEND_API] [auth] verificar se loading impede tela quebrada.
02313. [BACKEND_API] [auth] verificar se modal fecha corretamente.
02314. [BACKEND_API] [auth] verificar se header não sobrepõe conteúdo.
02315. [BACKEND_API] [auth] verificar se layout é responsivo.
02316. [BACKEND_API] [auth] verificar se contraste é legível.
02317. [BACKEND_API] [auth] verificar se texto é humano e não técnico.
02318. [BACKEND_API] [auth] verificar se existe teste manual possível.
02319. [BACKEND_API] [auth] classificar severidade.
02320. [BACKEND_API] [auth] propor correção com risco estimado.

### BACKEND_API / usuarios
02321. [BACKEND_API] [usuarios] identificar arquivo responsável.
02322. [BACKEND_API] [usuarios] identificar dependências diretas.
02323. [BACKEND_API] [usuarios] identificar dependências indiretas.
02324. [BACKEND_API] [usuarios] verificar se há código morto.
02325. [BACKEND_API] [usuarios] verificar se há import não usado.
02326. [BACKEND_API] [usuarios] verificar se há variável indefinida.
02327. [BACKEND_API] [usuarios] verificar se há duplicação de lógica.
02328. [BACKEND_API] [usuarios] verificar se há comentário desatualizado.
02329. [BACKEND_API] [usuarios] verificar se a regra de negócio está clara.
02330. [BACKEND_API] [usuarios] verificar se há tratamento de erro.
02331. [BACKEND_API] [usuarios] verificar se o erro é amigável para usuário comum.
02332. [BACKEND_API] [usuarios] verificar se erro técnico fica apenas no console ou relatório.
02333. [BACKEND_API] [usuarios] verificar se há validação de entrada.
02334. [BACKEND_API] [usuarios] verificar se há validação de saída.
02335. [BACKEND_API] [usuarios] verificar se há validação de permissão.
02336. [BACKEND_API] [usuarios] verificar se há risco de acesso indevido.
02337. [BACKEND_API] [usuarios] verificar se há risco de dados de outro usuário.
02338. [BACKEND_API] [usuarios] verificar se há risco de SQL injection.
02339. [BACKEND_API] [usuarios] verificar se há risco de XSS.
02340. [BACKEND_API] [usuarios] verificar se há risco de upload inseguro.
02341. [BACKEND_API] [usuarios] verificar se imagens têm fallback correto.
02342. [BACKEND_API] [usuarios] verificar se /core.png aparece como placeholder.
02343. [BACKEND_API] [usuarios] verificar se /logo.png está disponível.
02344. [BACKEND_API] [usuarios] verificar se rotas batem entre front e back.
02345. [BACKEND_API] [usuarios] verificar se payload esperado bate com payload real.
02346. [BACKEND_API] [usuarios] verificar se campos do banco batem com model.
02347. [BACKEND_API] [usuarios] verificar se controller retorna padrão consistente.
02348. [BACKEND_API] [usuarios] verificar se paginação existe e funciona.
02349. [BACKEND_API] [usuarios] verificar se filtros podem ser combinados.
02350. [BACKEND_API] [usuarios] verificar se dados null quebram a tela.
02351. [BACKEND_API] [usuarios] verificar se array vazio tem estado visual.
02352. [BACKEND_API] [usuarios] verificar se loading impede tela quebrada.
02353. [BACKEND_API] [usuarios] verificar se modal fecha corretamente.
02354. [BACKEND_API] [usuarios] verificar se header não sobrepõe conteúdo.
02355. [BACKEND_API] [usuarios] verificar se layout é responsivo.
02356. [BACKEND_API] [usuarios] verificar se contraste é legível.
02357. [BACKEND_API] [usuarios] verificar se texto é humano e não técnico.
02358. [BACKEND_API] [usuarios] verificar se existe teste manual possível.
02359. [BACKEND_API] [usuarios] classificar severidade.
02360. [BACKEND_API] [usuarios] propor correção com risco estimado.

### BACKEND_API / produtos
02361. [BACKEND_API] [produtos] identificar arquivo responsável.
02362. [BACKEND_API] [produtos] identificar dependências diretas.
02363. [BACKEND_API] [produtos] identificar dependências indiretas.
02364. [BACKEND_API] [produtos] verificar se há código morto.
02365. [BACKEND_API] [produtos] verificar se há import não usado.
02366. [BACKEND_API] [produtos] verificar se há variável indefinida.
02367. [BACKEND_API] [produtos] verificar se há duplicação de lógica.
02368. [BACKEND_API] [produtos] verificar se há comentário desatualizado.
02369. [BACKEND_API] [produtos] verificar se a regra de negócio está clara.
02370. [BACKEND_API] [produtos] verificar se há tratamento de erro.
02371. [BACKEND_API] [produtos] verificar se o erro é amigável para usuário comum.
02372. [BACKEND_API] [produtos] verificar se erro técnico fica apenas no console ou relatório.
02373. [BACKEND_API] [produtos] verificar se há validação de entrada.
02374. [BACKEND_API] [produtos] verificar se há validação de saída.
02375. [BACKEND_API] [produtos] verificar se há validação de permissão.
02376. [BACKEND_API] [produtos] verificar se há risco de acesso indevido.
02377. [BACKEND_API] [produtos] verificar se há risco de dados de outro usuário.
02378. [BACKEND_API] [produtos] verificar se há risco de SQL injection.
02379. [BACKEND_API] [produtos] verificar se há risco de XSS.
02380. [BACKEND_API] [produtos] verificar se há risco de upload inseguro.
02381. [BACKEND_API] [produtos] verificar se imagens têm fallback correto.
02382. [BACKEND_API] [produtos] verificar se /core.png aparece como placeholder.
02383. [BACKEND_API] [produtos] verificar se /logo.png está disponível.
02384. [BACKEND_API] [produtos] verificar se rotas batem entre front e back.
02385. [BACKEND_API] [produtos] verificar se payload esperado bate com payload real.
02386. [BACKEND_API] [produtos] verificar se campos do banco batem com model.
02387. [BACKEND_API] [produtos] verificar se controller retorna padrão consistente.
02388. [BACKEND_API] [produtos] verificar se paginação existe e funciona.
02389. [BACKEND_API] [produtos] verificar se filtros podem ser combinados.
02390. [BACKEND_API] [produtos] verificar se dados null quebram a tela.
02391. [BACKEND_API] [produtos] verificar se array vazio tem estado visual.
02392. [BACKEND_API] [produtos] verificar se loading impede tela quebrada.
02393. [BACKEND_API] [produtos] verificar se modal fecha corretamente.
02394. [BACKEND_API] [produtos] verificar se header não sobrepõe conteúdo.
02395. [BACKEND_API] [produtos] verificar se layout é responsivo.
02396. [BACKEND_API] [produtos] verificar se contraste é legível.
02397. [BACKEND_API] [produtos] verificar se texto é humano e não técnico.
02398. [BACKEND_API] [produtos] verificar se existe teste manual possível.
02399. [BACKEND_API] [produtos] classificar severidade.
02400. [BACKEND_API] [produtos] propor correção com risco estimado.

### BACKEND_API / pedidos
02401. [BACKEND_API] [pedidos] identificar arquivo responsável.
02402. [BACKEND_API] [pedidos] identificar dependências diretas.
02403. [BACKEND_API] [pedidos] identificar dependências indiretas.
02404. [BACKEND_API] [pedidos] verificar se há código morto.
02405. [BACKEND_API] [pedidos] verificar se há import não usado.
02406. [BACKEND_API] [pedidos] verificar se há variável indefinida.
02407. [BACKEND_API] [pedidos] verificar se há duplicação de lógica.
02408. [BACKEND_API] [pedidos] verificar se há comentário desatualizado.
02409. [BACKEND_API] [pedidos] verificar se a regra de negócio está clara.
02410. [BACKEND_API] [pedidos] verificar se há tratamento de erro.
02411. [BACKEND_API] [pedidos] verificar se o erro é amigável para usuário comum.
02412. [BACKEND_API] [pedidos] verificar se erro técnico fica apenas no console ou relatório.
02413. [BACKEND_API] [pedidos] verificar se há validação de entrada.
02414. [BACKEND_API] [pedidos] verificar se há validação de saída.
02415. [BACKEND_API] [pedidos] verificar se há validação de permissão.
02416. [BACKEND_API] [pedidos] verificar se há risco de acesso indevido.
02417. [BACKEND_API] [pedidos] verificar se há risco de dados de outro usuário.
02418. [BACKEND_API] [pedidos] verificar se há risco de SQL injection.
02419. [BACKEND_API] [pedidos] verificar se há risco de XSS.
02420. [BACKEND_API] [pedidos] verificar se há risco de upload inseguro.
02421. [BACKEND_API] [pedidos] verificar se imagens têm fallback correto.
02422. [BACKEND_API] [pedidos] verificar se /core.png aparece como placeholder.
02423. [BACKEND_API] [pedidos] verificar se /logo.png está disponível.
02424. [BACKEND_API] [pedidos] verificar se rotas batem entre front e back.
02425. [BACKEND_API] [pedidos] verificar se payload esperado bate com payload real.
02426. [BACKEND_API] [pedidos] verificar se campos do banco batem com model.
02427. [BACKEND_API] [pedidos] verificar se controller retorna padrão consistente.
02428. [BACKEND_API] [pedidos] verificar se paginação existe e funciona.
02429. [BACKEND_API] [pedidos] verificar se filtros podem ser combinados.
02430. [BACKEND_API] [pedidos] verificar se dados null quebram a tela.
02431. [BACKEND_API] [pedidos] verificar se array vazio tem estado visual.
02432. [BACKEND_API] [pedidos] verificar se loading impede tela quebrada.
02433. [BACKEND_API] [pedidos] verificar se modal fecha corretamente.
02434. [BACKEND_API] [pedidos] verificar se header não sobrepõe conteúdo.
02435. [BACKEND_API] [pedidos] verificar se layout é responsivo.
02436. [BACKEND_API] [pedidos] verificar se contraste é legível.
02437. [BACKEND_API] [pedidos] verificar se texto é humano e não técnico.
02438. [BACKEND_API] [pedidos] verificar se existe teste manual possível.
02439. [BACKEND_API] [pedidos] classificar severidade.
02440. [BACKEND_API] [pedidos] propor correção com risco estimado.

### BACKEND_API / encomendas
02441. [BACKEND_API] [encomendas] identificar arquivo responsável.
02442. [BACKEND_API] [encomendas] identificar dependências diretas.
02443. [BACKEND_API] [encomendas] identificar dependências indiretas.
02444. [BACKEND_API] [encomendas] verificar se há código morto.
02445. [BACKEND_API] [encomendas] verificar se há import não usado.
02446. [BACKEND_API] [encomendas] verificar se há variável indefinida.
02447. [BACKEND_API] [encomendas] verificar se há duplicação de lógica.
02448. [BACKEND_API] [encomendas] verificar se há comentário desatualizado.
02449. [BACKEND_API] [encomendas] verificar se a regra de negócio está clara.
02450. [BACKEND_API] [encomendas] verificar se há tratamento de erro.
02451. [BACKEND_API] [encomendas] verificar se o erro é amigável para usuário comum.
02452. [BACKEND_API] [encomendas] verificar se erro técnico fica apenas no console ou relatório.
02453. [BACKEND_API] [encomendas] verificar se há validação de entrada.
02454. [BACKEND_API] [encomendas] verificar se há validação de saída.
02455. [BACKEND_API] [encomendas] verificar se há validação de permissão.
02456. [BACKEND_API] [encomendas] verificar se há risco de acesso indevido.
02457. [BACKEND_API] [encomendas] verificar se há risco de dados de outro usuário.
02458. [BACKEND_API] [encomendas] verificar se há risco de SQL injection.
02459. [BACKEND_API] [encomendas] verificar se há risco de XSS.
02460. [BACKEND_API] [encomendas] verificar se há risco de upload inseguro.
02461. [BACKEND_API] [encomendas] verificar se imagens têm fallback correto.
02462. [BACKEND_API] [encomendas] verificar se /core.png aparece como placeholder.
02463. [BACKEND_API] [encomendas] verificar se /logo.png está disponível.
02464. [BACKEND_API] [encomendas] verificar se rotas batem entre front e back.
02465. [BACKEND_API] [encomendas] verificar se payload esperado bate com payload real.
02466. [BACKEND_API] [encomendas] verificar se campos do banco batem com model.
02467. [BACKEND_API] [encomendas] verificar se controller retorna padrão consistente.
02468. [BACKEND_API] [encomendas] verificar se paginação existe e funciona.
02469. [BACKEND_API] [encomendas] verificar se filtros podem ser combinados.
02470. [BACKEND_API] [encomendas] verificar se dados null quebram a tela.
02471. [BACKEND_API] [encomendas] verificar se array vazio tem estado visual.
02472. [BACKEND_API] [encomendas] verificar se loading impede tela quebrada.
02473. [BACKEND_API] [encomendas] verificar se modal fecha corretamente.
02474. [BACKEND_API] [encomendas] verificar se header não sobrepõe conteúdo.
02475. [BACKEND_API] [encomendas] verificar se layout é responsivo.
02476. [BACKEND_API] [encomendas] verificar se contraste é legível.
02477. [BACKEND_API] [encomendas] verificar se texto é humano e não técnico.
02478. [BACKEND_API] [encomendas] verificar se existe teste manual possível.
02479. [BACKEND_API] [encomendas] classificar severidade.
02480. [BACKEND_API] [encomendas] propor correção com risco estimado.

### BACKEND_API / orcamentos
02481. [BACKEND_API] [orcamentos] identificar arquivo responsável.
02482. [BACKEND_API] [orcamentos] identificar dependências diretas.
02483. [BACKEND_API] [orcamentos] identificar dependências indiretas.
02484. [BACKEND_API] [orcamentos] verificar se há código morto.
02485. [BACKEND_API] [orcamentos] verificar se há import não usado.
02486. [BACKEND_API] [orcamentos] verificar se há variável indefinida.
02487. [BACKEND_API] [orcamentos] verificar se há duplicação de lógica.
02488. [BACKEND_API] [orcamentos] verificar se há comentário desatualizado.
02489. [BACKEND_API] [orcamentos] verificar se a regra de negócio está clara.
02490. [BACKEND_API] [orcamentos] verificar se há tratamento de erro.
02491. [BACKEND_API] [orcamentos] verificar se o erro é amigável para usuário comum.
02492. [BACKEND_API] [orcamentos] verificar se erro técnico fica apenas no console ou relatório.
02493. [BACKEND_API] [orcamentos] verificar se há validação de entrada.
02494. [BACKEND_API] [orcamentos] verificar se há validação de saída.
02495. [BACKEND_API] [orcamentos] verificar se há validação de permissão.
02496. [BACKEND_API] [orcamentos] verificar se há risco de acesso indevido.
02497. [BACKEND_API] [orcamentos] verificar se há risco de dados de outro usuário.
02498. [BACKEND_API] [orcamentos] verificar se há risco de SQL injection.
02499. [BACKEND_API] [orcamentos] verificar se há risco de XSS.
02500. [BACKEND_API] [orcamentos] verificar se há risco de upload inseguro.
02501. [BACKEND_API] [orcamentos] verificar se imagens têm fallback correto.
02502. [BACKEND_API] [orcamentos] verificar se /core.png aparece como placeholder.
02503. [BACKEND_API] [orcamentos] verificar se /logo.png está disponível.
02504. [BACKEND_API] [orcamentos] verificar se rotas batem entre front e back.
02505. [BACKEND_API] [orcamentos] verificar se payload esperado bate com payload real.
02506. [BACKEND_API] [orcamentos] verificar se campos do banco batem com model.
02507. [BACKEND_API] [orcamentos] verificar se controller retorna padrão consistente.
02508. [BACKEND_API] [orcamentos] verificar se paginação existe e funciona.
02509. [BACKEND_API] [orcamentos] verificar se filtros podem ser combinados.
02510. [BACKEND_API] [orcamentos] verificar se dados null quebram a tela.
02511. [BACKEND_API] [orcamentos] verificar se array vazio tem estado visual.
02512. [BACKEND_API] [orcamentos] verificar se loading impede tela quebrada.
02513. [BACKEND_API] [orcamentos] verificar se modal fecha corretamente.
02514. [BACKEND_API] [orcamentos] verificar se header não sobrepõe conteúdo.
02515. [BACKEND_API] [orcamentos] verificar se layout é responsivo.
02516. [BACKEND_API] [orcamentos] verificar se contraste é legível.
02517. [BACKEND_API] [orcamentos] verificar se texto é humano e não técnico.
02518. [BACKEND_API] [orcamentos] verificar se existe teste manual possível.
02519. [BACKEND_API] [orcamentos] classificar severidade.
02520. [BACKEND_API] [orcamentos] propor correção com risco estimado.

### BACKEND_API / logistica
02521. [BACKEND_API] [logistica] identificar arquivo responsável.
02522. [BACKEND_API] [logistica] identificar dependências diretas.
02523. [BACKEND_API] [logistica] identificar dependências indiretas.
02524. [BACKEND_API] [logistica] verificar se há código morto.
02525. [BACKEND_API] [logistica] verificar se há import não usado.
02526. [BACKEND_API] [logistica] verificar se há variável indefinida.
02527. [BACKEND_API] [logistica] verificar se há duplicação de lógica.
02528. [BACKEND_API] [logistica] verificar se há comentário desatualizado.
02529. [BACKEND_API] [logistica] verificar se a regra de negócio está clara.
02530. [BACKEND_API] [logistica] verificar se há tratamento de erro.
02531. [BACKEND_API] [logistica] verificar se o erro é amigável para usuário comum.
02532. [BACKEND_API] [logistica] verificar se erro técnico fica apenas no console ou relatório.
02533. [BACKEND_API] [logistica] verificar se há validação de entrada.
02534. [BACKEND_API] [logistica] verificar se há validação de saída.
02535. [BACKEND_API] [logistica] verificar se há validação de permissão.
02536. [BACKEND_API] [logistica] verificar se há risco de acesso indevido.
02537. [BACKEND_API] [logistica] verificar se há risco de dados de outro usuário.
02538. [BACKEND_API] [logistica] verificar se há risco de SQL injection.
02539. [BACKEND_API] [logistica] verificar se há risco de XSS.
02540. [BACKEND_API] [logistica] verificar se há risco de upload inseguro.
02541. [BACKEND_API] [logistica] verificar se imagens têm fallback correto.
02542. [BACKEND_API] [logistica] verificar se /core.png aparece como placeholder.
02543. [BACKEND_API] [logistica] verificar se /logo.png está disponível.
02544. [BACKEND_API] [logistica] verificar se rotas batem entre front e back.
02545. [BACKEND_API] [logistica] verificar se payload esperado bate com payload real.
02546. [BACKEND_API] [logistica] verificar se campos do banco batem com model.
02547. [BACKEND_API] [logistica] verificar se controller retorna padrão consistente.
02548. [BACKEND_API] [logistica] verificar se paginação existe e funciona.
02549. [BACKEND_API] [logistica] verificar se filtros podem ser combinados.
02550. [BACKEND_API] [logistica] verificar se dados null quebram a tela.
02551. [BACKEND_API] [logistica] verificar se array vazio tem estado visual.
02552. [BACKEND_API] [logistica] verificar se loading impede tela quebrada.
02553. [BACKEND_API] [logistica] verificar se modal fecha corretamente.
02554. [BACKEND_API] [logistica] verificar se header não sobrepõe conteúdo.
02555. [BACKEND_API] [logistica] verificar se layout é responsivo.
02556. [BACKEND_API] [logistica] verificar se contraste é legível.
02557. [BACKEND_API] [logistica] verificar se texto é humano e não técnico.
02558. [BACKEND_API] [logistica] verificar se existe teste manual possível.
02559. [BACKEND_API] [logistica] classificar severidade.
02560. [BACKEND_API] [logistica] propor correção com risco estimado.

### BACKEND_API / suporte
02561. [BACKEND_API] [suporte] identificar arquivo responsável.
02562. [BACKEND_API] [suporte] identificar dependências diretas.
02563. [BACKEND_API] [suporte] identificar dependências indiretas.
02564. [BACKEND_API] [suporte] verificar se há código morto.
02565. [BACKEND_API] [suporte] verificar se há import não usado.
02566. [BACKEND_API] [suporte] verificar se há variável indefinida.
02567. [BACKEND_API] [suporte] verificar se há duplicação de lógica.
02568. [BACKEND_API] [suporte] verificar se há comentário desatualizado.
02569. [BACKEND_API] [suporte] verificar se a regra de negócio está clara.
02570. [BACKEND_API] [suporte] verificar se há tratamento de erro.
02571. [BACKEND_API] [suporte] verificar se o erro é amigável para usuário comum.
02572. [BACKEND_API] [suporte] verificar se erro técnico fica apenas no console ou relatório.
02573. [BACKEND_API] [suporte] verificar se há validação de entrada.
02574. [BACKEND_API] [suporte] verificar se há validação de saída.
02575. [BACKEND_API] [suporte] verificar se há validação de permissão.
02576. [BACKEND_API] [suporte] verificar se há risco de acesso indevido.
02577. [BACKEND_API] [suporte] verificar se há risco de dados de outro usuário.
02578. [BACKEND_API] [suporte] verificar se há risco de SQL injection.
02579. [BACKEND_API] [suporte] verificar se há risco de XSS.
02580. [BACKEND_API] [suporte] verificar se há risco de upload inseguro.
02581. [BACKEND_API] [suporte] verificar se imagens têm fallback correto.
02582. [BACKEND_API] [suporte] verificar se /core.png aparece como placeholder.
02583. [BACKEND_API] [suporte] verificar se /logo.png está disponível.
02584. [BACKEND_API] [suporte] verificar se rotas batem entre front e back.
02585. [BACKEND_API] [suporte] verificar se payload esperado bate com payload real.
02586. [BACKEND_API] [suporte] verificar se campos do banco batem com model.
02587. [BACKEND_API] [suporte] verificar se controller retorna padrão consistente.
02588. [BACKEND_API] [suporte] verificar se paginação existe e funciona.
02589. [BACKEND_API] [suporte] verificar se filtros podem ser combinados.
02590. [BACKEND_API] [suporte] verificar se dados null quebram a tela.
02591. [BACKEND_API] [suporte] verificar se array vazio tem estado visual.
02592. [BACKEND_API] [suporte] verificar se loading impede tela quebrada.
02593. [BACKEND_API] [suporte] verificar se modal fecha corretamente.
02594. [BACKEND_API] [suporte] verificar se header não sobrepõe conteúdo.
02595. [BACKEND_API] [suporte] verificar se layout é responsivo.
02596. [BACKEND_API] [suporte] verificar se contraste é legível.
02597. [BACKEND_API] [suporte] verificar se texto é humano e não técnico.
02598. [BACKEND_API] [suporte] verificar se existe teste manual possível.
02599. [BACKEND_API] [suporte] classificar severidade.
02600. [BACKEND_API] [suporte] propor correção com risco estimado.

### BACKEND_API / notificacoes
02601. [BACKEND_API] [notificacoes] identificar arquivo responsável.
02602. [BACKEND_API] [notificacoes] identificar dependências diretas.
02603. [BACKEND_API] [notificacoes] identificar dependências indiretas.
02604. [BACKEND_API] [notificacoes] verificar se há código morto.
02605. [BACKEND_API] [notificacoes] verificar se há import não usado.
02606. [BACKEND_API] [notificacoes] verificar se há variável indefinida.
02607. [BACKEND_API] [notificacoes] verificar se há duplicação de lógica.
02608. [BACKEND_API] [notificacoes] verificar se há comentário desatualizado.
02609. [BACKEND_API] [notificacoes] verificar se a regra de negócio está clara.
02610. [BACKEND_API] [notificacoes] verificar se há tratamento de erro.
02611. [BACKEND_API] [notificacoes] verificar se o erro é amigável para usuário comum.
02612. [BACKEND_API] [notificacoes] verificar se erro técnico fica apenas no console ou relatório.
02613. [BACKEND_API] [notificacoes] verificar se há validação de entrada.
02614. [BACKEND_API] [notificacoes] verificar se há validação de saída.
02615. [BACKEND_API] [notificacoes] verificar se há validação de permissão.
02616. [BACKEND_API] [notificacoes] verificar se há risco de acesso indevido.
02617. [BACKEND_API] [notificacoes] verificar se há risco de dados de outro usuário.
02618. [BACKEND_API] [notificacoes] verificar se há risco de SQL injection.
02619. [BACKEND_API] [notificacoes] verificar se há risco de XSS.
02620. [BACKEND_API] [notificacoes] verificar se há risco de upload inseguro.
02621. [BACKEND_API] [notificacoes] verificar se imagens têm fallback correto.
02622. [BACKEND_API] [notificacoes] verificar se /core.png aparece como placeholder.
02623. [BACKEND_API] [notificacoes] verificar se /logo.png está disponível.
02624. [BACKEND_API] [notificacoes] verificar se rotas batem entre front e back.
02625. [BACKEND_API] [notificacoes] verificar se payload esperado bate com payload real.
02626. [BACKEND_API] [notificacoes] verificar se campos do banco batem com model.
02627. [BACKEND_API] [notificacoes] verificar se controller retorna padrão consistente.
02628. [BACKEND_API] [notificacoes] verificar se paginação existe e funciona.
02629. [BACKEND_API] [notificacoes] verificar se filtros podem ser combinados.
02630. [BACKEND_API] [notificacoes] verificar se dados null quebram a tela.
02631. [BACKEND_API] [notificacoes] verificar se array vazio tem estado visual.
02632. [BACKEND_API] [notificacoes] verificar se loading impede tela quebrada.
02633. [BACKEND_API] [notificacoes] verificar se modal fecha corretamente.
02634. [BACKEND_API] [notificacoes] verificar se header não sobrepõe conteúdo.
02635. [BACKEND_API] [notificacoes] verificar se layout é responsivo.
02636. [BACKEND_API] [notificacoes] verificar se contraste é legível.
02637. [BACKEND_API] [notificacoes] verificar se texto é humano e não técnico.
02638. [BACKEND_API] [notificacoes] verificar se existe teste manual possível.
02639. [BACKEND_API] [notificacoes] classificar severidade.
02640. [BACKEND_API] [notificacoes] propor correção com risco estimado.

### BACKEND_API / upload
02641. [BACKEND_API] [upload] identificar arquivo responsável.
02642. [BACKEND_API] [upload] identificar dependências diretas.
02643. [BACKEND_API] [upload] identificar dependências indiretas.
02644. [BACKEND_API] [upload] verificar se há código morto.
02645. [BACKEND_API] [upload] verificar se há import não usado.
02646. [BACKEND_API] [upload] verificar se há variável indefinida.
02647. [BACKEND_API] [upload] verificar se há duplicação de lógica.
02648. [BACKEND_API] [upload] verificar se há comentário desatualizado.
02649. [BACKEND_API] [upload] verificar se a regra de negócio está clara.
02650. [BACKEND_API] [upload] verificar se há tratamento de erro.
02651. [BACKEND_API] [upload] verificar se o erro é amigável para usuário comum.
02652. [BACKEND_API] [upload] verificar se erro técnico fica apenas no console ou relatório.
02653. [BACKEND_API] [upload] verificar se há validação de entrada.
02654. [BACKEND_API] [upload] verificar se há validação de saída.
02655. [BACKEND_API] [upload] verificar se há validação de permissão.
02656. [BACKEND_API] [upload] verificar se há risco de acesso indevido.
02657. [BACKEND_API] [upload] verificar se há risco de dados de outro usuário.
02658. [BACKEND_API] [upload] verificar se há risco de SQL injection.
02659. [BACKEND_API] [upload] verificar se há risco de XSS.
02660. [BACKEND_API] [upload] verificar se há risco de upload inseguro.
02661. [BACKEND_API] [upload] verificar se imagens têm fallback correto.
02662. [BACKEND_API] [upload] verificar se /core.png aparece como placeholder.
02663. [BACKEND_API] [upload] verificar se /logo.png está disponível.
02664. [BACKEND_API] [upload] verificar se rotas batem entre front e back.
02665. [BACKEND_API] [upload] verificar se payload esperado bate com payload real.
02666. [BACKEND_API] [upload] verificar se campos do banco batem com model.
02667. [BACKEND_API] [upload] verificar se controller retorna padrão consistente.
02668. [BACKEND_API] [upload] verificar se paginação existe e funciona.
02669. [BACKEND_API] [upload] verificar se filtros podem ser combinados.
02670. [BACKEND_API] [upload] verificar se dados null quebram a tela.
02671. [BACKEND_API] [upload] verificar se array vazio tem estado visual.
02672. [BACKEND_API] [upload] verificar se loading impede tela quebrada.
02673. [BACKEND_API] [upload] verificar se modal fecha corretamente.
02674. [BACKEND_API] [upload] verificar se header não sobrepõe conteúdo.
02675. [BACKEND_API] [upload] verificar se layout é responsivo.
02676. [BACKEND_API] [upload] verificar se contraste é legível.
02677. [BACKEND_API] [upload] verificar se texto é humano e não técnico.
02678. [BACKEND_API] [upload] verificar se existe teste manual possível.
02679. [BACKEND_API] [upload] classificar severidade.
02680. [BACKEND_API] [upload] propor correção com risco estimado.

### BACKEND_API / static files
02681. [BACKEND_API] [static files] identificar arquivo responsável.
02682. [BACKEND_API] [static files] identificar dependências diretas.
02683. [BACKEND_API] [static files] identificar dependências indiretas.
02684. [BACKEND_API] [static files] verificar se há código morto.
02685. [BACKEND_API] [static files] verificar se há import não usado.
02686. [BACKEND_API] [static files] verificar se há variável indefinida.
02687. [BACKEND_API] [static files] verificar se há duplicação de lógica.
02688. [BACKEND_API] [static files] verificar se há comentário desatualizado.
02689. [BACKEND_API] [static files] verificar se a regra de negócio está clara.
02690. [BACKEND_API] [static files] verificar se há tratamento de erro.
02691. [BACKEND_API] [static files] verificar se o erro é amigável para usuário comum.
02692. [BACKEND_API] [static files] verificar se erro técnico fica apenas no console ou relatório.
02693. [BACKEND_API] [static files] verificar se há validação de entrada.
02694. [BACKEND_API] [static files] verificar se há validação de saída.
02695. [BACKEND_API] [static files] verificar se há validação de permissão.
02696. [BACKEND_API] [static files] verificar se há risco de acesso indevido.
02697. [BACKEND_API] [static files] verificar se há risco de dados de outro usuário.
02698. [BACKEND_API] [static files] verificar se há risco de SQL injection.
02699. [BACKEND_API] [static files] verificar se há risco de XSS.
02700. [BACKEND_API] [static files] verificar se há risco de upload inseguro.
02701. [BACKEND_API] [static files] verificar se imagens têm fallback correto.
02702. [BACKEND_API] [static files] verificar se /core.png aparece como placeholder.
02703. [BACKEND_API] [static files] verificar se /logo.png está disponível.
02704. [BACKEND_API] [static files] verificar se rotas batem entre front e back.
02705. [BACKEND_API] [static files] verificar se payload esperado bate com payload real.
02706. [BACKEND_API] [static files] verificar se campos do banco batem com model.
02707. [BACKEND_API] [static files] verificar se controller retorna padrão consistente.
02708. [BACKEND_API] [static files] verificar se paginação existe e funciona.
02709. [BACKEND_API] [static files] verificar se filtros podem ser combinados.
02710. [BACKEND_API] [static files] verificar se dados null quebram a tela.
02711. [BACKEND_API] [static files] verificar se array vazio tem estado visual.
02712. [BACKEND_API] [static files] verificar se loading impede tela quebrada.
02713. [BACKEND_API] [static files] verificar se modal fecha corretamente.
02714. [BACKEND_API] [static files] verificar se header não sobrepõe conteúdo.
02715. [BACKEND_API] [static files] verificar se layout é responsivo.
02716. [BACKEND_API] [static files] verificar se contraste é legível.
02717. [BACKEND_API] [static files] verificar se texto é humano e não técnico.
02718. [BACKEND_API] [static files] verificar se existe teste manual possível.
02719. [BACKEND_API] [static files] classificar severidade.
02720. [BACKEND_API] [static files] propor correção com risco estimado.

### BACKEND_API / cors
02721. [BACKEND_API] [cors] identificar arquivo responsável.
02722. [BACKEND_API] [cors] identificar dependências diretas.
02723. [BACKEND_API] [cors] identificar dependências indiretas.
02724. [BACKEND_API] [cors] verificar se há código morto.
02725. [BACKEND_API] [cors] verificar se há import não usado.
02726. [BACKEND_API] [cors] verificar se há variável indefinida.
02727. [BACKEND_API] [cors] verificar se há duplicação de lógica.
02728. [BACKEND_API] [cors] verificar se há comentário desatualizado.
02729. [BACKEND_API] [cors] verificar se a regra de negócio está clara.
02730. [BACKEND_API] [cors] verificar se há tratamento de erro.
02731. [BACKEND_API] [cors] verificar se o erro é amigável para usuário comum.
02732. [BACKEND_API] [cors] verificar se erro técnico fica apenas no console ou relatório.
02733. [BACKEND_API] [cors] verificar se há validação de entrada.
02734. [BACKEND_API] [cors] verificar se há validação de saída.
02735. [BACKEND_API] [cors] verificar se há validação de permissão.
02736. [BACKEND_API] [cors] verificar se há risco de acesso indevido.
02737. [BACKEND_API] [cors] verificar se há risco de dados de outro usuário.
02738. [BACKEND_API] [cors] verificar se há risco de SQL injection.
02739. [BACKEND_API] [cors] verificar se há risco de XSS.
02740. [BACKEND_API] [cors] verificar se há risco de upload inseguro.
02741. [BACKEND_API] [cors] verificar se imagens têm fallback correto.
02742. [BACKEND_API] [cors] verificar se /core.png aparece como placeholder.
02743. [BACKEND_API] [cors] verificar se /logo.png está disponível.
02744. [BACKEND_API] [cors] verificar se rotas batem entre front e back.
02745. [BACKEND_API] [cors] verificar se payload esperado bate com payload real.
02746. [BACKEND_API] [cors] verificar se campos do banco batem com model.
02747. [BACKEND_API] [cors] verificar se controller retorna padrão consistente.
02748. [BACKEND_API] [cors] verificar se paginação existe e funciona.
02749. [BACKEND_API] [cors] verificar se filtros podem ser combinados.
02750. [BACKEND_API] [cors] verificar se dados null quebram a tela.
02751. [BACKEND_API] [cors] verificar se array vazio tem estado visual.
02752. [BACKEND_API] [cors] verificar se loading impede tela quebrada.
02753. [BACKEND_API] [cors] verificar se modal fecha corretamente.
02754. [BACKEND_API] [cors] verificar se header não sobrepõe conteúdo.
02755. [BACKEND_API] [cors] verificar se layout é responsivo.
02756. [BACKEND_API] [cors] verificar se contraste é legível.
02757. [BACKEND_API] [cors] verificar se texto é humano e não técnico.
02758. [BACKEND_API] [cors] verificar se existe teste manual possível.
02759. [BACKEND_API] [cors] classificar severidade.
02760. [BACKEND_API] [cors] propor correção com risco estimado.

### BACKEND_API / helmet
02761. [BACKEND_API] [helmet] identificar arquivo responsável.
02762. [BACKEND_API] [helmet] identificar dependências diretas.
02763. [BACKEND_API] [helmet] identificar dependências indiretas.
02764. [BACKEND_API] [helmet] verificar se há código morto.
02765. [BACKEND_API] [helmet] verificar se há import não usado.
02766. [BACKEND_API] [helmet] verificar se há variável indefinida.
02767. [BACKEND_API] [helmet] verificar se há duplicação de lógica.
02768. [BACKEND_API] [helmet] verificar se há comentário desatualizado.
02769. [BACKEND_API] [helmet] verificar se a regra de negócio está clara.
02770. [BACKEND_API] [helmet] verificar se há tratamento de erro.
02771. [BACKEND_API] [helmet] verificar se o erro é amigável para usuário comum.
02772. [BACKEND_API] [helmet] verificar se erro técnico fica apenas no console ou relatório.
02773. [BACKEND_API] [helmet] verificar se há validação de entrada.
02774. [BACKEND_API] [helmet] verificar se há validação de saída.
02775. [BACKEND_API] [helmet] verificar se há validação de permissão.
02776. [BACKEND_API] [helmet] verificar se há risco de acesso indevido.
02777. [BACKEND_API] [helmet] verificar se há risco de dados de outro usuário.
02778. [BACKEND_API] [helmet] verificar se há risco de SQL injection.
02779. [BACKEND_API] [helmet] verificar se há risco de XSS.
02780. [BACKEND_API] [helmet] verificar se há risco de upload inseguro.
02781. [BACKEND_API] [helmet] verificar se imagens têm fallback correto.
02782. [BACKEND_API] [helmet] verificar se /core.png aparece como placeholder.
02783. [BACKEND_API] [helmet] verificar se /logo.png está disponível.
02784. [BACKEND_API] [helmet] verificar se rotas batem entre front e back.
02785. [BACKEND_API] [helmet] verificar se payload esperado bate com payload real.
02786. [BACKEND_API] [helmet] verificar se campos do banco batem com model.
02787. [BACKEND_API] [helmet] verificar se controller retorna padrão consistente.
02788. [BACKEND_API] [helmet] verificar se paginação existe e funciona.
02789. [BACKEND_API] [helmet] verificar se filtros podem ser combinados.
02790. [BACKEND_API] [helmet] verificar se dados null quebram a tela.
02791. [BACKEND_API] [helmet] verificar se array vazio tem estado visual.
02792. [BACKEND_API] [helmet] verificar se loading impede tela quebrada.
02793. [BACKEND_API] [helmet] verificar se modal fecha corretamente.
02794. [BACKEND_API] [helmet] verificar se header não sobrepõe conteúdo.
02795. [BACKEND_API] [helmet] verificar se layout é responsivo.
02796. [BACKEND_API] [helmet] verificar se contraste é legível.
02797. [BACKEND_API] [helmet] verificar se texto é humano e não técnico.
02798. [BACKEND_API] [helmet] verificar se existe teste manual possível.
02799. [BACKEND_API] [helmet] classificar severidade.
02800. [BACKEND_API] [helmet] propor correção com risco estimado.

### BACKEND_API / error handler
02801. [BACKEND_API] [error handler] identificar arquivo responsável.
02802. [BACKEND_API] [error handler] identificar dependências diretas.
02803. [BACKEND_API] [error handler] identificar dependências indiretas.
02804. [BACKEND_API] [error handler] verificar se há código morto.
02805. [BACKEND_API] [error handler] verificar se há import não usado.
02806. [BACKEND_API] [error handler] verificar se há variável indefinida.
02807. [BACKEND_API] [error handler] verificar se há duplicação de lógica.
02808. [BACKEND_API] [error handler] verificar se há comentário desatualizado.
02809. [BACKEND_API] [error handler] verificar se a regra de negócio está clara.
02810. [BACKEND_API] [error handler] verificar se há tratamento de erro.
02811. [BACKEND_API] [error handler] verificar se o erro é amigável para usuário comum.
02812. [BACKEND_API] [error handler] verificar se erro técnico fica apenas no console ou relatório.
02813. [BACKEND_API] [error handler] verificar se há validação de entrada.
02814. [BACKEND_API] [error handler] verificar se há validação de saída.
02815. [BACKEND_API] [error handler] verificar se há validação de permissão.
02816. [BACKEND_API] [error handler] verificar se há risco de acesso indevido.
02817. [BACKEND_API] [error handler] verificar se há risco de dados de outro usuário.
02818. [BACKEND_API] [error handler] verificar se há risco de SQL injection.
02819. [BACKEND_API] [error handler] verificar se há risco de XSS.
02820. [BACKEND_API] [error handler] verificar se há risco de upload inseguro.
02821. [BACKEND_API] [error handler] verificar se imagens têm fallback correto.
02822. [BACKEND_API] [error handler] verificar se /core.png aparece como placeholder.
02823. [BACKEND_API] [error handler] verificar se /logo.png está disponível.
02824. [BACKEND_API] [error handler] verificar se rotas batem entre front e back.
02825. [BACKEND_API] [error handler] verificar se payload esperado bate com payload real.
02826. [BACKEND_API] [error handler] verificar se campos do banco batem com model.
02827. [BACKEND_API] [error handler] verificar se controller retorna padrão consistente.
02828. [BACKEND_API] [error handler] verificar se paginação existe e funciona.
02829. [BACKEND_API] [error handler] verificar se filtros podem ser combinados.
02830. [BACKEND_API] [error handler] verificar se dados null quebram a tela.
02831. [BACKEND_API] [error handler] verificar se array vazio tem estado visual.
02832. [BACKEND_API] [error handler] verificar se loading impede tela quebrada.
02833. [BACKEND_API] [error handler] verificar se modal fecha corretamente.
02834. [BACKEND_API] [error handler] verificar se header não sobrepõe conteúdo.
02835. [BACKEND_API] [error handler] verificar se layout é responsivo.
02836. [BACKEND_API] [error handler] verificar se contraste é legível.
02837. [BACKEND_API] [error handler] verificar se texto é humano e não técnico.
02838. [BACKEND_API] [error handler] verificar se existe teste manual possível.
02839. [BACKEND_API] [error handler] classificar severidade.
02840. [BACKEND_API] [error handler] propor correção com risco estimado.

### BACKEND_API / logs
02841. [BACKEND_API] [logs] identificar arquivo responsável.
02842. [BACKEND_API] [logs] identificar dependências diretas.
02843. [BACKEND_API] [logs] identificar dependências indiretas.
02844. [BACKEND_API] [logs] verificar se há código morto.
02845. [BACKEND_API] [logs] verificar se há import não usado.
02846. [BACKEND_API] [logs] verificar se há variável indefinida.
02847. [BACKEND_API] [logs] verificar se há duplicação de lógica.
02848. [BACKEND_API] [logs] verificar se há comentário desatualizado.
02849. [BACKEND_API] [logs] verificar se a regra de negócio está clara.
02850. [BACKEND_API] [logs] verificar se há tratamento de erro.
02851. [BACKEND_API] [logs] verificar se o erro é amigável para usuário comum.
02852. [BACKEND_API] [logs] verificar se erro técnico fica apenas no console ou relatório.
02853. [BACKEND_API] [logs] verificar se há validação de entrada.
02854. [BACKEND_API] [logs] verificar se há validação de saída.
02855. [BACKEND_API] [logs] verificar se há validação de permissão.
02856. [BACKEND_API] [logs] verificar se há risco de acesso indevido.
02857. [BACKEND_API] [logs] verificar se há risco de dados de outro usuário.
02858. [BACKEND_API] [logs] verificar se há risco de SQL injection.
02859. [BACKEND_API] [logs] verificar se há risco de XSS.
02860. [BACKEND_API] [logs] verificar se há risco de upload inseguro.
02861. [BACKEND_API] [logs] verificar se imagens têm fallback correto.
02862. [BACKEND_API] [logs] verificar se /core.png aparece como placeholder.
02863. [BACKEND_API] [logs] verificar se /logo.png está disponível.
02864. [BACKEND_API] [logs] verificar se rotas batem entre front e back.
02865. [BACKEND_API] [logs] verificar se payload esperado bate com payload real.
02866. [BACKEND_API] [logs] verificar se campos do banco batem com model.
02867. [BACKEND_API] [logs] verificar se controller retorna padrão consistente.
02868. [BACKEND_API] [logs] verificar se paginação existe e funciona.
02869. [BACKEND_API] [logs] verificar se filtros podem ser combinados.
02870. [BACKEND_API] [logs] verificar se dados null quebram a tela.
02871. [BACKEND_API] [logs] verificar se array vazio tem estado visual.
02872. [BACKEND_API] [logs] verificar se loading impede tela quebrada.
02873. [BACKEND_API] [logs] verificar se modal fecha corretamente.
02874. [BACKEND_API] [logs] verificar se header não sobrepõe conteúdo.
02875. [BACKEND_API] [logs] verificar se layout é responsivo.
02876. [BACKEND_API] [logs] verificar se contraste é legível.
02877. [BACKEND_API] [logs] verificar se texto é humano e não técnico.
02878. [BACKEND_API] [logs] verificar se existe teste manual possível.
02879. [BACKEND_API] [logs] classificar severidade.
02880. [BACKEND_API] [logs] propor correção com risco estimado.

---

## 6. Revisão detalhada — BANCO_SCHEMA

### BANCO_SCHEMA / usuarios
02881. [BANCO_SCHEMA] [usuarios] identificar arquivo responsável.
02882. [BANCO_SCHEMA] [usuarios] identificar dependências diretas.
02883. [BANCO_SCHEMA] [usuarios] identificar dependências indiretas.
02884. [BANCO_SCHEMA] [usuarios] verificar se há código morto.
02885. [BANCO_SCHEMA] [usuarios] verificar se há import não usado.
02886. [BANCO_SCHEMA] [usuarios] verificar se há variável indefinida.
02887. [BANCO_SCHEMA] [usuarios] verificar se há duplicação de lógica.
02888. [BANCO_SCHEMA] [usuarios] verificar se há comentário desatualizado.
02889. [BANCO_SCHEMA] [usuarios] verificar se a regra de negócio está clara.
02890. [BANCO_SCHEMA] [usuarios] verificar se há tratamento de erro.
02891. [BANCO_SCHEMA] [usuarios] verificar se o erro é amigável para usuário comum.
02892. [BANCO_SCHEMA] [usuarios] verificar se erro técnico fica apenas no console ou relatório.
02893. [BANCO_SCHEMA] [usuarios] verificar se há validação de entrada.
02894. [BANCO_SCHEMA] [usuarios] verificar se há validação de saída.
02895. [BANCO_SCHEMA] [usuarios] verificar se há validação de permissão.
02896. [BANCO_SCHEMA] [usuarios] verificar se há risco de acesso indevido.
02897. [BANCO_SCHEMA] [usuarios] verificar se há risco de dados de outro usuário.
02898. [BANCO_SCHEMA] [usuarios] verificar se há risco de SQL injection.
02899. [BANCO_SCHEMA] [usuarios] verificar se há risco de XSS.
02900. [BANCO_SCHEMA] [usuarios] verificar se há risco de upload inseguro.
02901. [BANCO_SCHEMA] [usuarios] verificar se imagens têm fallback correto.
02902. [BANCO_SCHEMA] [usuarios] verificar se /core.png aparece como placeholder.
02903. [BANCO_SCHEMA] [usuarios] verificar se /logo.png está disponível.
02904. [BANCO_SCHEMA] [usuarios] verificar se rotas batem entre front e back.
02905. [BANCO_SCHEMA] [usuarios] verificar se payload esperado bate com payload real.
02906. [BANCO_SCHEMA] [usuarios] verificar se campos do banco batem com model.
02907. [BANCO_SCHEMA] [usuarios] verificar se controller retorna padrão consistente.
02908. [BANCO_SCHEMA] [usuarios] verificar se paginação existe e funciona.
02909. [BANCO_SCHEMA] [usuarios] verificar se filtros podem ser combinados.
02910. [BANCO_SCHEMA] [usuarios] verificar se dados null quebram a tela.
02911. [BANCO_SCHEMA] [usuarios] verificar se array vazio tem estado visual.
02912. [BANCO_SCHEMA] [usuarios] verificar se loading impede tela quebrada.
02913. [BANCO_SCHEMA] [usuarios] verificar se modal fecha corretamente.
02914. [BANCO_SCHEMA] [usuarios] verificar se header não sobrepõe conteúdo.
02915. [BANCO_SCHEMA] [usuarios] verificar se layout é responsivo.
02916. [BANCO_SCHEMA] [usuarios] verificar se contraste é legível.
02917. [BANCO_SCHEMA] [usuarios] verificar se texto é humano e não técnico.
02918. [BANCO_SCHEMA] [usuarios] verificar se existe teste manual possível.
02919. [BANCO_SCHEMA] [usuarios] classificar severidade.
02920. [BANCO_SCHEMA] [usuarios] propor correção com risco estimado.

### BANCO_SCHEMA / produtos
02921. [BANCO_SCHEMA] [produtos] identificar arquivo responsável.
02922. [BANCO_SCHEMA] [produtos] identificar dependências diretas.
02923. [BANCO_SCHEMA] [produtos] identificar dependências indiretas.
02924. [BANCO_SCHEMA] [produtos] verificar se há código morto.
02925. [BANCO_SCHEMA] [produtos] verificar se há import não usado.
02926. [BANCO_SCHEMA] [produtos] verificar se há variável indefinida.
02927. [BANCO_SCHEMA] [produtos] verificar se há duplicação de lógica.
02928. [BANCO_SCHEMA] [produtos] verificar se há comentário desatualizado.
02929. [BANCO_SCHEMA] [produtos] verificar se a regra de negócio está clara.
02930. [BANCO_SCHEMA] [produtos] verificar se há tratamento de erro.
02931. [BANCO_SCHEMA] [produtos] verificar se o erro é amigável para usuário comum.
02932. [BANCO_SCHEMA] [produtos] verificar se erro técnico fica apenas no console ou relatório.
02933. [BANCO_SCHEMA] [produtos] verificar se há validação de entrada.
02934. [BANCO_SCHEMA] [produtos] verificar se há validação de saída.
02935. [BANCO_SCHEMA] [produtos] verificar se há validação de permissão.
02936. [BANCO_SCHEMA] [produtos] verificar se há risco de acesso indevido.
02937. [BANCO_SCHEMA] [produtos] verificar se há risco de dados de outro usuário.
02938. [BANCO_SCHEMA] [produtos] verificar se há risco de SQL injection.
02939. [BANCO_SCHEMA] [produtos] verificar se há risco de XSS.
02940. [BANCO_SCHEMA] [produtos] verificar se há risco de upload inseguro.
02941. [BANCO_SCHEMA] [produtos] verificar se imagens têm fallback correto.
02942. [BANCO_SCHEMA] [produtos] verificar se /core.png aparece como placeholder.
02943. [BANCO_SCHEMA] [produtos] verificar se /logo.png está disponível.
02944. [BANCO_SCHEMA] [produtos] verificar se rotas batem entre front e back.
02945. [BANCO_SCHEMA] [produtos] verificar se payload esperado bate com payload real.
02946. [BANCO_SCHEMA] [produtos] verificar se campos do banco batem com model.
02947. [BANCO_SCHEMA] [produtos] verificar se controller retorna padrão consistente.
02948. [BANCO_SCHEMA] [produtos] verificar se paginação existe e funciona.
02949. [BANCO_SCHEMA] [produtos] verificar se filtros podem ser combinados.
02950. [BANCO_SCHEMA] [produtos] verificar se dados null quebram a tela.
02951. [BANCO_SCHEMA] [produtos] verificar se array vazio tem estado visual.
02952. [BANCO_SCHEMA] [produtos] verificar se loading impede tela quebrada.
02953. [BANCO_SCHEMA] [produtos] verificar se modal fecha corretamente.
02954. [BANCO_SCHEMA] [produtos] verificar se header não sobrepõe conteúdo.
02955. [BANCO_SCHEMA] [produtos] verificar se layout é responsivo.
02956. [BANCO_SCHEMA] [produtos] verificar se contraste é legível.
02957. [BANCO_SCHEMA] [produtos] verificar se texto é humano e não técnico.
02958. [BANCO_SCHEMA] [produtos] verificar se existe teste manual possível.
02959. [BANCO_SCHEMA] [produtos] classificar severidade.
02960. [BANCO_SCHEMA] [produtos] propor correção com risco estimado.

### BANCO_SCHEMA / pedidos
02961. [BANCO_SCHEMA] [pedidos] identificar arquivo responsável.
02962. [BANCO_SCHEMA] [pedidos] identificar dependências diretas.
02963. [BANCO_SCHEMA] [pedidos] identificar dependências indiretas.
02964. [BANCO_SCHEMA] [pedidos] verificar se há código morto.
02965. [BANCO_SCHEMA] [pedidos] verificar se há import não usado.
02966. [BANCO_SCHEMA] [pedidos] verificar se há variável indefinida.
02967. [BANCO_SCHEMA] [pedidos] verificar se há duplicação de lógica.
02968. [BANCO_SCHEMA] [pedidos] verificar se há comentário desatualizado.
02969. [BANCO_SCHEMA] [pedidos] verificar se a regra de negócio está clara.
02970. [BANCO_SCHEMA] [pedidos] verificar se há tratamento de erro.
02971. [BANCO_SCHEMA] [pedidos] verificar se o erro é amigável para usuário comum.
02972. [BANCO_SCHEMA] [pedidos] verificar se erro técnico fica apenas no console ou relatório.
02973. [BANCO_SCHEMA] [pedidos] verificar se há validação de entrada.
02974. [BANCO_SCHEMA] [pedidos] verificar se há validação de saída.
02975. [BANCO_SCHEMA] [pedidos] verificar se há validação de permissão.
02976. [BANCO_SCHEMA] [pedidos] verificar se há risco de acesso indevido.
02977. [BANCO_SCHEMA] [pedidos] verificar se há risco de dados de outro usuário.
02978. [BANCO_SCHEMA] [pedidos] verificar se há risco de SQL injection.
02979. [BANCO_SCHEMA] [pedidos] verificar se há risco de XSS.
02980. [BANCO_SCHEMA] [pedidos] verificar se há risco de upload inseguro.
02981. [BANCO_SCHEMA] [pedidos] verificar se imagens têm fallback correto.
02982. [BANCO_SCHEMA] [pedidos] verificar se /core.png aparece como placeholder.
02983. [BANCO_SCHEMA] [pedidos] verificar se /logo.png está disponível.
02984. [BANCO_SCHEMA] [pedidos] verificar se rotas batem entre front e back.
02985. [BANCO_SCHEMA] [pedidos] verificar se payload esperado bate com payload real.
02986. [BANCO_SCHEMA] [pedidos] verificar se campos do banco batem com model.
02987. [BANCO_SCHEMA] [pedidos] verificar se controller retorna padrão consistente.
02988. [BANCO_SCHEMA] [pedidos] verificar se paginação existe e funciona.
02989. [BANCO_SCHEMA] [pedidos] verificar se filtros podem ser combinados.
02990. [BANCO_SCHEMA] [pedidos] verificar se dados null quebram a tela.
02991. [BANCO_SCHEMA] [pedidos] verificar se array vazio tem estado visual.
02992. [BANCO_SCHEMA] [pedidos] verificar se loading impede tela quebrada.
02993. [BANCO_SCHEMA] [pedidos] verificar se modal fecha corretamente.
02994. [BANCO_SCHEMA] [pedidos] verificar se header não sobrepõe conteúdo.
02995. [BANCO_SCHEMA] [pedidos] verificar se layout é responsivo.
02996. [BANCO_SCHEMA] [pedidos] verificar se contraste é legível.
02997. [BANCO_SCHEMA] [pedidos] verificar se texto é humano e não técnico.
02998. [BANCO_SCHEMA] [pedidos] verificar se existe teste manual possível.
02999. [BANCO_SCHEMA] [pedidos] classificar severidade.
03000. [BANCO_SCHEMA] [pedidos] propor correção com risco estimado.

### BANCO_SCHEMA / encomendas
03001. [BANCO_SCHEMA] [encomendas] identificar arquivo responsável.
03002. [BANCO_SCHEMA] [encomendas] identificar dependências diretas.
03003. [BANCO_SCHEMA] [encomendas] identificar dependências indiretas.
03004. [BANCO_SCHEMA] [encomendas] verificar se há código morto.
03005. [BANCO_SCHEMA] [encomendas] verificar se há import não usado.
03006. [BANCO_SCHEMA] [encomendas] verificar se há variável indefinida.
03007. [BANCO_SCHEMA] [encomendas] verificar se há duplicação de lógica.
03008. [BANCO_SCHEMA] [encomendas] verificar se há comentário desatualizado.
03009. [BANCO_SCHEMA] [encomendas] verificar se a regra de negócio está clara.
03010. [BANCO_SCHEMA] [encomendas] verificar se há tratamento de erro.
03011. [BANCO_SCHEMA] [encomendas] verificar se o erro é amigável para usuário comum.
03012. [BANCO_SCHEMA] [encomendas] verificar se erro técnico fica apenas no console ou relatório.
03013. [BANCO_SCHEMA] [encomendas] verificar se há validação de entrada.
03014. [BANCO_SCHEMA] [encomendas] verificar se há validação de saída.
03015. [BANCO_SCHEMA] [encomendas] verificar se há validação de permissão.
03016. [BANCO_SCHEMA] [encomendas] verificar se há risco de acesso indevido.
03017. [BANCO_SCHEMA] [encomendas] verificar se há risco de dados de outro usuário.
03018. [BANCO_SCHEMA] [encomendas] verificar se há risco de SQL injection.
03019. [BANCO_SCHEMA] [encomendas] verificar se há risco de XSS.
03020. [BANCO_SCHEMA] [encomendas] verificar se há risco de upload inseguro.
03021. [BANCO_SCHEMA] [encomendas] verificar se imagens têm fallback correto.
03022. [BANCO_SCHEMA] [encomendas] verificar se /core.png aparece como placeholder.
03023. [BANCO_SCHEMA] [encomendas] verificar se /logo.png está disponível.
03024. [BANCO_SCHEMA] [encomendas] verificar se rotas batem entre front e back.
03025. [BANCO_SCHEMA] [encomendas] verificar se payload esperado bate com payload real.
03026. [BANCO_SCHEMA] [encomendas] verificar se campos do banco batem com model.
03027. [BANCO_SCHEMA] [encomendas] verificar se controller retorna padrão consistente.
03028. [BANCO_SCHEMA] [encomendas] verificar se paginação existe e funciona.
03029. [BANCO_SCHEMA] [encomendas] verificar se filtros podem ser combinados.
03030. [BANCO_SCHEMA] [encomendas] verificar se dados null quebram a tela.
03031. [BANCO_SCHEMA] [encomendas] verificar se array vazio tem estado visual.
03032. [BANCO_SCHEMA] [encomendas] verificar se loading impede tela quebrada.
03033. [BANCO_SCHEMA] [encomendas] verificar se modal fecha corretamente.
03034. [BANCO_SCHEMA] [encomendas] verificar se header não sobrepõe conteúdo.
03035. [BANCO_SCHEMA] [encomendas] verificar se layout é responsivo.
03036. [BANCO_SCHEMA] [encomendas] verificar se contraste é legível.
03037. [BANCO_SCHEMA] [encomendas] verificar se texto é humano e não técnico.
03038. [BANCO_SCHEMA] [encomendas] verificar se existe teste manual possível.
03039. [BANCO_SCHEMA] [encomendas] classificar severidade.
03040. [BANCO_SCHEMA] [encomendas] propor correção com risco estimado.

### BANCO_SCHEMA / orcamentos
03041. [BANCO_SCHEMA] [orcamentos] identificar arquivo responsável.
03042. [BANCO_SCHEMA] [orcamentos] identificar dependências diretas.
03043. [BANCO_SCHEMA] [orcamentos] identificar dependências indiretas.
03044. [BANCO_SCHEMA] [orcamentos] verificar se há código morto.
03045. [BANCO_SCHEMA] [orcamentos] verificar se há import não usado.
03046. [BANCO_SCHEMA] [orcamentos] verificar se há variável indefinida.
03047. [BANCO_SCHEMA] [orcamentos] verificar se há duplicação de lógica.
03048. [BANCO_SCHEMA] [orcamentos] verificar se há comentário desatualizado.
03049. [BANCO_SCHEMA] [orcamentos] verificar se a regra de negócio está clara.
03050. [BANCO_SCHEMA] [orcamentos] verificar se há tratamento de erro.
03051. [BANCO_SCHEMA] [orcamentos] verificar se o erro é amigável para usuário comum.
03052. [BANCO_SCHEMA] [orcamentos] verificar se erro técnico fica apenas no console ou relatório.
03053. [BANCO_SCHEMA] [orcamentos] verificar se há validação de entrada.
03054. [BANCO_SCHEMA] [orcamentos] verificar se há validação de saída.
03055. [BANCO_SCHEMA] [orcamentos] verificar se há validação de permissão.
03056. [BANCO_SCHEMA] [orcamentos] verificar se há risco de acesso indevido.
03057. [BANCO_SCHEMA] [orcamentos] verificar se há risco de dados de outro usuário.
03058. [BANCO_SCHEMA] [orcamentos] verificar se há risco de SQL injection.
03059. [BANCO_SCHEMA] [orcamentos] verificar se há risco de XSS.
03060. [BANCO_SCHEMA] [orcamentos] verificar se há risco de upload inseguro.
03061. [BANCO_SCHEMA] [orcamentos] verificar se imagens têm fallback correto.
03062. [BANCO_SCHEMA] [orcamentos] verificar se /core.png aparece como placeholder.
03063. [BANCO_SCHEMA] [orcamentos] verificar se /logo.png está disponível.
03064. [BANCO_SCHEMA] [orcamentos] verificar se rotas batem entre front e back.
03065. [BANCO_SCHEMA] [orcamentos] verificar se payload esperado bate com payload real.
03066. [BANCO_SCHEMA] [orcamentos] verificar se campos do banco batem com model.
03067. [BANCO_SCHEMA] [orcamentos] verificar se controller retorna padrão consistente.
03068. [BANCO_SCHEMA] [orcamentos] verificar se paginação existe e funciona.
03069. [BANCO_SCHEMA] [orcamentos] verificar se filtros podem ser combinados.
03070. [BANCO_SCHEMA] [orcamentos] verificar se dados null quebram a tela.
03071. [BANCO_SCHEMA] [orcamentos] verificar se array vazio tem estado visual.
03072. [BANCO_SCHEMA] [orcamentos] verificar se loading impede tela quebrada.
03073. [BANCO_SCHEMA] [orcamentos] verificar se modal fecha corretamente.
03074. [BANCO_SCHEMA] [orcamentos] verificar se header não sobrepõe conteúdo.
03075. [BANCO_SCHEMA] [orcamentos] verificar se layout é responsivo.
03076. [BANCO_SCHEMA] [orcamentos] verificar se contraste é legível.
03077. [BANCO_SCHEMA] [orcamentos] verificar se texto é humano e não técnico.
03078. [BANCO_SCHEMA] [orcamentos] verificar se existe teste manual possível.
03079. [BANCO_SCHEMA] [orcamentos] classificar severidade.
03080. [BANCO_SCHEMA] [orcamentos] propor correção com risco estimado.

### BANCO_SCHEMA / logistica
03081. [BANCO_SCHEMA] [logistica] identificar arquivo responsável.
03082. [BANCO_SCHEMA] [logistica] identificar dependências diretas.
03083. [BANCO_SCHEMA] [logistica] identificar dependências indiretas.
03084. [BANCO_SCHEMA] [logistica] verificar se há código morto.
03085. [BANCO_SCHEMA] [logistica] verificar se há import não usado.
03086. [BANCO_SCHEMA] [logistica] verificar se há variável indefinida.
03087. [BANCO_SCHEMA] [logistica] verificar se há duplicação de lógica.
03088. [BANCO_SCHEMA] [logistica] verificar se há comentário desatualizado.
03089. [BANCO_SCHEMA] [logistica] verificar se a regra de negócio está clara.
03090. [BANCO_SCHEMA] [logistica] verificar se há tratamento de erro.
03091. [BANCO_SCHEMA] [logistica] verificar se o erro é amigável para usuário comum.
03092. [BANCO_SCHEMA] [logistica] verificar se erro técnico fica apenas no console ou relatório.
03093. [BANCO_SCHEMA] [logistica] verificar se há validação de entrada.
03094. [BANCO_SCHEMA] [logistica] verificar se há validação de saída.
03095. [BANCO_SCHEMA] [logistica] verificar se há validação de permissão.
03096. [BANCO_SCHEMA] [logistica] verificar se há risco de acesso indevido.
03097. [BANCO_SCHEMA] [logistica] verificar se há risco de dados de outro usuário.
03098. [BANCO_SCHEMA] [logistica] verificar se há risco de SQL injection.
03099. [BANCO_SCHEMA] [logistica] verificar se há risco de XSS.
03100. [BANCO_SCHEMA] [logistica] verificar se há risco de upload inseguro.
03101. [BANCO_SCHEMA] [logistica] verificar se imagens têm fallback correto.
03102. [BANCO_SCHEMA] [logistica] verificar se /core.png aparece como placeholder.
03103. [BANCO_SCHEMA] [logistica] verificar se /logo.png está disponível.
03104. [BANCO_SCHEMA] [logistica] verificar se rotas batem entre front e back.
03105. [BANCO_SCHEMA] [logistica] verificar se payload esperado bate com payload real.
03106. [BANCO_SCHEMA] [logistica] verificar se campos do banco batem com model.
03107. [BANCO_SCHEMA] [logistica] verificar se controller retorna padrão consistente.
03108. [BANCO_SCHEMA] [logistica] verificar se paginação existe e funciona.
03109. [BANCO_SCHEMA] [logistica] verificar se filtros podem ser combinados.
03110. [BANCO_SCHEMA] [logistica] verificar se dados null quebram a tela.
03111. [BANCO_SCHEMA] [logistica] verificar se array vazio tem estado visual.
03112. [BANCO_SCHEMA] [logistica] verificar se loading impede tela quebrada.
03113. [BANCO_SCHEMA] [logistica] verificar se modal fecha corretamente.
03114. [BANCO_SCHEMA] [logistica] verificar se header não sobrepõe conteúdo.
03115. [BANCO_SCHEMA] [logistica] verificar se layout é responsivo.
03116. [BANCO_SCHEMA] [logistica] verificar se contraste é legível.
03117. [BANCO_SCHEMA] [logistica] verificar se texto é humano e não técnico.
03118. [BANCO_SCHEMA] [logistica] verificar se existe teste manual possível.
03119. [BANCO_SCHEMA] [logistica] classificar severidade.
03120. [BANCO_SCHEMA] [logistica] propor correção com risco estimado.

### BANCO_SCHEMA / suporte_tickets
03121. [BANCO_SCHEMA] [suporte_tickets] identificar arquivo responsável.
03122. [BANCO_SCHEMA] [suporte_tickets] identificar dependências diretas.
03123. [BANCO_SCHEMA] [suporte_tickets] identificar dependências indiretas.
03124. [BANCO_SCHEMA] [suporte_tickets] verificar se há código morto.
03125. [BANCO_SCHEMA] [suporte_tickets] verificar se há import não usado.
03126. [BANCO_SCHEMA] [suporte_tickets] verificar se há variável indefinida.
03127. [BANCO_SCHEMA] [suporte_tickets] verificar se há duplicação de lógica.
03128. [BANCO_SCHEMA] [suporte_tickets] verificar se há comentário desatualizado.
03129. [BANCO_SCHEMA] [suporte_tickets] verificar se a regra de negócio está clara.
03130. [BANCO_SCHEMA] [suporte_tickets] verificar se há tratamento de erro.
03131. [BANCO_SCHEMA] [suporte_tickets] verificar se o erro é amigável para usuário comum.
03132. [BANCO_SCHEMA] [suporte_tickets] verificar se erro técnico fica apenas no console ou relatório.
03133. [BANCO_SCHEMA] [suporte_tickets] verificar se há validação de entrada.
03134. [BANCO_SCHEMA] [suporte_tickets] verificar se há validação de saída.
03135. [BANCO_SCHEMA] [suporte_tickets] verificar se há validação de permissão.
03136. [BANCO_SCHEMA] [suporte_tickets] verificar se há risco de acesso indevido.
03137. [BANCO_SCHEMA] [suporte_tickets] verificar se há risco de dados de outro usuário.
03138. [BANCO_SCHEMA] [suporte_tickets] verificar se há risco de SQL injection.
03139. [BANCO_SCHEMA] [suporte_tickets] verificar se há risco de XSS.
03140. [BANCO_SCHEMA] [suporte_tickets] verificar se há risco de upload inseguro.
03141. [BANCO_SCHEMA] [suporte_tickets] verificar se imagens têm fallback correto.
03142. [BANCO_SCHEMA] [suporte_tickets] verificar se /core.png aparece como placeholder.
03143. [BANCO_SCHEMA] [suporte_tickets] verificar se /logo.png está disponível.
03144. [BANCO_SCHEMA] [suporte_tickets] verificar se rotas batem entre front e back.
03145. [BANCO_SCHEMA] [suporte_tickets] verificar se payload esperado bate com payload real.
03146. [BANCO_SCHEMA] [suporte_tickets] verificar se campos do banco batem com model.
03147. [BANCO_SCHEMA] [suporte_tickets] verificar se controller retorna padrão consistente.
03148. [BANCO_SCHEMA] [suporte_tickets] verificar se paginação existe e funciona.
03149. [BANCO_SCHEMA] [suporte_tickets] verificar se filtros podem ser combinados.
03150. [BANCO_SCHEMA] [suporte_tickets] verificar se dados null quebram a tela.
03151. [BANCO_SCHEMA] [suporte_tickets] verificar se array vazio tem estado visual.
03152. [BANCO_SCHEMA] [suporte_tickets] verificar se loading impede tela quebrada.
03153. [BANCO_SCHEMA] [suporte_tickets] verificar se modal fecha corretamente.
03154. [BANCO_SCHEMA] [suporte_tickets] verificar se header não sobrepõe conteúdo.
03155. [BANCO_SCHEMA] [suporte_tickets] verificar se layout é responsivo.
03156. [BANCO_SCHEMA] [suporte_tickets] verificar se contraste é legível.
03157. [BANCO_SCHEMA] [suporte_tickets] verificar se texto é humano e não técnico.
03158. [BANCO_SCHEMA] [suporte_tickets] verificar se existe teste manual possível.
03159. [BANCO_SCHEMA] [suporte_tickets] classificar severidade.
03160. [BANCO_SCHEMA] [suporte_tickets] propor correção com risco estimado.

### BANCO_SCHEMA / suporte_mensagens
03161. [BANCO_SCHEMA] [suporte_mensagens] identificar arquivo responsável.
03162. [BANCO_SCHEMA] [suporte_mensagens] identificar dependências diretas.
03163. [BANCO_SCHEMA] [suporte_mensagens] identificar dependências indiretas.
03164. [BANCO_SCHEMA] [suporte_mensagens] verificar se há código morto.
03165. [BANCO_SCHEMA] [suporte_mensagens] verificar se há import não usado.
03166. [BANCO_SCHEMA] [suporte_mensagens] verificar se há variável indefinida.
03167. [BANCO_SCHEMA] [suporte_mensagens] verificar se há duplicação de lógica.
03168. [BANCO_SCHEMA] [suporte_mensagens] verificar se há comentário desatualizado.
03169. [BANCO_SCHEMA] [suporte_mensagens] verificar se a regra de negócio está clara.
03170. [BANCO_SCHEMA] [suporte_mensagens] verificar se há tratamento de erro.
03171. [BANCO_SCHEMA] [suporte_mensagens] verificar se o erro é amigável para usuário comum.
03172. [BANCO_SCHEMA] [suporte_mensagens] verificar se erro técnico fica apenas no console ou relatório.
03173. [BANCO_SCHEMA] [suporte_mensagens] verificar se há validação de entrada.
03174. [BANCO_SCHEMA] [suporte_mensagens] verificar se há validação de saída.
03175. [BANCO_SCHEMA] [suporte_mensagens] verificar se há validação de permissão.
03176. [BANCO_SCHEMA] [suporte_mensagens] verificar se há risco de acesso indevido.
03177. [BANCO_SCHEMA] [suporte_mensagens] verificar se há risco de dados de outro usuário.
03178. [BANCO_SCHEMA] [suporte_mensagens] verificar se há risco de SQL injection.
03179. [BANCO_SCHEMA] [suporte_mensagens] verificar se há risco de XSS.
03180. [BANCO_SCHEMA] [suporte_mensagens] verificar se há risco de upload inseguro.
03181. [BANCO_SCHEMA] [suporte_mensagens] verificar se imagens têm fallback correto.
03182. [BANCO_SCHEMA] [suporte_mensagens] verificar se /core.png aparece como placeholder.
03183. [BANCO_SCHEMA] [suporte_mensagens] verificar se /logo.png está disponível.
03184. [BANCO_SCHEMA] [suporte_mensagens] verificar se rotas batem entre front e back.
03185. [BANCO_SCHEMA] [suporte_mensagens] verificar se payload esperado bate com payload real.
03186. [BANCO_SCHEMA] [suporte_mensagens] verificar se campos do banco batem com model.
03187. [BANCO_SCHEMA] [suporte_mensagens] verificar se controller retorna padrão consistente.
03188. [BANCO_SCHEMA] [suporte_mensagens] verificar se paginação existe e funciona.
03189. [BANCO_SCHEMA] [suporte_mensagens] verificar se filtros podem ser combinados.
03190. [BANCO_SCHEMA] [suporte_mensagens] verificar se dados null quebram a tela.
03191. [BANCO_SCHEMA] [suporte_mensagens] verificar se array vazio tem estado visual.
03192. [BANCO_SCHEMA] [suporte_mensagens] verificar se loading impede tela quebrada.
03193. [BANCO_SCHEMA] [suporte_mensagens] verificar se modal fecha corretamente.
03194. [BANCO_SCHEMA] [suporte_mensagens] verificar se header não sobrepõe conteúdo.
03195. [BANCO_SCHEMA] [suporte_mensagens] verificar se layout é responsivo.
03196. [BANCO_SCHEMA] [suporte_mensagens] verificar se contraste é legível.
03197. [BANCO_SCHEMA] [suporte_mensagens] verificar se texto é humano e não técnico.
03198. [BANCO_SCHEMA] [suporte_mensagens] verificar se existe teste manual possível.
03199. [BANCO_SCHEMA] [suporte_mensagens] classificar severidade.
03200. [BANCO_SCHEMA] [suporte_mensagens] propor correção com risco estimado.

### BANCO_SCHEMA / notificacoes
03201. [BANCO_SCHEMA] [notificacoes] identificar arquivo responsável.
03202. [BANCO_SCHEMA] [notificacoes] identificar dependências diretas.
03203. [BANCO_SCHEMA] [notificacoes] identificar dependências indiretas.
03204. [BANCO_SCHEMA] [notificacoes] verificar se há código morto.
03205. [BANCO_SCHEMA] [notificacoes] verificar se há import não usado.
03206. [BANCO_SCHEMA] [notificacoes] verificar se há variável indefinida.
03207. [BANCO_SCHEMA] [notificacoes] verificar se há duplicação de lógica.
03208. [BANCO_SCHEMA] [notificacoes] verificar se há comentário desatualizado.
03209. [BANCO_SCHEMA] [notificacoes] verificar se a regra de negócio está clara.
03210. [BANCO_SCHEMA] [notificacoes] verificar se há tratamento de erro.
03211. [BANCO_SCHEMA] [notificacoes] verificar se o erro é amigável para usuário comum.
03212. [BANCO_SCHEMA] [notificacoes] verificar se erro técnico fica apenas no console ou relatório.
03213. [BANCO_SCHEMA] [notificacoes] verificar se há validação de entrada.
03214. [BANCO_SCHEMA] [notificacoes] verificar se há validação de saída.
03215. [BANCO_SCHEMA] [notificacoes] verificar se há validação de permissão.
03216. [BANCO_SCHEMA] [notificacoes] verificar se há risco de acesso indevido.
03217. [BANCO_SCHEMA] [notificacoes] verificar se há risco de dados de outro usuário.
03218. [BANCO_SCHEMA] [notificacoes] verificar se há risco de SQL injection.
03219. [BANCO_SCHEMA] [notificacoes] verificar se há risco de XSS.
03220. [BANCO_SCHEMA] [notificacoes] verificar se há risco de upload inseguro.
03221. [BANCO_SCHEMA] [notificacoes] verificar se imagens têm fallback correto.
03222. [BANCO_SCHEMA] [notificacoes] verificar se /core.png aparece como placeholder.
03223. [BANCO_SCHEMA] [notificacoes] verificar se /logo.png está disponível.
03224. [BANCO_SCHEMA] [notificacoes] verificar se rotas batem entre front e back.
03225. [BANCO_SCHEMA] [notificacoes] verificar se payload esperado bate com payload real.
03226. [BANCO_SCHEMA] [notificacoes] verificar se campos do banco batem com model.
03227. [BANCO_SCHEMA] [notificacoes] verificar se controller retorna padrão consistente.
03228. [BANCO_SCHEMA] [notificacoes] verificar se paginação existe e funciona.
03229. [BANCO_SCHEMA] [notificacoes] verificar se filtros podem ser combinados.
03230. [BANCO_SCHEMA] [notificacoes] verificar se dados null quebram a tela.
03231. [BANCO_SCHEMA] [notificacoes] verificar se array vazio tem estado visual.
03232. [BANCO_SCHEMA] [notificacoes] verificar se loading impede tela quebrada.
03233. [BANCO_SCHEMA] [notificacoes] verificar se modal fecha corretamente.
03234. [BANCO_SCHEMA] [notificacoes] verificar se header não sobrepõe conteúdo.
03235. [BANCO_SCHEMA] [notificacoes] verificar se layout é responsivo.
03236. [BANCO_SCHEMA] [notificacoes] verificar se contraste é legível.
03237. [BANCO_SCHEMA] [notificacoes] verificar se texto é humano e não técnico.
03238. [BANCO_SCHEMA] [notificacoes] verificar se existe teste manual possível.
03239. [BANCO_SCHEMA] [notificacoes] classificar severidade.
03240. [BANCO_SCHEMA] [notificacoes] propor correção com risco estimado.

### BANCO_SCHEMA / relacionamentos
03241. [BANCO_SCHEMA] [relacionamentos] identificar arquivo responsável.
03242. [BANCO_SCHEMA] [relacionamentos] identificar dependências diretas.
03243. [BANCO_SCHEMA] [relacionamentos] identificar dependências indiretas.
03244. [BANCO_SCHEMA] [relacionamentos] verificar se há código morto.
03245. [BANCO_SCHEMA] [relacionamentos] verificar se há import não usado.
03246. [BANCO_SCHEMA] [relacionamentos] verificar se há variável indefinida.
03247. [BANCO_SCHEMA] [relacionamentos] verificar se há duplicação de lógica.
03248. [BANCO_SCHEMA] [relacionamentos] verificar se há comentário desatualizado.
03249. [BANCO_SCHEMA] [relacionamentos] verificar se a regra de negócio está clara.
03250. [BANCO_SCHEMA] [relacionamentos] verificar se há tratamento de erro.
03251. [BANCO_SCHEMA] [relacionamentos] verificar se o erro é amigável para usuário comum.
03252. [BANCO_SCHEMA] [relacionamentos] verificar se erro técnico fica apenas no console ou relatório.
03253. [BANCO_SCHEMA] [relacionamentos] verificar se há validação de entrada.
03254. [BANCO_SCHEMA] [relacionamentos] verificar se há validação de saída.
03255. [BANCO_SCHEMA] [relacionamentos] verificar se há validação de permissão.
03256. [BANCO_SCHEMA] [relacionamentos] verificar se há risco de acesso indevido.
03257. [BANCO_SCHEMA] [relacionamentos] verificar se há risco de dados de outro usuário.
03258. [BANCO_SCHEMA] [relacionamentos] verificar se há risco de SQL injection.
03259. [BANCO_SCHEMA] [relacionamentos] verificar se há risco de XSS.
03260. [BANCO_SCHEMA] [relacionamentos] verificar se há risco de upload inseguro.
03261. [BANCO_SCHEMA] [relacionamentos] verificar se imagens têm fallback correto.
03262. [BANCO_SCHEMA] [relacionamentos] verificar se /core.png aparece como placeholder.
03263. [BANCO_SCHEMA] [relacionamentos] verificar se /logo.png está disponível.
03264. [BANCO_SCHEMA] [relacionamentos] verificar se rotas batem entre front e back.
03265. [BANCO_SCHEMA] [relacionamentos] verificar se payload esperado bate com payload real.
03266. [BANCO_SCHEMA] [relacionamentos] verificar se campos do banco batem com model.
03267. [BANCO_SCHEMA] [relacionamentos] verificar se controller retorna padrão consistente.
03268. [BANCO_SCHEMA] [relacionamentos] verificar se paginação existe e funciona.
03269. [BANCO_SCHEMA] [relacionamentos] verificar se filtros podem ser combinados.
03270. [BANCO_SCHEMA] [relacionamentos] verificar se dados null quebram a tela.
03271. [BANCO_SCHEMA] [relacionamentos] verificar se array vazio tem estado visual.
03272. [BANCO_SCHEMA] [relacionamentos] verificar se loading impede tela quebrada.
03273. [BANCO_SCHEMA] [relacionamentos] verificar se modal fecha corretamente.
03274. [BANCO_SCHEMA] [relacionamentos] verificar se header não sobrepõe conteúdo.
03275. [BANCO_SCHEMA] [relacionamentos] verificar se layout é responsivo.
03276. [BANCO_SCHEMA] [relacionamentos] verificar se contraste é legível.
03277. [BANCO_SCHEMA] [relacionamentos] verificar se texto é humano e não técnico.
03278. [BANCO_SCHEMA] [relacionamentos] verificar se existe teste manual possível.
03279. [BANCO_SCHEMA] [relacionamentos] classificar severidade.
03280. [BANCO_SCHEMA] [relacionamentos] propor correção com risco estimado.

### BANCO_SCHEMA / chaves primárias
03281. [BANCO_SCHEMA] [chaves primárias] identificar arquivo responsável.
03282. [BANCO_SCHEMA] [chaves primárias] identificar dependências diretas.
03283. [BANCO_SCHEMA] [chaves primárias] identificar dependências indiretas.
03284. [BANCO_SCHEMA] [chaves primárias] verificar se há código morto.
03285. [BANCO_SCHEMA] [chaves primárias] verificar se há import não usado.
03286. [BANCO_SCHEMA] [chaves primárias] verificar se há variável indefinida.
03287. [BANCO_SCHEMA] [chaves primárias] verificar se há duplicação de lógica.
03288. [BANCO_SCHEMA] [chaves primárias] verificar se há comentário desatualizado.
03289. [BANCO_SCHEMA] [chaves primárias] verificar se a regra de negócio está clara.
03290. [BANCO_SCHEMA] [chaves primárias] verificar se há tratamento de erro.
03291. [BANCO_SCHEMA] [chaves primárias] verificar se o erro é amigável para usuário comum.
03292. [BANCO_SCHEMA] [chaves primárias] verificar se erro técnico fica apenas no console ou relatório.
03293. [BANCO_SCHEMA] [chaves primárias] verificar se há validação de entrada.
03294. [BANCO_SCHEMA] [chaves primárias] verificar se há validação de saída.
03295. [BANCO_SCHEMA] [chaves primárias] verificar se há validação de permissão.
03296. [BANCO_SCHEMA] [chaves primárias] verificar se há risco de acesso indevido.
03297. [BANCO_SCHEMA] [chaves primárias] verificar se há risco de dados de outro usuário.
03298. [BANCO_SCHEMA] [chaves primárias] verificar se há risco de SQL injection.
03299. [BANCO_SCHEMA] [chaves primárias] verificar se há risco de XSS.
03300. [BANCO_SCHEMA] [chaves primárias] verificar se há risco de upload inseguro.
03301. [BANCO_SCHEMA] [chaves primárias] verificar se imagens têm fallback correto.
03302. [BANCO_SCHEMA] [chaves primárias] verificar se /core.png aparece como placeholder.
03303. [BANCO_SCHEMA] [chaves primárias] verificar se /logo.png está disponível.
03304. [BANCO_SCHEMA] [chaves primárias] verificar se rotas batem entre front e back.
03305. [BANCO_SCHEMA] [chaves primárias] verificar se payload esperado bate com payload real.
03306. [BANCO_SCHEMA] [chaves primárias] verificar se campos do banco batem com model.
03307. [BANCO_SCHEMA] [chaves primárias] verificar se controller retorna padrão consistente.
03308. [BANCO_SCHEMA] [chaves primárias] verificar se paginação existe e funciona.
03309. [BANCO_SCHEMA] [chaves primárias] verificar se filtros podem ser combinados.
03310. [BANCO_SCHEMA] [chaves primárias] verificar se dados null quebram a tela.
03311. [BANCO_SCHEMA] [chaves primárias] verificar se array vazio tem estado visual.
03312. [BANCO_SCHEMA] [chaves primárias] verificar se loading impede tela quebrada.
03313. [BANCO_SCHEMA] [chaves primárias] verificar se modal fecha corretamente.
03314. [BANCO_SCHEMA] [chaves primárias] verificar se header não sobrepõe conteúdo.
03315. [BANCO_SCHEMA] [chaves primárias] verificar se layout é responsivo.
03316. [BANCO_SCHEMA] [chaves primárias] verificar se contraste é legível.
03317. [BANCO_SCHEMA] [chaves primárias] verificar se texto é humano e não técnico.
03318. [BANCO_SCHEMA] [chaves primárias] verificar se existe teste manual possível.
03319. [BANCO_SCHEMA] [chaves primárias] classificar severidade.
03320. [BANCO_SCHEMA] [chaves primárias] propor correção com risco estimado.

### BANCO_SCHEMA / chaves estrangeiras
03321. [BANCO_SCHEMA] [chaves estrangeiras] identificar arquivo responsável.
03322. [BANCO_SCHEMA] [chaves estrangeiras] identificar dependências diretas.
03323. [BANCO_SCHEMA] [chaves estrangeiras] identificar dependências indiretas.
03324. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há código morto.
03325. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há import não usado.
03326. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há variável indefinida.
03327. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há duplicação de lógica.
03328. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há comentário desatualizado.
03329. [BANCO_SCHEMA] [chaves estrangeiras] verificar se a regra de negócio está clara.
03330. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há tratamento de erro.
03331. [BANCO_SCHEMA] [chaves estrangeiras] verificar se o erro é amigável para usuário comum.
03332. [BANCO_SCHEMA] [chaves estrangeiras] verificar se erro técnico fica apenas no console ou relatório.
03333. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há validação de entrada.
03334. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há validação de saída.
03335. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há validação de permissão.
03336. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há risco de acesso indevido.
03337. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há risco de dados de outro usuário.
03338. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há risco de SQL injection.
03339. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há risco de XSS.
03340. [BANCO_SCHEMA] [chaves estrangeiras] verificar se há risco de upload inseguro.
03341. [BANCO_SCHEMA] [chaves estrangeiras] verificar se imagens têm fallback correto.
03342. [BANCO_SCHEMA] [chaves estrangeiras] verificar se /core.png aparece como placeholder.
03343. [BANCO_SCHEMA] [chaves estrangeiras] verificar se /logo.png está disponível.
03344. [BANCO_SCHEMA] [chaves estrangeiras] verificar se rotas batem entre front e back.
03345. [BANCO_SCHEMA] [chaves estrangeiras] verificar se payload esperado bate com payload real.
03346. [BANCO_SCHEMA] [chaves estrangeiras] verificar se campos do banco batem com model.
03347. [BANCO_SCHEMA] [chaves estrangeiras] verificar se controller retorna padrão consistente.
03348. [BANCO_SCHEMA] [chaves estrangeiras] verificar se paginação existe e funciona.
03349. [BANCO_SCHEMA] [chaves estrangeiras] verificar se filtros podem ser combinados.
03350. [BANCO_SCHEMA] [chaves estrangeiras] verificar se dados null quebram a tela.
03351. [BANCO_SCHEMA] [chaves estrangeiras] verificar se array vazio tem estado visual.
03352. [BANCO_SCHEMA] [chaves estrangeiras] verificar se loading impede tela quebrada.
03353. [BANCO_SCHEMA] [chaves estrangeiras] verificar se modal fecha corretamente.
03354. [BANCO_SCHEMA] [chaves estrangeiras] verificar se header não sobrepõe conteúdo.
03355. [BANCO_SCHEMA] [chaves estrangeiras] verificar se layout é responsivo.
03356. [BANCO_SCHEMA] [chaves estrangeiras] verificar se contraste é legível.
03357. [BANCO_SCHEMA] [chaves estrangeiras] verificar se texto é humano e não técnico.
03358. [BANCO_SCHEMA] [chaves estrangeiras] verificar se existe teste manual possível.
03359. [BANCO_SCHEMA] [chaves estrangeiras] classificar severidade.
03360. [BANCO_SCHEMA] [chaves estrangeiras] propor correção com risco estimado.

### BANCO_SCHEMA / índices
03361. [BANCO_SCHEMA] [índices] identificar arquivo responsável.
03362. [BANCO_SCHEMA] [índices] identificar dependências diretas.
03363. [BANCO_SCHEMA] [índices] identificar dependências indiretas.
03364. [BANCO_SCHEMA] [índices] verificar se há código morto.
03365. [BANCO_SCHEMA] [índices] verificar se há import não usado.
03366. [BANCO_SCHEMA] [índices] verificar se há variável indefinida.
03367. [BANCO_SCHEMA] [índices] verificar se há duplicação de lógica.
03368. [BANCO_SCHEMA] [índices] verificar se há comentário desatualizado.
03369. [BANCO_SCHEMA] [índices] verificar se a regra de negócio está clara.
03370. [BANCO_SCHEMA] [índices] verificar se há tratamento de erro.
03371. [BANCO_SCHEMA] [índices] verificar se o erro é amigável para usuário comum.
03372. [BANCO_SCHEMA] [índices] verificar se erro técnico fica apenas no console ou relatório.
03373. [BANCO_SCHEMA] [índices] verificar se há validação de entrada.
03374. [BANCO_SCHEMA] [índices] verificar se há validação de saída.
03375. [BANCO_SCHEMA] [índices] verificar se há validação de permissão.
03376. [BANCO_SCHEMA] [índices] verificar se há risco de acesso indevido.
03377. [BANCO_SCHEMA] [índices] verificar se há risco de dados de outro usuário.
03378. [BANCO_SCHEMA] [índices] verificar se há risco de SQL injection.
03379. [BANCO_SCHEMA] [índices] verificar se há risco de XSS.
03380. [BANCO_SCHEMA] [índices] verificar se há risco de upload inseguro.
03381. [BANCO_SCHEMA] [índices] verificar se imagens têm fallback correto.
03382. [BANCO_SCHEMA] [índices] verificar se /core.png aparece como placeholder.
03383. [BANCO_SCHEMA] [índices] verificar se /logo.png está disponível.
03384. [BANCO_SCHEMA] [índices] verificar se rotas batem entre front e back.
03385. [BANCO_SCHEMA] [índices] verificar se payload esperado bate com payload real.
03386. [BANCO_SCHEMA] [índices] verificar se campos do banco batem com model.
03387. [BANCO_SCHEMA] [índices] verificar se controller retorna padrão consistente.
03388. [BANCO_SCHEMA] [índices] verificar se paginação existe e funciona.
03389. [BANCO_SCHEMA] [índices] verificar se filtros podem ser combinados.
03390. [BANCO_SCHEMA] [índices] verificar se dados null quebram a tela.
03391. [BANCO_SCHEMA] [índices] verificar se array vazio tem estado visual.
03392. [BANCO_SCHEMA] [índices] verificar se loading impede tela quebrada.
03393. [BANCO_SCHEMA] [índices] verificar se modal fecha corretamente.
03394. [BANCO_SCHEMA] [índices] verificar se header não sobrepõe conteúdo.
03395. [BANCO_SCHEMA] [índices] verificar se layout é responsivo.
03396. [BANCO_SCHEMA] [índices] verificar se contraste é legível.
03397. [BANCO_SCHEMA] [índices] verificar se texto é humano e não técnico.
03398. [BANCO_SCHEMA] [índices] verificar se existe teste manual possível.
03399. [BANCO_SCHEMA] [índices] classificar severidade.
03400. [BANCO_SCHEMA] [índices] propor correção com risco estimado.

### BANCO_SCHEMA / enums
03401. [BANCO_SCHEMA] [enums] identificar arquivo responsável.
03402. [BANCO_SCHEMA] [enums] identificar dependências diretas.
03403. [BANCO_SCHEMA] [enums] identificar dependências indiretas.
03404. [BANCO_SCHEMA] [enums] verificar se há código morto.
03405. [BANCO_SCHEMA] [enums] verificar se há import não usado.
03406. [BANCO_SCHEMA] [enums] verificar se há variável indefinida.
03407. [BANCO_SCHEMA] [enums] verificar se há duplicação de lógica.
03408. [BANCO_SCHEMA] [enums] verificar se há comentário desatualizado.
03409. [BANCO_SCHEMA] [enums] verificar se a regra de negócio está clara.
03410. [BANCO_SCHEMA] [enums] verificar se há tratamento de erro.
03411. [BANCO_SCHEMA] [enums] verificar se o erro é amigável para usuário comum.
03412. [BANCO_SCHEMA] [enums] verificar se erro técnico fica apenas no console ou relatório.
03413. [BANCO_SCHEMA] [enums] verificar se há validação de entrada.
03414. [BANCO_SCHEMA] [enums] verificar se há validação de saída.
03415. [BANCO_SCHEMA] [enums] verificar se há validação de permissão.
03416. [BANCO_SCHEMA] [enums] verificar se há risco de acesso indevido.
03417. [BANCO_SCHEMA] [enums] verificar se há risco de dados de outro usuário.
03418. [BANCO_SCHEMA] [enums] verificar se há risco de SQL injection.
03419. [BANCO_SCHEMA] [enums] verificar se há risco de XSS.
03420. [BANCO_SCHEMA] [enums] verificar se há risco de upload inseguro.
03421. [BANCO_SCHEMA] [enums] verificar se imagens têm fallback correto.
03422. [BANCO_SCHEMA] [enums] verificar se /core.png aparece como placeholder.
03423. [BANCO_SCHEMA] [enums] verificar se /logo.png está disponível.
03424. [BANCO_SCHEMA] [enums] verificar se rotas batem entre front e back.
03425. [BANCO_SCHEMA] [enums] verificar se payload esperado bate com payload real.
03426. [BANCO_SCHEMA] [enums] verificar se campos do banco batem com model.
03427. [BANCO_SCHEMA] [enums] verificar se controller retorna padrão consistente.
03428. [BANCO_SCHEMA] [enums] verificar se paginação existe e funciona.
03429. [BANCO_SCHEMA] [enums] verificar se filtros podem ser combinados.
03430. [BANCO_SCHEMA] [enums] verificar se dados null quebram a tela.
03431. [BANCO_SCHEMA] [enums] verificar se array vazio tem estado visual.
03432. [BANCO_SCHEMA] [enums] verificar se loading impede tela quebrada.
03433. [BANCO_SCHEMA] [enums] verificar se modal fecha corretamente.
03434. [BANCO_SCHEMA] [enums] verificar se header não sobrepõe conteúdo.
03435. [BANCO_SCHEMA] [enums] verificar se layout é responsivo.
03436. [BANCO_SCHEMA] [enums] verificar se contraste é legível.
03437. [BANCO_SCHEMA] [enums] verificar se texto é humano e não técnico.
03438. [BANCO_SCHEMA] [enums] verificar se existe teste manual possível.
03439. [BANCO_SCHEMA] [enums] classificar severidade.
03440. [BANCO_SCHEMA] [enums] propor correção com risco estimado.

### BANCO_SCHEMA / constraints
03441. [BANCO_SCHEMA] [constraints] identificar arquivo responsável.
03442. [BANCO_SCHEMA] [constraints] identificar dependências diretas.
03443. [BANCO_SCHEMA] [constraints] identificar dependências indiretas.
03444. [BANCO_SCHEMA] [constraints] verificar se há código morto.
03445. [BANCO_SCHEMA] [constraints] verificar se há import não usado.
03446. [BANCO_SCHEMA] [constraints] verificar se há variável indefinida.
03447. [BANCO_SCHEMA] [constraints] verificar se há duplicação de lógica.
03448. [BANCO_SCHEMA] [constraints] verificar se há comentário desatualizado.
03449. [BANCO_SCHEMA] [constraints] verificar se a regra de negócio está clara.
03450. [BANCO_SCHEMA] [constraints] verificar se há tratamento de erro.
03451. [BANCO_SCHEMA] [constraints] verificar se o erro é amigável para usuário comum.
03452. [BANCO_SCHEMA] [constraints] verificar se erro técnico fica apenas no console ou relatório.
03453. [BANCO_SCHEMA] [constraints] verificar se há validação de entrada.
03454. [BANCO_SCHEMA] [constraints] verificar se há validação de saída.
03455. [BANCO_SCHEMA] [constraints] verificar se há validação de permissão.
03456. [BANCO_SCHEMA] [constraints] verificar se há risco de acesso indevido.
03457. [BANCO_SCHEMA] [constraints] verificar se há risco de dados de outro usuário.
03458. [BANCO_SCHEMA] [constraints] verificar se há risco de SQL injection.
03459. [BANCO_SCHEMA] [constraints] verificar se há risco de XSS.
03460. [BANCO_SCHEMA] [constraints] verificar se há risco de upload inseguro.
03461. [BANCO_SCHEMA] [constraints] verificar se imagens têm fallback correto.
03462. [BANCO_SCHEMA] [constraints] verificar se /core.png aparece como placeholder.
03463. [BANCO_SCHEMA] [constraints] verificar se /logo.png está disponível.
03464. [BANCO_SCHEMA] [constraints] verificar se rotas batem entre front e back.
03465. [BANCO_SCHEMA] [constraints] verificar se payload esperado bate com payload real.
03466. [BANCO_SCHEMA] [constraints] verificar se campos do banco batem com model.
03467. [BANCO_SCHEMA] [constraints] verificar se controller retorna padrão consistente.
03468. [BANCO_SCHEMA] [constraints] verificar se paginação existe e funciona.
03469. [BANCO_SCHEMA] [constraints] verificar se filtros podem ser combinados.
03470. [BANCO_SCHEMA] [constraints] verificar se dados null quebram a tela.
03471. [BANCO_SCHEMA] [constraints] verificar se array vazio tem estado visual.
03472. [BANCO_SCHEMA] [constraints] verificar se loading impede tela quebrada.
03473. [BANCO_SCHEMA] [constraints] verificar se modal fecha corretamente.
03474. [BANCO_SCHEMA] [constraints] verificar se header não sobrepõe conteúdo.
03475. [BANCO_SCHEMA] [constraints] verificar se layout é responsivo.
03476. [BANCO_SCHEMA] [constraints] verificar se contraste é legível.
03477. [BANCO_SCHEMA] [constraints] verificar se texto é humano e não técnico.
03478. [BANCO_SCHEMA] [constraints] verificar se existe teste manual possível.
03479. [BANCO_SCHEMA] [constraints] classificar severidade.
03480. [BANCO_SCHEMA] [constraints] propor correção com risco estimado.

---

## 6. Revisão detalhada — SEGURANCA

### SEGURANCA / autenticação
03481. [SEGURANCA] [autenticação] identificar arquivo responsável.
03482. [SEGURANCA] [autenticação] identificar dependências diretas.
03483. [SEGURANCA] [autenticação] identificar dependências indiretas.
03484. [SEGURANCA] [autenticação] verificar se há código morto.
03485. [SEGURANCA] [autenticação] verificar se há import não usado.
03486. [SEGURANCA] [autenticação] verificar se há variável indefinida.
03487. [SEGURANCA] [autenticação] verificar se há duplicação de lógica.
03488. [SEGURANCA] [autenticação] verificar se há comentário desatualizado.
03489. [SEGURANCA] [autenticação] verificar se a regra de negócio está clara.
03490. [SEGURANCA] [autenticação] verificar se há tratamento de erro.
03491. [SEGURANCA] [autenticação] verificar se o erro é amigável para usuário comum.
03492. [SEGURANCA] [autenticação] verificar se erro técnico fica apenas no console ou relatório.
03493. [SEGURANCA] [autenticação] verificar se há validação de entrada.
03494. [SEGURANCA] [autenticação] verificar se há validação de saída.
03495. [SEGURANCA] [autenticação] verificar se há validação de permissão.
03496. [SEGURANCA] [autenticação] verificar se há risco de acesso indevido.
03497. [SEGURANCA] [autenticação] verificar se há risco de dados de outro usuário.
03498. [SEGURANCA] [autenticação] verificar se há risco de SQL injection.
03499. [SEGURANCA] [autenticação] verificar se há risco de XSS.
03500. [SEGURANCA] [autenticação] verificar se há risco de upload inseguro.
03501. [SEGURANCA] [autenticação] verificar se imagens têm fallback correto.
03502. [SEGURANCA] [autenticação] verificar se /core.png aparece como placeholder.
03503. [SEGURANCA] [autenticação] verificar se /logo.png está disponível.
03504. [SEGURANCA] [autenticação] verificar se rotas batem entre front e back.
03505. [SEGURANCA] [autenticação] verificar se payload esperado bate com payload real.
03506. [SEGURANCA] [autenticação] verificar se campos do banco batem com model.
03507. [SEGURANCA] [autenticação] verificar se controller retorna padrão consistente.
03508. [SEGURANCA] [autenticação] verificar se paginação existe e funciona.
03509. [SEGURANCA] [autenticação] verificar se filtros podem ser combinados.
03510. [SEGURANCA] [autenticação] verificar se dados null quebram a tela.
03511. [SEGURANCA] [autenticação] verificar se array vazio tem estado visual.
03512. [SEGURANCA] [autenticação] verificar se loading impede tela quebrada.
03513. [SEGURANCA] [autenticação] verificar se modal fecha corretamente.
03514. [SEGURANCA] [autenticação] verificar se header não sobrepõe conteúdo.
03515. [SEGURANCA] [autenticação] verificar se layout é responsivo.
03516. [SEGURANCA] [autenticação] verificar se contraste é legível.
03517. [SEGURANCA] [autenticação] verificar se texto é humano e não técnico.
03518. [SEGURANCA] [autenticação] verificar se existe teste manual possível.
03519. [SEGURANCA] [autenticação] classificar severidade.
03520. [SEGURANCA] [autenticação] propor correção com risco estimado.

### SEGURANCA / autorização
03521. [SEGURANCA] [autorização] identificar arquivo responsável.
03522. [SEGURANCA] [autorização] identificar dependências diretas.
03523. [SEGURANCA] [autorização] identificar dependências indiretas.
03524. [SEGURANCA] [autorização] verificar se há código morto.
03525. [SEGURANCA] [autorização] verificar se há import não usado.
03526. [SEGURANCA] [autorização] verificar se há variável indefinida.
03527. [SEGURANCA] [autorização] verificar se há duplicação de lógica.
03528. [SEGURANCA] [autorização] verificar se há comentário desatualizado.
03529. [SEGURANCA] [autorização] verificar se a regra de negócio está clara.
03530. [SEGURANCA] [autorização] verificar se há tratamento de erro.
03531. [SEGURANCA] [autorização] verificar se o erro é amigável para usuário comum.
03532. [SEGURANCA] [autorização] verificar se erro técnico fica apenas no console ou relatório.
03533. [SEGURANCA] [autorização] verificar se há validação de entrada.
03534. [SEGURANCA] [autorização] verificar se há validação de saída.
03535. [SEGURANCA] [autorização] verificar se há validação de permissão.
03536. [SEGURANCA] [autorização] verificar se há risco de acesso indevido.
03537. [SEGURANCA] [autorização] verificar se há risco de dados de outro usuário.
03538. [SEGURANCA] [autorização] verificar se há risco de SQL injection.
03539. [SEGURANCA] [autorização] verificar se há risco de XSS.
03540. [SEGURANCA] [autorização] verificar se há risco de upload inseguro.
03541. [SEGURANCA] [autorização] verificar se imagens têm fallback correto.
03542. [SEGURANCA] [autorização] verificar se /core.png aparece como placeholder.
03543. [SEGURANCA] [autorização] verificar se /logo.png está disponível.
03544. [SEGURANCA] [autorização] verificar se rotas batem entre front e back.
03545. [SEGURANCA] [autorização] verificar se payload esperado bate com payload real.
03546. [SEGURANCA] [autorização] verificar se campos do banco batem com model.
03547. [SEGURANCA] [autorização] verificar se controller retorna padrão consistente.
03548. [SEGURANCA] [autorização] verificar se paginação existe e funciona.
03549. [SEGURANCA] [autorização] verificar se filtros podem ser combinados.
03550. [SEGURANCA] [autorização] verificar se dados null quebram a tela.
03551. [SEGURANCA] [autorização] verificar se array vazio tem estado visual.
03552. [SEGURANCA] [autorização] verificar se loading impede tela quebrada.
03553. [SEGURANCA] [autorização] verificar se modal fecha corretamente.
03554. [SEGURANCA] [autorização] verificar se header não sobrepõe conteúdo.
03555. [SEGURANCA] [autorização] verificar se layout é responsivo.
03556. [SEGURANCA] [autorização] verificar se contraste é legível.
03557. [SEGURANCA] [autorização] verificar se texto é humano e não técnico.
03558. [SEGURANCA] [autorização] verificar se existe teste manual possível.
03559. [SEGURANCA] [autorização] classificar severidade.
03560. [SEGURANCA] [autorização] propor correção com risco estimado.

### SEGURANCA / JWT
03561. [SEGURANCA] [JWT] identificar arquivo responsável.
03562. [SEGURANCA] [JWT] identificar dependências diretas.
03563. [SEGURANCA] [JWT] identificar dependências indiretas.
03564. [SEGURANCA] [JWT] verificar se há código morto.
03565. [SEGURANCA] [JWT] verificar se há import não usado.
03566. [SEGURANCA] [JWT] verificar se há variável indefinida.
03567. [SEGURANCA] [JWT] verificar se há duplicação de lógica.
03568. [SEGURANCA] [JWT] verificar se há comentário desatualizado.
03569. [SEGURANCA] [JWT] verificar se a regra de negócio está clara.
03570. [SEGURANCA] [JWT] verificar se há tratamento de erro.
03571. [SEGURANCA] [JWT] verificar se o erro é amigável para usuário comum.
03572. [SEGURANCA] [JWT] verificar se erro técnico fica apenas no console ou relatório.
03573. [SEGURANCA] [JWT] verificar se há validação de entrada.
03574. [SEGURANCA] [JWT] verificar se há validação de saída.
03575. [SEGURANCA] [JWT] verificar se há validação de permissão.
03576. [SEGURANCA] [JWT] verificar se há risco de acesso indevido.
03577. [SEGURANCA] [JWT] verificar se há risco de dados de outro usuário.
03578. [SEGURANCA] [JWT] verificar se há risco de SQL injection.
03579. [SEGURANCA] [JWT] verificar se há risco de XSS.
03580. [SEGURANCA] [JWT] verificar se há risco de upload inseguro.
03581. [SEGURANCA] [JWT] verificar se imagens têm fallback correto.
03582. [SEGURANCA] [JWT] verificar se /core.png aparece como placeholder.
03583. [SEGURANCA] [JWT] verificar se /logo.png está disponível.
03584. [SEGURANCA] [JWT] verificar se rotas batem entre front e back.
03585. [SEGURANCA] [JWT] verificar se payload esperado bate com payload real.
03586. [SEGURANCA] [JWT] verificar se campos do banco batem com model.
03587. [SEGURANCA] [JWT] verificar se controller retorna padrão consistente.
03588. [SEGURANCA] [JWT] verificar se paginação existe e funciona.
03589. [SEGURANCA] [JWT] verificar se filtros podem ser combinados.
03590. [SEGURANCA] [JWT] verificar se dados null quebram a tela.
03591. [SEGURANCA] [JWT] verificar se array vazio tem estado visual.
03592. [SEGURANCA] [JWT] verificar se loading impede tela quebrada.
03593. [SEGURANCA] [JWT] verificar se modal fecha corretamente.
03594. [SEGURANCA] [JWT] verificar se header não sobrepõe conteúdo.
03595. [SEGURANCA] [JWT] verificar se layout é responsivo.
03596. [SEGURANCA] [JWT] verificar se contraste é legível.
03597. [SEGURANCA] [JWT] verificar se texto é humano e não técnico.
03598. [SEGURANCA] [JWT] verificar se existe teste manual possível.
03599. [SEGURANCA] [JWT] classificar severidade.
03600. [SEGURANCA] [JWT] propor correção com risco estimado.

### SEGURANCA / senha
03601. [SEGURANCA] [senha] identificar arquivo responsável.
03602. [SEGURANCA] [senha] identificar dependências diretas.
03603. [SEGURANCA] [senha] identificar dependências indiretas.
03604. [SEGURANCA] [senha] verificar se há código morto.
03605. [SEGURANCA] [senha] verificar se há import não usado.
03606. [SEGURANCA] [senha] verificar se há variável indefinida.
03607. [SEGURANCA] [senha] verificar se há duplicação de lógica.
03608. [SEGURANCA] [senha] verificar se há comentário desatualizado.
03609. [SEGURANCA] [senha] verificar se a regra de negócio está clara.
03610. [SEGURANCA] [senha] verificar se há tratamento de erro.
03611. [SEGURANCA] [senha] verificar se o erro é amigável para usuário comum.
03612. [SEGURANCA] [senha] verificar se erro técnico fica apenas no console ou relatório.
03613. [SEGURANCA] [senha] verificar se há validação de entrada.
03614. [SEGURANCA] [senha] verificar se há validação de saída.
03615. [SEGURANCA] [senha] verificar se há validação de permissão.
03616. [SEGURANCA] [senha] verificar se há risco de acesso indevido.
03617. [SEGURANCA] [senha] verificar se há risco de dados de outro usuário.
03618. [SEGURANCA] [senha] verificar se há risco de SQL injection.
03619. [SEGURANCA] [senha] verificar se há risco de XSS.
03620. [SEGURANCA] [senha] verificar se há risco de upload inseguro.
03621. [SEGURANCA] [senha] verificar se imagens têm fallback correto.
03622. [SEGURANCA] [senha] verificar se /core.png aparece como placeholder.
03623. [SEGURANCA] [senha] verificar se /logo.png está disponível.
03624. [SEGURANCA] [senha] verificar se rotas batem entre front e back.
03625. [SEGURANCA] [senha] verificar se payload esperado bate com payload real.
03626. [SEGURANCA] [senha] verificar se campos do banco batem com model.
03627. [SEGURANCA] [senha] verificar se controller retorna padrão consistente.
03628. [SEGURANCA] [senha] verificar se paginação existe e funciona.
03629. [SEGURANCA] [senha] verificar se filtros podem ser combinados.
03630. [SEGURANCA] [senha] verificar se dados null quebram a tela.
03631. [SEGURANCA] [senha] verificar se array vazio tem estado visual.
03632. [SEGURANCA] [senha] verificar se loading impede tela quebrada.
03633. [SEGURANCA] [senha] verificar se modal fecha corretamente.
03634. [SEGURANCA] [senha] verificar se header não sobrepõe conteúdo.
03635. [SEGURANCA] [senha] verificar se layout é responsivo.
03636. [SEGURANCA] [senha] verificar se contraste é legível.
03637. [SEGURANCA] [senha] verificar se texto é humano e não técnico.
03638. [SEGURANCA] [senha] verificar se existe teste manual possível.
03639. [SEGURANCA] [senha] classificar severidade.
03640. [SEGURANCA] [senha] propor correção com risco estimado.

### SEGURANCA / hash
03641. [SEGURANCA] [hash] identificar arquivo responsável.
03642. [SEGURANCA] [hash] identificar dependências diretas.
03643. [SEGURANCA] [hash] identificar dependências indiretas.
03644. [SEGURANCA] [hash] verificar se há código morto.
03645. [SEGURANCA] [hash] verificar se há import não usado.
03646. [SEGURANCA] [hash] verificar se há variável indefinida.
03647. [SEGURANCA] [hash] verificar se há duplicação de lógica.
03648. [SEGURANCA] [hash] verificar se há comentário desatualizado.
03649. [SEGURANCA] [hash] verificar se a regra de negócio está clara.
03650. [SEGURANCA] [hash] verificar se há tratamento de erro.
03651. [SEGURANCA] [hash] verificar se o erro é amigável para usuário comum.
03652. [SEGURANCA] [hash] verificar se erro técnico fica apenas no console ou relatório.
03653. [SEGURANCA] [hash] verificar se há validação de entrada.
03654. [SEGURANCA] [hash] verificar se há validação de saída.
03655. [SEGURANCA] [hash] verificar se há validação de permissão.
03656. [SEGURANCA] [hash] verificar se há risco de acesso indevido.
03657. [SEGURANCA] [hash] verificar se há risco de dados de outro usuário.
03658. [SEGURANCA] [hash] verificar se há risco de SQL injection.
03659. [SEGURANCA] [hash] verificar se há risco de XSS.
03660. [SEGURANCA] [hash] verificar se há risco de upload inseguro.
03661. [SEGURANCA] [hash] verificar se imagens têm fallback correto.
03662. [SEGURANCA] [hash] verificar se /core.png aparece como placeholder.
03663. [SEGURANCA] [hash] verificar se /logo.png está disponível.
03664. [SEGURANCA] [hash] verificar se rotas batem entre front e back.
03665. [SEGURANCA] [hash] verificar se payload esperado bate com payload real.
03666. [SEGURANCA] [hash] verificar se campos do banco batem com model.
03667. [SEGURANCA] [hash] verificar se controller retorna padrão consistente.
03668. [SEGURANCA] [hash] verificar se paginação existe e funciona.
03669. [SEGURANCA] [hash] verificar se filtros podem ser combinados.
03670. [SEGURANCA] [hash] verificar se dados null quebram a tela.
03671. [SEGURANCA] [hash] verificar se array vazio tem estado visual.
03672. [SEGURANCA] [hash] verificar se loading impede tela quebrada.
03673. [SEGURANCA] [hash] verificar se modal fecha corretamente.
03674. [SEGURANCA] [hash] verificar se header não sobrepõe conteúdo.
03675. [SEGURANCA] [hash] verificar se layout é responsivo.
03676. [SEGURANCA] [hash] verificar se contraste é legível.
03677. [SEGURANCA] [hash] verificar se texto é humano e não técnico.
03678. [SEGURANCA] [hash] verificar se existe teste manual possível.
03679. [SEGURANCA] [hash] classificar severidade.
03680. [SEGURANCA] [hash] propor correção com risco estimado.

### SEGURANCA / roles
03681. [SEGURANCA] [roles] identificar arquivo responsável.
03682. [SEGURANCA] [roles] identificar dependências diretas.
03683. [SEGURANCA] [roles] identificar dependências indiretas.
03684. [SEGURANCA] [roles] verificar se há código morto.
03685. [SEGURANCA] [roles] verificar se há import não usado.
03686. [SEGURANCA] [roles] verificar se há variável indefinida.
03687. [SEGURANCA] [roles] verificar se há duplicação de lógica.
03688. [SEGURANCA] [roles] verificar se há comentário desatualizado.
03689. [SEGURANCA] [roles] verificar se a regra de negócio está clara.
03690. [SEGURANCA] [roles] verificar se há tratamento de erro.
03691. [SEGURANCA] [roles] verificar se o erro é amigável para usuário comum.
03692. [SEGURANCA] [roles] verificar se erro técnico fica apenas no console ou relatório.
03693. [SEGURANCA] [roles] verificar se há validação de entrada.
03694. [SEGURANCA] [roles] verificar se há validação de saída.
03695. [SEGURANCA] [roles] verificar se há validação de permissão.
03696. [SEGURANCA] [roles] verificar se há risco de acesso indevido.
03697. [SEGURANCA] [roles] verificar se há risco de dados de outro usuário.
03698. [SEGURANCA] [roles] verificar se há risco de SQL injection.
03699. [SEGURANCA] [roles] verificar se há risco de XSS.
03700. [SEGURANCA] [roles] verificar se há risco de upload inseguro.
03701. [SEGURANCA] [roles] verificar se imagens têm fallback correto.
03702. [SEGURANCA] [roles] verificar se /core.png aparece como placeholder.
03703. [SEGURANCA] [roles] verificar se /logo.png está disponível.
03704. [SEGURANCA] [roles] verificar se rotas batem entre front e back.
03705. [SEGURANCA] [roles] verificar se payload esperado bate com payload real.
03706. [SEGURANCA] [roles] verificar se campos do banco batem com model.
03707. [SEGURANCA] [roles] verificar se controller retorna padrão consistente.
03708. [SEGURANCA] [roles] verificar se paginação existe e funciona.
03709. [SEGURANCA] [roles] verificar se filtros podem ser combinados.
03710. [SEGURANCA] [roles] verificar se dados null quebram a tela.
03711. [SEGURANCA] [roles] verificar se array vazio tem estado visual.
03712. [SEGURANCA] [roles] verificar se loading impede tela quebrada.
03713. [SEGURANCA] [roles] verificar se modal fecha corretamente.
03714. [SEGURANCA] [roles] verificar se header não sobrepõe conteúdo.
03715. [SEGURANCA] [roles] verificar se layout é responsivo.
03716. [SEGURANCA] [roles] verificar se contraste é legível.
03717. [SEGURANCA] [roles] verificar se texto é humano e não técnico.
03718. [SEGURANCA] [roles] verificar se existe teste manual possível.
03719. [SEGURANCA] [roles] classificar severidade.
03720. [SEGURANCA] [roles] propor correção com risco estimado.

### SEGURANCA / admin
03721. [SEGURANCA] [admin] identificar arquivo responsável.
03722. [SEGURANCA] [admin] identificar dependências diretas.
03723. [SEGURANCA] [admin] identificar dependências indiretas.
03724. [SEGURANCA] [admin] verificar se há código morto.
03725. [SEGURANCA] [admin] verificar se há import não usado.
03726. [SEGURANCA] [admin] verificar se há variável indefinida.
03727. [SEGURANCA] [admin] verificar se há duplicação de lógica.
03728. [SEGURANCA] [admin] verificar se há comentário desatualizado.
03729. [SEGURANCA] [admin] verificar se a regra de negócio está clara.
03730. [SEGURANCA] [admin] verificar se há tratamento de erro.
03731. [SEGURANCA] [admin] verificar se o erro é amigável para usuário comum.
03732. [SEGURANCA] [admin] verificar se erro técnico fica apenas no console ou relatório.
03733. [SEGURANCA] [admin] verificar se há validação de entrada.
03734. [SEGURANCA] [admin] verificar se há validação de saída.
03735. [SEGURANCA] [admin] verificar se há validação de permissão.
03736. [SEGURANCA] [admin] verificar se há risco de acesso indevido.
03737. [SEGURANCA] [admin] verificar se há risco de dados de outro usuário.
03738. [SEGURANCA] [admin] verificar se há risco de SQL injection.
03739. [SEGURANCA] [admin] verificar se há risco de XSS.
03740. [SEGURANCA] [admin] verificar se há risco de upload inseguro.
03741. [SEGURANCA] [admin] verificar se imagens têm fallback correto.
03742. [SEGURANCA] [admin] verificar se /core.png aparece como placeholder.
03743. [SEGURANCA] [admin] verificar se /logo.png está disponível.
03744. [SEGURANCA] [admin] verificar se rotas batem entre front e back.
03745. [SEGURANCA] [admin] verificar se payload esperado bate com payload real.
03746. [SEGURANCA] [admin] verificar se campos do banco batem com model.
03747. [SEGURANCA] [admin] verificar se controller retorna padrão consistente.
03748. [SEGURANCA] [admin] verificar se paginação existe e funciona.
03749. [SEGURANCA] [admin] verificar se filtros podem ser combinados.
03750. [SEGURANCA] [admin] verificar se dados null quebram a tela.
03751. [SEGURANCA] [admin] verificar se array vazio tem estado visual.
03752. [SEGURANCA] [admin] verificar se loading impede tela quebrada.
03753. [SEGURANCA] [admin] verificar se modal fecha corretamente.
03754. [SEGURANCA] [admin] verificar se header não sobrepõe conteúdo.
03755. [SEGURANCA] [admin] verificar se layout é responsivo.
03756. [SEGURANCA] [admin] verificar se contraste é legível.
03757. [SEGURANCA] [admin] verificar se texto é humano e não técnico.
03758. [SEGURANCA] [admin] verificar se existe teste manual possível.
03759. [SEGURANCA] [admin] classificar severidade.
03760. [SEGURANCA] [admin] propor correção com risco estimado.

### SEGURANCA / fornecedor
03761. [SEGURANCA] [fornecedor] identificar arquivo responsável.
03762. [SEGURANCA] [fornecedor] identificar dependências diretas.
03763. [SEGURANCA] [fornecedor] identificar dependências indiretas.
03764. [SEGURANCA] [fornecedor] verificar se há código morto.
03765. [SEGURANCA] [fornecedor] verificar se há import não usado.
03766. [SEGURANCA] [fornecedor] verificar se há variável indefinida.
03767. [SEGURANCA] [fornecedor] verificar se há duplicação de lógica.
03768. [SEGURANCA] [fornecedor] verificar se há comentário desatualizado.
03769. [SEGURANCA] [fornecedor] verificar se a regra de negócio está clara.
03770. [SEGURANCA] [fornecedor] verificar se há tratamento de erro.
03771. [SEGURANCA] [fornecedor] verificar se o erro é amigável para usuário comum.
03772. [SEGURANCA] [fornecedor] verificar se erro técnico fica apenas no console ou relatório.
03773. [SEGURANCA] [fornecedor] verificar se há validação de entrada.
03774. [SEGURANCA] [fornecedor] verificar se há validação de saída.
03775. [SEGURANCA] [fornecedor] verificar se há validação de permissão.
03776. [SEGURANCA] [fornecedor] verificar se há risco de acesso indevido.
03777. [SEGURANCA] [fornecedor] verificar se há risco de dados de outro usuário.
03778. [SEGURANCA] [fornecedor] verificar se há risco de SQL injection.
03779. [SEGURANCA] [fornecedor] verificar se há risco de XSS.
03780. [SEGURANCA] [fornecedor] verificar se há risco de upload inseguro.
03781. [SEGURANCA] [fornecedor] verificar se imagens têm fallback correto.
03782. [SEGURANCA] [fornecedor] verificar se /core.png aparece como placeholder.
03783. [SEGURANCA] [fornecedor] verificar se /logo.png está disponível.
03784. [SEGURANCA] [fornecedor] verificar se rotas batem entre front e back.
03785. [SEGURANCA] [fornecedor] verificar se payload esperado bate com payload real.
03786. [SEGURANCA] [fornecedor] verificar se campos do banco batem com model.
03787. [SEGURANCA] [fornecedor] verificar se controller retorna padrão consistente.
03788. [SEGURANCA] [fornecedor] verificar se paginação existe e funciona.
03789. [SEGURANCA] [fornecedor] verificar se filtros podem ser combinados.
03790. [SEGURANCA] [fornecedor] verificar se dados null quebram a tela.
03791. [SEGURANCA] [fornecedor] verificar se array vazio tem estado visual.
03792. [SEGURANCA] [fornecedor] verificar se loading impede tela quebrada.
03793. [SEGURANCA] [fornecedor] verificar se modal fecha corretamente.
03794. [SEGURANCA] [fornecedor] verificar se header não sobrepõe conteúdo.
03795. [SEGURANCA] [fornecedor] verificar se layout é responsivo.
03796. [SEGURANCA] [fornecedor] verificar se contraste é legível.
03797. [SEGURANCA] [fornecedor] verificar se texto é humano e não técnico.
03798. [SEGURANCA] [fornecedor] verificar se existe teste manual possível.
03799. [SEGURANCA] [fornecedor] classificar severidade.
03800. [SEGURANCA] [fornecedor] propor correção com risco estimado.

### SEGURANCA / cliente comum
03801. [SEGURANCA] [cliente comum] identificar arquivo responsável.
03802. [SEGURANCA] [cliente comum] identificar dependências diretas.
03803. [SEGURANCA] [cliente comum] identificar dependências indiretas.
03804. [SEGURANCA] [cliente comum] verificar se há código morto.
03805. [SEGURANCA] [cliente comum] verificar se há import não usado.
03806. [SEGURANCA] [cliente comum] verificar se há variável indefinida.
03807. [SEGURANCA] [cliente comum] verificar se há duplicação de lógica.
03808. [SEGURANCA] [cliente comum] verificar se há comentário desatualizado.
03809. [SEGURANCA] [cliente comum] verificar se a regra de negócio está clara.
03810. [SEGURANCA] [cliente comum] verificar se há tratamento de erro.
03811. [SEGURANCA] [cliente comum] verificar se o erro é amigável para usuário comum.
03812. [SEGURANCA] [cliente comum] verificar se erro técnico fica apenas no console ou relatório.
03813. [SEGURANCA] [cliente comum] verificar se há validação de entrada.
03814. [SEGURANCA] [cliente comum] verificar se há validação de saída.
03815. [SEGURANCA] [cliente comum] verificar se há validação de permissão.
03816. [SEGURANCA] [cliente comum] verificar se há risco de acesso indevido.
03817. [SEGURANCA] [cliente comum] verificar se há risco de dados de outro usuário.
03818. [SEGURANCA] [cliente comum] verificar se há risco de SQL injection.
03819. [SEGURANCA] [cliente comum] verificar se há risco de XSS.
03820. [SEGURANCA] [cliente comum] verificar se há risco de upload inseguro.
03821. [SEGURANCA] [cliente comum] verificar se imagens têm fallback correto.
03822. [SEGURANCA] [cliente comum] verificar se /core.png aparece como placeholder.
03823. [SEGURANCA] [cliente comum] verificar se /logo.png está disponível.
03824. [SEGURANCA] [cliente comum] verificar se rotas batem entre front e back.
03825. [SEGURANCA] [cliente comum] verificar se payload esperado bate com payload real.
03826. [SEGURANCA] [cliente comum] verificar se campos do banco batem com model.
03827. [SEGURANCA] [cliente comum] verificar se controller retorna padrão consistente.
03828. [SEGURANCA] [cliente comum] verificar se paginação existe e funciona.
03829. [SEGURANCA] [cliente comum] verificar se filtros podem ser combinados.
03830. [SEGURANCA] [cliente comum] verificar se dados null quebram a tela.
03831. [SEGURANCA] [cliente comum] verificar se array vazio tem estado visual.
03832. [SEGURANCA] [cliente comum] verificar se loading impede tela quebrada.
03833. [SEGURANCA] [cliente comum] verificar se modal fecha corretamente.
03834. [SEGURANCA] [cliente comum] verificar se header não sobrepõe conteúdo.
03835. [SEGURANCA] [cliente comum] verificar se layout é responsivo.
03836. [SEGURANCA] [cliente comum] verificar se contraste é legível.
03837. [SEGURANCA] [cliente comum] verificar se texto é humano e não técnico.
03838. [SEGURANCA] [cliente comum] verificar se existe teste manual possível.
03839. [SEGURANCA] [cliente comum] classificar severidade.
03840. [SEGURANCA] [cliente comum] propor correção com risco estimado.

### SEGURANCA / upload seguro
03841. [SEGURANCA] [upload seguro] identificar arquivo responsável.
03842. [SEGURANCA] [upload seguro] identificar dependências diretas.
03843. [SEGURANCA] [upload seguro] identificar dependências indiretas.
03844. [SEGURANCA] [upload seguro] verificar se há código morto.
03845. [SEGURANCA] [upload seguro] verificar se há import não usado.
03846. [SEGURANCA] [upload seguro] verificar se há variável indefinida.
03847. [SEGURANCA] [upload seguro] verificar se há duplicação de lógica.
03848. [SEGURANCA] [upload seguro] verificar se há comentário desatualizado.
03849. [SEGURANCA] [upload seguro] verificar se a regra de negócio está clara.
03850. [SEGURANCA] [upload seguro] verificar se há tratamento de erro.
03851. [SEGURANCA] [upload seguro] verificar se o erro é amigável para usuário comum.
03852. [SEGURANCA] [upload seguro] verificar se erro técnico fica apenas no console ou relatório.
03853. [SEGURANCA] [upload seguro] verificar se há validação de entrada.
03854. [SEGURANCA] [upload seguro] verificar se há validação de saída.
03855. [SEGURANCA] [upload seguro] verificar se há validação de permissão.
03856. [SEGURANCA] [upload seguro] verificar se há risco de acesso indevido.
03857. [SEGURANCA] [upload seguro] verificar se há risco de dados de outro usuário.
03858. [SEGURANCA] [upload seguro] verificar se há risco de SQL injection.
03859. [SEGURANCA] [upload seguro] verificar se há risco de XSS.
03860. [SEGURANCA] [upload seguro] verificar se há risco de upload inseguro.
03861. [SEGURANCA] [upload seguro] verificar se imagens têm fallback correto.
03862. [SEGURANCA] [upload seguro] verificar se /core.png aparece como placeholder.
03863. [SEGURANCA] [upload seguro] verificar se /logo.png está disponível.
03864. [SEGURANCA] [upload seguro] verificar se rotas batem entre front e back.
03865. [SEGURANCA] [upload seguro] verificar se payload esperado bate com payload real.
03866. [SEGURANCA] [upload seguro] verificar se campos do banco batem com model.
03867. [SEGURANCA] [upload seguro] verificar se controller retorna padrão consistente.
03868. [SEGURANCA] [upload seguro] verificar se paginação existe e funciona.
03869. [SEGURANCA] [upload seguro] verificar se filtros podem ser combinados.
03870. [SEGURANCA] [upload seguro] verificar se dados null quebram a tela.
03871. [SEGURANCA] [upload seguro] verificar se array vazio tem estado visual.
03872. [SEGURANCA] [upload seguro] verificar se loading impede tela quebrada.
03873. [SEGURANCA] [upload seguro] verificar se modal fecha corretamente.
03874. [SEGURANCA] [upload seguro] verificar se header não sobrepõe conteúdo.
03875. [SEGURANCA] [upload seguro] verificar se layout é responsivo.
03876. [SEGURANCA] [upload seguro] verificar se contraste é legível.
03877. [SEGURANCA] [upload seguro] verificar se texto é humano e não técnico.
03878. [SEGURANCA] [upload seguro] verificar se existe teste manual possível.
03879. [SEGURANCA] [upload seguro] classificar severidade.
03880. [SEGURANCA] [upload seguro] propor correção com risco estimado.

### SEGURANCA / SQL injection
03881. [SEGURANCA] [SQL injection] identificar arquivo responsável.
03882. [SEGURANCA] [SQL injection] identificar dependências diretas.
03883. [SEGURANCA] [SQL injection] identificar dependências indiretas.
03884. [SEGURANCA] [SQL injection] verificar se há código morto.
03885. [SEGURANCA] [SQL injection] verificar se há import não usado.
03886. [SEGURANCA] [SQL injection] verificar se há variável indefinida.
03887. [SEGURANCA] [SQL injection] verificar se há duplicação de lógica.
03888. [SEGURANCA] [SQL injection] verificar se há comentário desatualizado.
03889. [SEGURANCA] [SQL injection] verificar se a regra de negócio está clara.
03890. [SEGURANCA] [SQL injection] verificar se há tratamento de erro.
03891. [SEGURANCA] [SQL injection] verificar se o erro é amigável para usuário comum.
03892. [SEGURANCA] [SQL injection] verificar se erro técnico fica apenas no console ou relatório.
03893. [SEGURANCA] [SQL injection] verificar se há validação de entrada.
03894. [SEGURANCA] [SQL injection] verificar se há validação de saída.
03895. [SEGURANCA] [SQL injection] verificar se há validação de permissão.
03896. [SEGURANCA] [SQL injection] verificar se há risco de acesso indevido.
03897. [SEGURANCA] [SQL injection] verificar se há risco de dados de outro usuário.
03898. [SEGURANCA] [SQL injection] verificar se há risco de SQL injection.
03899. [SEGURANCA] [SQL injection] verificar se há risco de XSS.
03900. [SEGURANCA] [SQL injection] verificar se há risco de upload inseguro.
03901. [SEGURANCA] [SQL injection] verificar se imagens têm fallback correto.
03902. [SEGURANCA] [SQL injection] verificar se /core.png aparece como placeholder.
03903. [SEGURANCA] [SQL injection] verificar se /logo.png está disponível.
03904. [SEGURANCA] [SQL injection] verificar se rotas batem entre front e back.
03905. [SEGURANCA] [SQL injection] verificar se payload esperado bate com payload real.
03906. [SEGURANCA] [SQL injection] verificar se campos do banco batem com model.
03907. [SEGURANCA] [SQL injection] verificar se controller retorna padrão consistente.
03908. [SEGURANCA] [SQL injection] verificar se paginação existe e funciona.
03909. [SEGURANCA] [SQL injection] verificar se filtros podem ser combinados.
03910. [SEGURANCA] [SQL injection] verificar se dados null quebram a tela.
03911. [SEGURANCA] [SQL injection] verificar se array vazio tem estado visual.
03912. [SEGURANCA] [SQL injection] verificar se loading impede tela quebrada.
03913. [SEGURANCA] [SQL injection] verificar se modal fecha corretamente.
03914. [SEGURANCA] [SQL injection] verificar se header não sobrepõe conteúdo.
03915. [SEGURANCA] [SQL injection] verificar se layout é responsivo.
03916. [SEGURANCA] [SQL injection] verificar se contraste é legível.
03917. [SEGURANCA] [SQL injection] verificar se texto é humano e não técnico.
03918. [SEGURANCA] [SQL injection] verificar se existe teste manual possível.
03919. [SEGURANCA] [SQL injection] classificar severidade.
03920. [SEGURANCA] [SQL injection] propor correção com risco estimado.

### SEGURANCA / XSS
03921. [SEGURANCA] [XSS] identificar arquivo responsável.
03922. [SEGURANCA] [XSS] identificar dependências diretas.
03923. [SEGURANCA] [XSS] identificar dependências indiretas.
03924. [SEGURANCA] [XSS] verificar se há código morto.
03925. [SEGURANCA] [XSS] verificar se há import não usado.
03926. [SEGURANCA] [XSS] verificar se há variável indefinida.
03927. [SEGURANCA] [XSS] verificar se há duplicação de lógica.
03928. [SEGURANCA] [XSS] verificar se há comentário desatualizado.
03929. [SEGURANCA] [XSS] verificar se a regra de negócio está clara.
03930. [SEGURANCA] [XSS] verificar se há tratamento de erro.
03931. [SEGURANCA] [XSS] verificar se o erro é amigável para usuário comum.
03932. [SEGURANCA] [XSS] verificar se erro técnico fica apenas no console ou relatório.
03933. [SEGURANCA] [XSS] verificar se há validação de entrada.
03934. [SEGURANCA] [XSS] verificar se há validação de saída.
03935. [SEGURANCA] [XSS] verificar se há validação de permissão.
03936. [SEGURANCA] [XSS] verificar se há risco de acesso indevido.
03937. [SEGURANCA] [XSS] verificar se há risco de dados de outro usuário.
03938. [SEGURANCA] [XSS] verificar se há risco de SQL injection.
03939. [SEGURANCA] [XSS] verificar se há risco de XSS.
03940. [SEGURANCA] [XSS] verificar se há risco de upload inseguro.
03941. [SEGURANCA] [XSS] verificar se imagens têm fallback correto.
03942. [SEGURANCA] [XSS] verificar se /core.png aparece como placeholder.
03943. [SEGURANCA] [XSS] verificar se /logo.png está disponível.
03944. [SEGURANCA] [XSS] verificar se rotas batem entre front e back.
03945. [SEGURANCA] [XSS] verificar se payload esperado bate com payload real.
03946. [SEGURANCA] [XSS] verificar se campos do banco batem com model.
03947. [SEGURANCA] [XSS] verificar se controller retorna padrão consistente.
03948. [SEGURANCA] [XSS] verificar se paginação existe e funciona.
03949. [SEGURANCA] [XSS] verificar se filtros podem ser combinados.
03950. [SEGURANCA] [XSS] verificar se dados null quebram a tela.
03951. [SEGURANCA] [XSS] verificar se array vazio tem estado visual.
03952. [SEGURANCA] [XSS] verificar se loading impede tela quebrada.
03953. [SEGURANCA] [XSS] verificar se modal fecha corretamente.
03954. [SEGURANCA] [XSS] verificar se header não sobrepõe conteúdo.
03955. [SEGURANCA] [XSS] verificar se layout é responsivo.
03956. [SEGURANCA] [XSS] verificar se contraste é legível.
03957. [SEGURANCA] [XSS] verificar se texto é humano e não técnico.
03958. [SEGURANCA] [XSS] verificar se existe teste manual possível.
03959. [SEGURANCA] [XSS] classificar severidade.
03960. [SEGURANCA] [XSS] propor correção com risco estimado.

### SEGURANCA / CORS
03961. [SEGURANCA] [CORS] identificar arquivo responsável.
03962. [SEGURANCA] [CORS] identificar dependências diretas.
03963. [SEGURANCA] [CORS] identificar dependências indiretas.
03964. [SEGURANCA] [CORS] verificar se há código morto.
03965. [SEGURANCA] [CORS] verificar se há import não usado.
03966. [SEGURANCA] [CORS] verificar se há variável indefinida.
03967. [SEGURANCA] [CORS] verificar se há duplicação de lógica.
03968. [SEGURANCA] [CORS] verificar se há comentário desatualizado.
03969. [SEGURANCA] [CORS] verificar se a regra de negócio está clara.
03970. [SEGURANCA] [CORS] verificar se há tratamento de erro.
03971. [SEGURANCA] [CORS] verificar se o erro é amigável para usuário comum.
03972. [SEGURANCA] [CORS] verificar se erro técnico fica apenas no console ou relatório.
03973. [SEGURANCA] [CORS] verificar se há validação de entrada.
03974. [SEGURANCA] [CORS] verificar se há validação de saída.
03975. [SEGURANCA] [CORS] verificar se há validação de permissão.
03976. [SEGURANCA] [CORS] verificar se há risco de acesso indevido.
03977. [SEGURANCA] [CORS] verificar se há risco de dados de outro usuário.
03978. [SEGURANCA] [CORS] verificar se há risco de SQL injection.
03979. [SEGURANCA] [CORS] verificar se há risco de XSS.
03980. [SEGURANCA] [CORS] verificar se há risco de upload inseguro.
03981. [SEGURANCA] [CORS] verificar se imagens têm fallback correto.
03982. [SEGURANCA] [CORS] verificar se /core.png aparece como placeholder.
03983. [SEGURANCA] [CORS] verificar se /logo.png está disponível.
03984. [SEGURANCA] [CORS] verificar se rotas batem entre front e back.
03985. [SEGURANCA] [CORS] verificar se payload esperado bate com payload real.
03986. [SEGURANCA] [CORS] verificar se campos do banco batem com model.
03987. [SEGURANCA] [CORS] verificar se controller retorna padrão consistente.
03988. [SEGURANCA] [CORS] verificar se paginação existe e funciona.
03989. [SEGURANCA] [CORS] verificar se filtros podem ser combinados.
03990. [SEGURANCA] [CORS] verificar se dados null quebram a tela.
03991. [SEGURANCA] [CORS] verificar se array vazio tem estado visual.
03992. [SEGURANCA] [CORS] verificar se loading impede tela quebrada.
03993. [SEGURANCA] [CORS] verificar se modal fecha corretamente.
03994. [SEGURANCA] [CORS] verificar se header não sobrepõe conteúdo.
03995. [SEGURANCA] [CORS] verificar se layout é responsivo.
03996. [SEGURANCA] [CORS] verificar se contraste é legível.
03997. [SEGURANCA] [CORS] verificar se texto é humano e não técnico.
03998. [SEGURANCA] [CORS] verificar se existe teste manual possível.
03999. [SEGURANCA] [CORS] classificar severidade.
04000. [SEGURANCA] [CORS] propor correção com risco estimado.

### SEGURANCA / dados sensíveis
04001. [SEGURANCA] [dados sensíveis] identificar arquivo responsável.
04002. [SEGURANCA] [dados sensíveis] identificar dependências diretas.
04003. [SEGURANCA] [dados sensíveis] identificar dependências indiretas.
04004. [SEGURANCA] [dados sensíveis] verificar se há código morto.
04005. [SEGURANCA] [dados sensíveis] verificar se há import não usado.
04006. [SEGURANCA] [dados sensíveis] verificar se há variável indefinida.
04007. [SEGURANCA] [dados sensíveis] verificar se há duplicação de lógica.
04008. [SEGURANCA] [dados sensíveis] verificar se há comentário desatualizado.
04009. [SEGURANCA] [dados sensíveis] verificar se a regra de negócio está clara.
04010. [SEGURANCA] [dados sensíveis] verificar se há tratamento de erro.
04011. [SEGURANCA] [dados sensíveis] verificar se o erro é amigável para usuário comum.
04012. [SEGURANCA] [dados sensíveis] verificar se erro técnico fica apenas no console ou relatório.
04013. [SEGURANCA] [dados sensíveis] verificar se há validação de entrada.
04014. [SEGURANCA] [dados sensíveis] verificar se há validação de saída.
04015. [SEGURANCA] [dados sensíveis] verificar se há validação de permissão.
04016. [SEGURANCA] [dados sensíveis] verificar se há risco de acesso indevido.
04017. [SEGURANCA] [dados sensíveis] verificar se há risco de dados de outro usuário.
04018. [SEGURANCA] [dados sensíveis] verificar se há risco de SQL injection.
04019. [SEGURANCA] [dados sensíveis] verificar se há risco de XSS.
04020. [SEGURANCA] [dados sensíveis] verificar se há risco de upload inseguro.
04021. [SEGURANCA] [dados sensíveis] verificar se imagens têm fallback correto.
04022. [SEGURANCA] [dados sensíveis] verificar se /core.png aparece como placeholder.
04023. [SEGURANCA] [dados sensíveis] verificar se /logo.png está disponível.
04024. [SEGURANCA] [dados sensíveis] verificar se rotas batem entre front e back.
04025. [SEGURANCA] [dados sensíveis] verificar se payload esperado bate com payload real.
04026. [SEGURANCA] [dados sensíveis] verificar se campos do banco batem com model.
04027. [SEGURANCA] [dados sensíveis] verificar se controller retorna padrão consistente.
04028. [SEGURANCA] [dados sensíveis] verificar se paginação existe e funciona.
04029. [SEGURANCA] [dados sensíveis] verificar se filtros podem ser combinados.
04030. [SEGURANCA] [dados sensíveis] verificar se dados null quebram a tela.
04031. [SEGURANCA] [dados sensíveis] verificar se array vazio tem estado visual.
04032. [SEGURANCA] [dados sensíveis] verificar se loading impede tela quebrada.
04033. [SEGURANCA] [dados sensíveis] verificar se modal fecha corretamente.
04034. [SEGURANCA] [dados sensíveis] verificar se header não sobrepõe conteúdo.
04035. [SEGURANCA] [dados sensíveis] verificar se layout é responsivo.
04036. [SEGURANCA] [dados sensíveis] verificar se contraste é legível.
04037. [SEGURANCA] [dados sensíveis] verificar se texto é humano e não técnico.
04038. [SEGURANCA] [dados sensíveis] verificar se existe teste manual possível.
04039. [SEGURANCA] [dados sensíveis] classificar severidade.
04040. [SEGURANCA] [dados sensíveis] propor correção com risco estimado.

### SEGURANCA / mensagens técnicas
04041. [SEGURANCA] [mensagens técnicas] identificar arquivo responsável.
04042. [SEGURANCA] [mensagens técnicas] identificar dependências diretas.
04043. [SEGURANCA] [mensagens técnicas] identificar dependências indiretas.
04044. [SEGURANCA] [mensagens técnicas] verificar se há código morto.
04045. [SEGURANCA] [mensagens técnicas] verificar se há import não usado.
04046. [SEGURANCA] [mensagens técnicas] verificar se há variável indefinida.
04047. [SEGURANCA] [mensagens técnicas] verificar se há duplicação de lógica.
04048. [SEGURANCA] [mensagens técnicas] verificar se há comentário desatualizado.
04049. [SEGURANCA] [mensagens técnicas] verificar se a regra de negócio está clara.
04050. [SEGURANCA] [mensagens técnicas] verificar se há tratamento de erro.
04051. [SEGURANCA] [mensagens técnicas] verificar se o erro é amigável para usuário comum.
04052. [SEGURANCA] [mensagens técnicas] verificar se erro técnico fica apenas no console ou relatório.
04053. [SEGURANCA] [mensagens técnicas] verificar se há validação de entrada.
04054. [SEGURANCA] [mensagens técnicas] verificar se há validação de saída.
04055. [SEGURANCA] [mensagens técnicas] verificar se há validação de permissão.
04056. [SEGURANCA] [mensagens técnicas] verificar se há risco de acesso indevido.
04057. [SEGURANCA] [mensagens técnicas] verificar se há risco de dados de outro usuário.
04058. [SEGURANCA] [mensagens técnicas] verificar se há risco de SQL injection.
04059. [SEGURANCA] [mensagens técnicas] verificar se há risco de XSS.
04060. [SEGURANCA] [mensagens técnicas] verificar se há risco de upload inseguro.
04061. [SEGURANCA] [mensagens técnicas] verificar se imagens têm fallback correto.
04062. [SEGURANCA] [mensagens técnicas] verificar se /core.png aparece como placeholder.
04063. [SEGURANCA] [mensagens técnicas] verificar se /logo.png está disponível.
04064. [SEGURANCA] [mensagens técnicas] verificar se rotas batem entre front e back.
04065. [SEGURANCA] [mensagens técnicas] verificar se payload esperado bate com payload real.
04066. [SEGURANCA] [mensagens técnicas] verificar se campos do banco batem com model.
04067. [SEGURANCA] [mensagens técnicas] verificar se controller retorna padrão consistente.
04068. [SEGURANCA] [mensagens técnicas] verificar se paginação existe e funciona.
04069. [SEGURANCA] [mensagens técnicas] verificar se filtros podem ser combinados.
04070. [SEGURANCA] [mensagens técnicas] verificar se dados null quebram a tela.
04071. [SEGURANCA] [mensagens técnicas] verificar se array vazio tem estado visual.
04072. [SEGURANCA] [mensagens técnicas] verificar se loading impede tela quebrada.
04073. [SEGURANCA] [mensagens técnicas] verificar se modal fecha corretamente.
04074. [SEGURANCA] [mensagens técnicas] verificar se header não sobrepõe conteúdo.
04075. [SEGURANCA] [mensagens técnicas] verificar se layout é responsivo.
04076. [SEGURANCA] [mensagens técnicas] verificar se contraste é legível.
04077. [SEGURANCA] [mensagens técnicas] verificar se texto é humano e não técnico.
04078. [SEGURANCA] [mensagens técnicas] verificar se existe teste manual possível.
04079. [SEGURANCA] [mensagens técnicas] classificar severidade.
04080. [SEGURANCA] [mensagens técnicas] propor correção com risco estimado.

### SEGURANCA / rate limit
04081. [SEGURANCA] [rate limit] identificar arquivo responsável.
04082. [SEGURANCA] [rate limit] identificar dependências diretas.
04083. [SEGURANCA] [rate limit] identificar dependências indiretas.
04084. [SEGURANCA] [rate limit] verificar se há código morto.
04085. [SEGURANCA] [rate limit] verificar se há import não usado.
04086. [SEGURANCA] [rate limit] verificar se há variável indefinida.
04087. [SEGURANCA] [rate limit] verificar se há duplicação de lógica.
04088. [SEGURANCA] [rate limit] verificar se há comentário desatualizado.
04089. [SEGURANCA] [rate limit] verificar se a regra de negócio está clara.
04090. [SEGURANCA] [rate limit] verificar se há tratamento de erro.
04091. [SEGURANCA] [rate limit] verificar se o erro é amigável para usuário comum.
04092. [SEGURANCA] [rate limit] verificar se erro técnico fica apenas no console ou relatório.
04093. [SEGURANCA] [rate limit] verificar se há validação de entrada.
04094. [SEGURANCA] [rate limit] verificar se há validação de saída.
04095. [SEGURANCA] [rate limit] verificar se há validação de permissão.
04096. [SEGURANCA] [rate limit] verificar se há risco de acesso indevido.
04097. [SEGURANCA] [rate limit] verificar se há risco de dados de outro usuário.
04098. [SEGURANCA] [rate limit] verificar se há risco de SQL injection.
04099. [SEGURANCA] [rate limit] verificar se há risco de XSS.
04100. [SEGURANCA] [rate limit] verificar se há risco de upload inseguro.
04101. [SEGURANCA] [rate limit] verificar se imagens têm fallback correto.
04102. [SEGURANCA] [rate limit] verificar se /core.png aparece como placeholder.
04103. [SEGURANCA] [rate limit] verificar se /logo.png está disponível.
04104. [SEGURANCA] [rate limit] verificar se rotas batem entre front e back.
04105. [SEGURANCA] [rate limit] verificar se payload esperado bate com payload real.
04106. [SEGURANCA] [rate limit] verificar se campos do banco batem com model.
04107. [SEGURANCA] [rate limit] verificar se controller retorna padrão consistente.
04108. [SEGURANCA] [rate limit] verificar se paginação existe e funciona.
04109. [SEGURANCA] [rate limit] verificar se filtros podem ser combinados.
04110. [SEGURANCA] [rate limit] verificar se dados null quebram a tela.
04111. [SEGURANCA] [rate limit] verificar se array vazio tem estado visual.
04112. [SEGURANCA] [rate limit] verificar se loading impede tela quebrada.
04113. [SEGURANCA] [rate limit] verificar se modal fecha corretamente.
04114. [SEGURANCA] [rate limit] verificar se header não sobrepõe conteúdo.
04115. [SEGURANCA] [rate limit] verificar se layout é responsivo.
04116. [SEGURANCA] [rate limit] verificar se contraste é legível.
04117. [SEGURANCA] [rate limit] verificar se texto é humano e não técnico.
04118. [SEGURANCA] [rate limit] verificar se existe teste manual possível.
04119. [SEGURANCA] [rate limit] classificar severidade.
04120. [SEGURANCA] [rate limit] propor correção com risco estimado.

---

## 6. Revisão detalhada — QUALIDADE_TESTES

### QUALIDADE_TESTES / lint
04121. [QUALIDADE_TESTES] [lint] identificar arquivo responsável.
04122. [QUALIDADE_TESTES] [lint] identificar dependências diretas.
04123. [QUALIDADE_TESTES] [lint] identificar dependências indiretas.
04124. [QUALIDADE_TESTES] [lint] verificar se há código morto.
04125. [QUALIDADE_TESTES] [lint] verificar se há import não usado.
04126. [QUALIDADE_TESTES] [lint] verificar se há variável indefinida.
04127. [QUALIDADE_TESTES] [lint] verificar se há duplicação de lógica.
04128. [QUALIDADE_TESTES] [lint] verificar se há comentário desatualizado.
04129. [QUALIDADE_TESTES] [lint] verificar se a regra de negócio está clara.
04130. [QUALIDADE_TESTES] [lint] verificar se há tratamento de erro.
04131. [QUALIDADE_TESTES] [lint] verificar se o erro é amigável para usuário comum.
04132. [QUALIDADE_TESTES] [lint] verificar se erro técnico fica apenas no console ou relatório.
04133. [QUALIDADE_TESTES] [lint] verificar se há validação de entrada.
04134. [QUALIDADE_TESTES] [lint] verificar se há validação de saída.
04135. [QUALIDADE_TESTES] [lint] verificar se há validação de permissão.
04136. [QUALIDADE_TESTES] [lint] verificar se há risco de acesso indevido.
04137. [QUALIDADE_TESTES] [lint] verificar se há risco de dados de outro usuário.
04138. [QUALIDADE_TESTES] [lint] verificar se há risco de SQL injection.
04139. [QUALIDADE_TESTES] [lint] verificar se há risco de XSS.
04140. [QUALIDADE_TESTES] [lint] verificar se há risco de upload inseguro.
04141. [QUALIDADE_TESTES] [lint] verificar se imagens têm fallback correto.
04142. [QUALIDADE_TESTES] [lint] verificar se /core.png aparece como placeholder.
04143. [QUALIDADE_TESTES] [lint] verificar se /logo.png está disponível.
04144. [QUALIDADE_TESTES] [lint] verificar se rotas batem entre front e back.
04145. [QUALIDADE_TESTES] [lint] verificar se payload esperado bate com payload real.
04146. [QUALIDADE_TESTES] [lint] verificar se campos do banco batem com model.
04147. [QUALIDADE_TESTES] [lint] verificar se controller retorna padrão consistente.
04148. [QUALIDADE_TESTES] [lint] verificar se paginação existe e funciona.
04149. [QUALIDADE_TESTES] [lint] verificar se filtros podem ser combinados.
04150. [QUALIDADE_TESTES] [lint] verificar se dados null quebram a tela.
04151. [QUALIDADE_TESTES] [lint] verificar se array vazio tem estado visual.
04152. [QUALIDADE_TESTES] [lint] verificar se loading impede tela quebrada.
04153. [QUALIDADE_TESTES] [lint] verificar se modal fecha corretamente.
04154. [QUALIDADE_TESTES] [lint] verificar se header não sobrepõe conteúdo.
04155. [QUALIDADE_TESTES] [lint] verificar se layout é responsivo.
04156. [QUALIDADE_TESTES] [lint] verificar se contraste é legível.
04157. [QUALIDADE_TESTES] [lint] verificar se texto é humano e não técnico.
04158. [QUALIDADE_TESTES] [lint] verificar se existe teste manual possível.
04159. [QUALIDADE_TESTES] [lint] classificar severidade.
04160. [QUALIDADE_TESTES] [lint] propor correção com risco estimado.

### QUALIDADE_TESTES / build
04161. [QUALIDADE_TESTES] [build] identificar arquivo responsável.
04162. [QUALIDADE_TESTES] [build] identificar dependências diretas.
04163. [QUALIDADE_TESTES] [build] identificar dependências indiretas.
04164. [QUALIDADE_TESTES] [build] verificar se há código morto.
04165. [QUALIDADE_TESTES] [build] verificar se há import não usado.
04166. [QUALIDADE_TESTES] [build] verificar se há variável indefinida.
04167. [QUALIDADE_TESTES] [build] verificar se há duplicação de lógica.
04168. [QUALIDADE_TESTES] [build] verificar se há comentário desatualizado.
04169. [QUALIDADE_TESTES] [build] verificar se a regra de negócio está clara.
04170. [QUALIDADE_TESTES] [build] verificar se há tratamento de erro.
04171. [QUALIDADE_TESTES] [build] verificar se o erro é amigável para usuário comum.
04172. [QUALIDADE_TESTES] [build] verificar se erro técnico fica apenas no console ou relatório.
04173. [QUALIDADE_TESTES] [build] verificar se há validação de entrada.
04174. [QUALIDADE_TESTES] [build] verificar se há validação de saída.
04175. [QUALIDADE_TESTES] [build] verificar se há validação de permissão.
04176. [QUALIDADE_TESTES] [build] verificar se há risco de acesso indevido.
04177. [QUALIDADE_TESTES] [build] verificar se há risco de dados de outro usuário.
04178. [QUALIDADE_TESTES] [build] verificar se há risco de SQL injection.
04179. [QUALIDADE_TESTES] [build] verificar se há risco de XSS.
04180. [QUALIDADE_TESTES] [build] verificar se há risco de upload inseguro.
04181. [QUALIDADE_TESTES] [build] verificar se imagens têm fallback correto.
04182. [QUALIDADE_TESTES] [build] verificar se /core.png aparece como placeholder.
04183. [QUALIDADE_TESTES] [build] verificar se /logo.png está disponível.
04184. [QUALIDADE_TESTES] [build] verificar se rotas batem entre front e back.
04185. [QUALIDADE_TESTES] [build] verificar se payload esperado bate com payload real.
04186. [QUALIDADE_TESTES] [build] verificar se campos do banco batem com model.
04187. [QUALIDADE_TESTES] [build] verificar se controller retorna padrão consistente.
04188. [QUALIDADE_TESTES] [build] verificar se paginação existe e funciona.
04189. [QUALIDADE_TESTES] [build] verificar se filtros podem ser combinados.
04190. [QUALIDADE_TESTES] [build] verificar se dados null quebram a tela.
04191. [QUALIDADE_TESTES] [build] verificar se array vazio tem estado visual.
04192. [QUALIDADE_TESTES] [build] verificar se loading impede tela quebrada.
04193. [QUALIDADE_TESTES] [build] verificar se modal fecha corretamente.
04194. [QUALIDADE_TESTES] [build] verificar se header não sobrepõe conteúdo.
04195. [QUALIDADE_TESTES] [build] verificar se layout é responsivo.
04196. [QUALIDADE_TESTES] [build] verificar se contraste é legível.
04197. [QUALIDADE_TESTES] [build] verificar se texto é humano e não técnico.
04198. [QUALIDADE_TESTES] [build] verificar se existe teste manual possível.
04199. [QUALIDADE_TESTES] [build] classificar severidade.
04200. [QUALIDADE_TESTES] [build] propor correção com risco estimado.

### QUALIDADE_TESTES / unit tests
04201. [QUALIDADE_TESTES] [unit tests] identificar arquivo responsável.
04202. [QUALIDADE_TESTES] [unit tests] identificar dependências diretas.
04203. [QUALIDADE_TESTES] [unit tests] identificar dependências indiretas.
04204. [QUALIDADE_TESTES] [unit tests] verificar se há código morto.
04205. [QUALIDADE_TESTES] [unit tests] verificar se há import não usado.
04206. [QUALIDADE_TESTES] [unit tests] verificar se há variável indefinida.
04207. [QUALIDADE_TESTES] [unit tests] verificar se há duplicação de lógica.
04208. [QUALIDADE_TESTES] [unit tests] verificar se há comentário desatualizado.
04209. [QUALIDADE_TESTES] [unit tests] verificar se a regra de negócio está clara.
04210. [QUALIDADE_TESTES] [unit tests] verificar se há tratamento de erro.
04211. [QUALIDADE_TESTES] [unit tests] verificar se o erro é amigável para usuário comum.
04212. [QUALIDADE_TESTES] [unit tests] verificar se erro técnico fica apenas no console ou relatório.
04213. [QUALIDADE_TESTES] [unit tests] verificar se há validação de entrada.
04214. [QUALIDADE_TESTES] [unit tests] verificar se há validação de saída.
04215. [QUALIDADE_TESTES] [unit tests] verificar se há validação de permissão.
04216. [QUALIDADE_TESTES] [unit tests] verificar se há risco de acesso indevido.
04217. [QUALIDADE_TESTES] [unit tests] verificar se há risco de dados de outro usuário.
04218. [QUALIDADE_TESTES] [unit tests] verificar se há risco de SQL injection.
04219. [QUALIDADE_TESTES] [unit tests] verificar se há risco de XSS.
04220. [QUALIDADE_TESTES] [unit tests] verificar se há risco de upload inseguro.
04221. [QUALIDADE_TESTES] [unit tests] verificar se imagens têm fallback correto.
04222. [QUALIDADE_TESTES] [unit tests] verificar se /core.png aparece como placeholder.
04223. [QUALIDADE_TESTES] [unit tests] verificar se /logo.png está disponível.
04224. [QUALIDADE_TESTES] [unit tests] verificar se rotas batem entre front e back.
04225. [QUALIDADE_TESTES] [unit tests] verificar se payload esperado bate com payload real.
04226. [QUALIDADE_TESTES] [unit tests] verificar se campos do banco batem com model.
04227. [QUALIDADE_TESTES] [unit tests] verificar se controller retorna padrão consistente.
04228. [QUALIDADE_TESTES] [unit tests] verificar se paginação existe e funciona.
04229. [QUALIDADE_TESTES] [unit tests] verificar se filtros podem ser combinados.
04230. [QUALIDADE_TESTES] [unit tests] verificar se dados null quebram a tela.
04231. [QUALIDADE_TESTES] [unit tests] verificar se array vazio tem estado visual.
04232. [QUALIDADE_TESTES] [unit tests] verificar se loading impede tela quebrada.
04233. [QUALIDADE_TESTES] [unit tests] verificar se modal fecha corretamente.
04234. [QUALIDADE_TESTES] [unit tests] verificar se header não sobrepõe conteúdo.
04235. [QUALIDADE_TESTES] [unit tests] verificar se layout é responsivo.
04236. [QUALIDADE_TESTES] [unit tests] verificar se contraste é legível.
04237. [QUALIDADE_TESTES] [unit tests] verificar se texto é humano e não técnico.
04238. [QUALIDADE_TESTES] [unit tests] verificar se existe teste manual possível.
04239. [QUALIDADE_TESTES] [unit tests] classificar severidade.
04240. [QUALIDADE_TESTES] [unit tests] propor correção com risco estimado.

### QUALIDADE_TESTES / integration tests
04241. [QUALIDADE_TESTES] [integration tests] identificar arquivo responsável.
04242. [QUALIDADE_TESTES] [integration tests] identificar dependências diretas.
04243. [QUALIDADE_TESTES] [integration tests] identificar dependências indiretas.
04244. [QUALIDADE_TESTES] [integration tests] verificar se há código morto.
04245. [QUALIDADE_TESTES] [integration tests] verificar se há import não usado.
04246. [QUALIDADE_TESTES] [integration tests] verificar se há variável indefinida.
04247. [QUALIDADE_TESTES] [integration tests] verificar se há duplicação de lógica.
04248. [QUALIDADE_TESTES] [integration tests] verificar se há comentário desatualizado.
04249. [QUALIDADE_TESTES] [integration tests] verificar se a regra de negócio está clara.
04250. [QUALIDADE_TESTES] [integration tests] verificar se há tratamento de erro.
04251. [QUALIDADE_TESTES] [integration tests] verificar se o erro é amigável para usuário comum.
04252. [QUALIDADE_TESTES] [integration tests] verificar se erro técnico fica apenas no console ou relatório.
04253. [QUALIDADE_TESTES] [integration tests] verificar se há validação de entrada.
04254. [QUALIDADE_TESTES] [integration tests] verificar se há validação de saída.
04255. [QUALIDADE_TESTES] [integration tests] verificar se há validação de permissão.
04256. [QUALIDADE_TESTES] [integration tests] verificar se há risco de acesso indevido.
04257. [QUALIDADE_TESTES] [integration tests] verificar se há risco de dados de outro usuário.
04258. [QUALIDADE_TESTES] [integration tests] verificar se há risco de SQL injection.
04259. [QUALIDADE_TESTES] [integration tests] verificar se há risco de XSS.
04260. [QUALIDADE_TESTES] [integration tests] verificar se há risco de upload inseguro.
04261. [QUALIDADE_TESTES] [integration tests] verificar se imagens têm fallback correto.
04262. [QUALIDADE_TESTES] [integration tests] verificar se /core.png aparece como placeholder.
04263. [QUALIDADE_TESTES] [integration tests] verificar se /logo.png está disponível.
04264. [QUALIDADE_TESTES] [integration tests] verificar se rotas batem entre front e back.
04265. [QUALIDADE_TESTES] [integration tests] verificar se payload esperado bate com payload real.
04266. [QUALIDADE_TESTES] [integration tests] verificar se campos do banco batem com model.
04267. [QUALIDADE_TESTES] [integration tests] verificar se controller retorna padrão consistente.
04268. [QUALIDADE_TESTES] [integration tests] verificar se paginação existe e funciona.
04269. [QUALIDADE_TESTES] [integration tests] verificar se filtros podem ser combinados.
04270. [QUALIDADE_TESTES] [integration tests] verificar se dados null quebram a tela.
04271. [QUALIDADE_TESTES] [integration tests] verificar se array vazio tem estado visual.
04272. [QUALIDADE_TESTES] [integration tests] verificar se loading impede tela quebrada.
04273. [QUALIDADE_TESTES] [integration tests] verificar se modal fecha corretamente.
04274. [QUALIDADE_TESTES] [integration tests] verificar se header não sobrepõe conteúdo.
04275. [QUALIDADE_TESTES] [integration tests] verificar se layout é responsivo.
04276. [QUALIDADE_TESTES] [integration tests] verificar se contraste é legível.
04277. [QUALIDADE_TESTES] [integration tests] verificar se texto é humano e não técnico.
04278. [QUALIDADE_TESTES] [integration tests] verificar se existe teste manual possível.
04279. [QUALIDADE_TESTES] [integration tests] classificar severidade.
04280. [QUALIDADE_TESTES] [integration tests] propor correção com risco estimado.

### QUALIDADE_TESTES / manual tests
04281. [QUALIDADE_TESTES] [manual tests] identificar arquivo responsável.
04282. [QUALIDADE_TESTES] [manual tests] identificar dependências diretas.
04283. [QUALIDADE_TESTES] [manual tests] identificar dependências indiretas.
04284. [QUALIDADE_TESTES] [manual tests] verificar se há código morto.
04285. [QUALIDADE_TESTES] [manual tests] verificar se há import não usado.
04286. [QUALIDADE_TESTES] [manual tests] verificar se há variável indefinida.
04287. [QUALIDADE_TESTES] [manual tests] verificar se há duplicação de lógica.
04288. [QUALIDADE_TESTES] [manual tests] verificar se há comentário desatualizado.
04289. [QUALIDADE_TESTES] [manual tests] verificar se a regra de negócio está clara.
04290. [QUALIDADE_TESTES] [manual tests] verificar se há tratamento de erro.
04291. [QUALIDADE_TESTES] [manual tests] verificar se o erro é amigável para usuário comum.
04292. [QUALIDADE_TESTES] [manual tests] verificar se erro técnico fica apenas no console ou relatório.
04293. [QUALIDADE_TESTES] [manual tests] verificar se há validação de entrada.
04294. [QUALIDADE_TESTES] [manual tests] verificar se há validação de saída.
04295. [QUALIDADE_TESTES] [manual tests] verificar se há validação de permissão.
04296. [QUALIDADE_TESTES] [manual tests] verificar se há risco de acesso indevido.
04297. [QUALIDADE_TESTES] [manual tests] verificar se há risco de dados de outro usuário.
04298. [QUALIDADE_TESTES] [manual tests] verificar se há risco de SQL injection.
04299. [QUALIDADE_TESTES] [manual tests] verificar se há risco de XSS.
04300. [QUALIDADE_TESTES] [manual tests] verificar se há risco de upload inseguro.
04301. [QUALIDADE_TESTES] [manual tests] verificar se imagens têm fallback correto.
04302. [QUALIDADE_TESTES] [manual tests] verificar se /core.png aparece como placeholder.
04303. [QUALIDADE_TESTES] [manual tests] verificar se /logo.png está disponível.
04304. [QUALIDADE_TESTES] [manual tests] verificar se rotas batem entre front e back.
04305. [QUALIDADE_TESTES] [manual tests] verificar se payload esperado bate com payload real.
04306. [QUALIDADE_TESTES] [manual tests] verificar se campos do banco batem com model.
04307. [QUALIDADE_TESTES] [manual tests] verificar se controller retorna padrão consistente.
04308. [QUALIDADE_TESTES] [manual tests] verificar se paginação existe e funciona.
04309. [QUALIDADE_TESTES] [manual tests] verificar se filtros podem ser combinados.
04310. [QUALIDADE_TESTES] [manual tests] verificar se dados null quebram a tela.
04311. [QUALIDADE_TESTES] [manual tests] verificar se array vazio tem estado visual.
04312. [QUALIDADE_TESTES] [manual tests] verificar se loading impede tela quebrada.
04313. [QUALIDADE_TESTES] [manual tests] verificar se modal fecha corretamente.
04314. [QUALIDADE_TESTES] [manual tests] verificar se header não sobrepõe conteúdo.
04315. [QUALIDADE_TESTES] [manual tests] verificar se layout é responsivo.
04316. [QUALIDADE_TESTES] [manual tests] verificar se contraste é legível.
04317. [QUALIDADE_TESTES] [manual tests] verificar se texto é humano e não técnico.
04318. [QUALIDADE_TESTES] [manual tests] verificar se existe teste manual possível.
04319. [QUALIDADE_TESTES] [manual tests] classificar severidade.
04320. [QUALIDADE_TESTES] [manual tests] propor correção com risco estimado.

### QUALIDADE_TESTES / edge cases
04321. [QUALIDADE_TESTES] [edge cases] identificar arquivo responsável.
04322. [QUALIDADE_TESTES] [edge cases] identificar dependências diretas.
04323. [QUALIDADE_TESTES] [edge cases] identificar dependências indiretas.
04324. [QUALIDADE_TESTES] [edge cases] verificar se há código morto.
04325. [QUALIDADE_TESTES] [edge cases] verificar se há import não usado.
04326. [QUALIDADE_TESTES] [edge cases] verificar se há variável indefinida.
04327. [QUALIDADE_TESTES] [edge cases] verificar se há duplicação de lógica.
04328. [QUALIDADE_TESTES] [edge cases] verificar se há comentário desatualizado.
04329. [QUALIDADE_TESTES] [edge cases] verificar se a regra de negócio está clara.
04330. [QUALIDADE_TESTES] [edge cases] verificar se há tratamento de erro.
04331. [QUALIDADE_TESTES] [edge cases] verificar se o erro é amigável para usuário comum.
04332. [QUALIDADE_TESTES] [edge cases] verificar se erro técnico fica apenas no console ou relatório.
04333. [QUALIDADE_TESTES] [edge cases] verificar se há validação de entrada.
04334. [QUALIDADE_TESTES] [edge cases] verificar se há validação de saída.
04335. [QUALIDADE_TESTES] [edge cases] verificar se há validação de permissão.
04336. [QUALIDADE_TESTES] [edge cases] verificar se há risco de acesso indevido.
04337. [QUALIDADE_TESTES] [edge cases] verificar se há risco de dados de outro usuário.
04338. [QUALIDADE_TESTES] [edge cases] verificar se há risco de SQL injection.
04339. [QUALIDADE_TESTES] [edge cases] verificar se há risco de XSS.
04340. [QUALIDADE_TESTES] [edge cases] verificar se há risco de upload inseguro.
04341. [QUALIDADE_TESTES] [edge cases] verificar se imagens têm fallback correto.
04342. [QUALIDADE_TESTES] [edge cases] verificar se /core.png aparece como placeholder.
04343. [QUALIDADE_TESTES] [edge cases] verificar se /logo.png está disponível.
04344. [QUALIDADE_TESTES] [edge cases] verificar se rotas batem entre front e back.
04345. [QUALIDADE_TESTES] [edge cases] verificar se payload esperado bate com payload real.
04346. [QUALIDADE_TESTES] [edge cases] verificar se campos do banco batem com model.
04347. [QUALIDADE_TESTES] [edge cases] verificar se controller retorna padrão consistente.
04348. [QUALIDADE_TESTES] [edge cases] verificar se paginação existe e funciona.
04349. [QUALIDADE_TESTES] [edge cases] verificar se filtros podem ser combinados.
04350. [QUALIDADE_TESTES] [edge cases] verificar se dados null quebram a tela.
04351. [QUALIDADE_TESTES] [edge cases] verificar se array vazio tem estado visual.
04352. [QUALIDADE_TESTES] [edge cases] verificar se loading impede tela quebrada.
04353. [QUALIDADE_TESTES] [edge cases] verificar se modal fecha corretamente.
04354. [QUALIDADE_TESTES] [edge cases] verificar se header não sobrepõe conteúdo.
04355. [QUALIDADE_TESTES] [edge cases] verificar se layout é responsivo.
04356. [QUALIDADE_TESTES] [edge cases] verificar se contraste é legível.
04357. [QUALIDADE_TESTES] [edge cases] verificar se texto é humano e não técnico.
04358. [QUALIDADE_TESTES] [edge cases] verificar se existe teste manual possível.
04359. [QUALIDADE_TESTES] [edge cases] classificar severidade.
04360. [QUALIDADE_TESTES] [edge cases] propor correção com risco estimado.

### QUALIDADE_TESTES / regression tests
04361. [QUALIDADE_TESTES] [regression tests] identificar arquivo responsável.
04362. [QUALIDADE_TESTES] [regression tests] identificar dependências diretas.
04363. [QUALIDADE_TESTES] [regression tests] identificar dependências indiretas.
04364. [QUALIDADE_TESTES] [regression tests] verificar se há código morto.
04365. [QUALIDADE_TESTES] [regression tests] verificar se há import não usado.
04366. [QUALIDADE_TESTES] [regression tests] verificar se há variável indefinida.
04367. [QUALIDADE_TESTES] [regression tests] verificar se há duplicação de lógica.
04368. [QUALIDADE_TESTES] [regression tests] verificar se há comentário desatualizado.
04369. [QUALIDADE_TESTES] [regression tests] verificar se a regra de negócio está clara.
04370. [QUALIDADE_TESTES] [regression tests] verificar se há tratamento de erro.
04371. [QUALIDADE_TESTES] [regression tests] verificar se o erro é amigável para usuário comum.
04372. [QUALIDADE_TESTES] [regression tests] verificar se erro técnico fica apenas no console ou relatório.
04373. [QUALIDADE_TESTES] [regression tests] verificar se há validação de entrada.
04374. [QUALIDADE_TESTES] [regression tests] verificar se há validação de saída.
04375. [QUALIDADE_TESTES] [regression tests] verificar se há validação de permissão.
04376. [QUALIDADE_TESTES] [regression tests] verificar se há risco de acesso indevido.
04377. [QUALIDADE_TESTES] [regression tests] verificar se há risco de dados de outro usuário.
04378. [QUALIDADE_TESTES] [regression tests] verificar se há risco de SQL injection.
04379. [QUALIDADE_TESTES] [regression tests] verificar se há risco de XSS.
04380. [QUALIDADE_TESTES] [regression tests] verificar se há risco de upload inseguro.
04381. [QUALIDADE_TESTES] [regression tests] verificar se imagens têm fallback correto.
04382. [QUALIDADE_TESTES] [regression tests] verificar se /core.png aparece como placeholder.
04383. [QUALIDADE_TESTES] [regression tests] verificar se /logo.png está disponível.
04384. [QUALIDADE_TESTES] [regression tests] verificar se rotas batem entre front e back.
04385. [QUALIDADE_TESTES] [regression tests] verificar se payload esperado bate com payload real.
04386. [QUALIDADE_TESTES] [regression tests] verificar se campos do banco batem com model.
04387. [QUALIDADE_TESTES] [regression tests] verificar se controller retorna padrão consistente.
04388. [QUALIDADE_TESTES] [regression tests] verificar se paginação existe e funciona.
04389. [QUALIDADE_TESTES] [regression tests] verificar se filtros podem ser combinados.
04390. [QUALIDADE_TESTES] [regression tests] verificar se dados null quebram a tela.
04391. [QUALIDADE_TESTES] [regression tests] verificar se array vazio tem estado visual.
04392. [QUALIDADE_TESTES] [regression tests] verificar se loading impede tela quebrada.
04393. [QUALIDADE_TESTES] [regression tests] verificar se modal fecha corretamente.
04394. [QUALIDADE_TESTES] [regression tests] verificar se header não sobrepõe conteúdo.
04395. [QUALIDADE_TESTES] [regression tests] verificar se layout é responsivo.
04396. [QUALIDADE_TESTES] [regression tests] verificar se contraste é legível.
04397. [QUALIDADE_TESTES] [regression tests] verificar se texto é humano e não técnico.
04398. [QUALIDADE_TESTES] [regression tests] verificar se existe teste manual possível.
04399. [QUALIDADE_TESTES] [regression tests] classificar severidade.
04400. [QUALIDADE_TESTES] [regression tests] propor correção com risco estimado.

### QUALIDADE_TESTES / accessibility tests
04401. [QUALIDADE_TESTES] [accessibility tests] identificar arquivo responsável.
04402. [QUALIDADE_TESTES] [accessibility tests] identificar dependências diretas.
04403. [QUALIDADE_TESTES] [accessibility tests] identificar dependências indiretas.
04404. [QUALIDADE_TESTES] [accessibility tests] verificar se há código morto.
04405. [QUALIDADE_TESTES] [accessibility tests] verificar se há import não usado.
04406. [QUALIDADE_TESTES] [accessibility tests] verificar se há variável indefinida.
04407. [QUALIDADE_TESTES] [accessibility tests] verificar se há duplicação de lógica.
04408. [QUALIDADE_TESTES] [accessibility tests] verificar se há comentário desatualizado.
04409. [QUALIDADE_TESTES] [accessibility tests] verificar se a regra de negócio está clara.
04410. [QUALIDADE_TESTES] [accessibility tests] verificar se há tratamento de erro.
04411. [QUALIDADE_TESTES] [accessibility tests] verificar se o erro é amigável para usuário comum.
04412. [QUALIDADE_TESTES] [accessibility tests] verificar se erro técnico fica apenas no console ou relatório.
04413. [QUALIDADE_TESTES] [accessibility tests] verificar se há validação de entrada.
04414. [QUALIDADE_TESTES] [accessibility tests] verificar se há validação de saída.
04415. [QUALIDADE_TESTES] [accessibility tests] verificar se há validação de permissão.
04416. [QUALIDADE_TESTES] [accessibility tests] verificar se há risco de acesso indevido.
04417. [QUALIDADE_TESTES] [accessibility tests] verificar se há risco de dados de outro usuário.
04418. [QUALIDADE_TESTES] [accessibility tests] verificar se há risco de SQL injection.
04419. [QUALIDADE_TESTES] [accessibility tests] verificar se há risco de XSS.
04420. [QUALIDADE_TESTES] [accessibility tests] verificar se há risco de upload inseguro.
04421. [QUALIDADE_TESTES] [accessibility tests] verificar se imagens têm fallback correto.
04422. [QUALIDADE_TESTES] [accessibility tests] verificar se /core.png aparece como placeholder.
04423. [QUALIDADE_TESTES] [accessibility tests] verificar se /logo.png está disponível.
04424. [QUALIDADE_TESTES] [accessibility tests] verificar se rotas batem entre front e back.
04425. [QUALIDADE_TESTES] [accessibility tests] verificar se payload esperado bate com payload real.
04426. [QUALIDADE_TESTES] [accessibility tests] verificar se campos do banco batem com model.
04427. [QUALIDADE_TESTES] [accessibility tests] verificar se controller retorna padrão consistente.
04428. [QUALIDADE_TESTES] [accessibility tests] verificar se paginação existe e funciona.
04429. [QUALIDADE_TESTES] [accessibility tests] verificar se filtros podem ser combinados.
04430. [QUALIDADE_TESTES] [accessibility tests] verificar se dados null quebram a tela.
04431. [QUALIDADE_TESTES] [accessibility tests] verificar se array vazio tem estado visual.
04432. [QUALIDADE_TESTES] [accessibility tests] verificar se loading impede tela quebrada.
04433. [QUALIDADE_TESTES] [accessibility tests] verificar se modal fecha corretamente.
04434. [QUALIDADE_TESTES] [accessibility tests] verificar se header não sobrepõe conteúdo.
04435. [QUALIDADE_TESTES] [accessibility tests] verificar se layout é responsivo.
04436. [QUALIDADE_TESTES] [accessibility tests] verificar se contraste é legível.
04437. [QUALIDADE_TESTES] [accessibility tests] verificar se texto é humano e não técnico.
04438. [QUALIDADE_TESTES] [accessibility tests] verificar se existe teste manual possível.
04439. [QUALIDADE_TESTES] [accessibility tests] classificar severidade.
04440. [QUALIDADE_TESTES] [accessibility tests] propor correção com risco estimado.

### QUALIDADE_TESTES / responsive tests
04441. [QUALIDADE_TESTES] [responsive tests] identificar arquivo responsável.
04442. [QUALIDADE_TESTES] [responsive tests] identificar dependências diretas.
04443. [QUALIDADE_TESTES] [responsive tests] identificar dependências indiretas.
04444. [QUALIDADE_TESTES] [responsive tests] verificar se há código morto.
04445. [QUALIDADE_TESTES] [responsive tests] verificar se há import não usado.
04446. [QUALIDADE_TESTES] [responsive tests] verificar se há variável indefinida.
04447. [QUALIDADE_TESTES] [responsive tests] verificar se há duplicação de lógica.
04448. [QUALIDADE_TESTES] [responsive tests] verificar se há comentário desatualizado.
04449. [QUALIDADE_TESTES] [responsive tests] verificar se a regra de negócio está clara.
04450. [QUALIDADE_TESTES] [responsive tests] verificar se há tratamento de erro.
04451. [QUALIDADE_TESTES] [responsive tests] verificar se o erro é amigável para usuário comum.
04452. [QUALIDADE_TESTES] [responsive tests] verificar se erro técnico fica apenas no console ou relatório.
04453. [QUALIDADE_TESTES] [responsive tests] verificar se há validação de entrada.
04454. [QUALIDADE_TESTES] [responsive tests] verificar se há validação de saída.
04455. [QUALIDADE_TESTES] [responsive tests] verificar se há validação de permissão.
04456. [QUALIDADE_TESTES] [responsive tests] verificar se há risco de acesso indevido.
04457. [QUALIDADE_TESTES] [responsive tests] verificar se há risco de dados de outro usuário.
04458. [QUALIDADE_TESTES] [responsive tests] verificar se há risco de SQL injection.
04459. [QUALIDADE_TESTES] [responsive tests] verificar se há risco de XSS.
04460. [QUALIDADE_TESTES] [responsive tests] verificar se há risco de upload inseguro.
04461. [QUALIDADE_TESTES] [responsive tests] verificar se imagens têm fallback correto.
04462. [QUALIDADE_TESTES] [responsive tests] verificar se /core.png aparece como placeholder.
04463. [QUALIDADE_TESTES] [responsive tests] verificar se /logo.png está disponível.
04464. [QUALIDADE_TESTES] [responsive tests] verificar se rotas batem entre front e back.
04465. [QUALIDADE_TESTES] [responsive tests] verificar se payload esperado bate com payload real.
04466. [QUALIDADE_TESTES] [responsive tests] verificar se campos do banco batem com model.
04467. [QUALIDADE_TESTES] [responsive tests] verificar se controller retorna padrão consistente.
04468. [QUALIDADE_TESTES] [responsive tests] verificar se paginação existe e funciona.
04469. [QUALIDADE_TESTES] [responsive tests] verificar se filtros podem ser combinados.
04470. [QUALIDADE_TESTES] [responsive tests] verificar se dados null quebram a tela.
04471. [QUALIDADE_TESTES] [responsive tests] verificar se array vazio tem estado visual.
04472. [QUALIDADE_TESTES] [responsive tests] verificar se loading impede tela quebrada.
04473. [QUALIDADE_TESTES] [responsive tests] verificar se modal fecha corretamente.
04474. [QUALIDADE_TESTES] [responsive tests] verificar se header não sobrepõe conteúdo.
04475. [QUALIDADE_TESTES] [responsive tests] verificar se layout é responsivo.
04476. [QUALIDADE_TESTES] [responsive tests] verificar se contraste é legível.
04477. [QUALIDADE_TESTES] [responsive tests] verificar se texto é humano e não técnico.
04478. [QUALIDADE_TESTES] [responsive tests] verificar se existe teste manual possível.
04479. [QUALIDADE_TESTES] [responsive tests] classificar severidade.
04480. [QUALIDADE_TESTES] [responsive tests] propor correção com risco estimado.

### QUALIDADE_TESTES / API tests
04481. [QUALIDADE_TESTES] [API tests] identificar arquivo responsável.
04482. [QUALIDADE_TESTES] [API tests] identificar dependências diretas.
04483. [QUALIDADE_TESTES] [API tests] identificar dependências indiretas.
04484. [QUALIDADE_TESTES] [API tests] verificar se há código morto.
04485. [QUALIDADE_TESTES] [API tests] verificar se há import não usado.
04486. [QUALIDADE_TESTES] [API tests] verificar se há variável indefinida.
04487. [QUALIDADE_TESTES] [API tests] verificar se há duplicação de lógica.
04488. [QUALIDADE_TESTES] [API tests] verificar se há comentário desatualizado.
04489. [QUALIDADE_TESTES] [API tests] verificar se a regra de negócio está clara.
04490. [QUALIDADE_TESTES] [API tests] verificar se há tratamento de erro.
04491. [QUALIDADE_TESTES] [API tests] verificar se o erro é amigável para usuário comum.
04492. [QUALIDADE_TESTES] [API tests] verificar se erro técnico fica apenas no console ou relatório.
04493. [QUALIDADE_TESTES] [API tests] verificar se há validação de entrada.
04494. [QUALIDADE_TESTES] [API tests] verificar se há validação de saída.
04495. [QUALIDADE_TESTES] [API tests] verificar se há validação de permissão.
04496. [QUALIDADE_TESTES] [API tests] verificar se há risco de acesso indevido.
04497. [QUALIDADE_TESTES] [API tests] verificar se há risco de dados de outro usuário.
04498. [QUALIDADE_TESTES] [API tests] verificar se há risco de SQL injection.
04499. [QUALIDADE_TESTES] [API tests] verificar se há risco de XSS.
04500. [QUALIDADE_TESTES] [API tests] verificar se há risco de upload inseguro.
04501. [QUALIDADE_TESTES] [API tests] verificar se imagens têm fallback correto.
04502. [QUALIDADE_TESTES] [API tests] verificar se /core.png aparece como placeholder.
04503. [QUALIDADE_TESTES] [API tests] verificar se /logo.png está disponível.
04504. [QUALIDADE_TESTES] [API tests] verificar se rotas batem entre front e back.
04505. [QUALIDADE_TESTES] [API tests] verificar se payload esperado bate com payload real.
04506. [QUALIDADE_TESTES] [API tests] verificar se campos do banco batem com model.
04507. [QUALIDADE_TESTES] [API tests] verificar se controller retorna padrão consistente.
04508. [QUALIDADE_TESTES] [API tests] verificar se paginação existe e funciona.
04509. [QUALIDADE_TESTES] [API tests] verificar se filtros podem ser combinados.
04510. [QUALIDADE_TESTES] [API tests] verificar se dados null quebram a tela.
04511. [QUALIDADE_TESTES] [API tests] verificar se array vazio tem estado visual.
04512. [QUALIDADE_TESTES] [API tests] verificar se loading impede tela quebrada.
04513. [QUALIDADE_TESTES] [API tests] verificar se modal fecha corretamente.
04514. [QUALIDADE_TESTES] [API tests] verificar se header não sobrepõe conteúdo.
04515. [QUALIDADE_TESTES] [API tests] verificar se layout é responsivo.
04516. [QUALIDADE_TESTES] [API tests] verificar se contraste é legível.
04517. [QUALIDADE_TESTES] [API tests] verificar se texto é humano e não técnico.
04518. [QUALIDADE_TESTES] [API tests] verificar se existe teste manual possível.
04519. [QUALIDADE_TESTES] [API tests] classificar severidade.
04520. [QUALIDADE_TESTES] [API tests] propor correção com risco estimado.

### QUALIDADE_TESTES / database tests
04521. [QUALIDADE_TESTES] [database tests] identificar arquivo responsável.
04522. [QUALIDADE_TESTES] [database tests] identificar dependências diretas.
04523. [QUALIDADE_TESTES] [database tests] identificar dependências indiretas.
04524. [QUALIDADE_TESTES] [database tests] verificar se há código morto.
04525. [QUALIDADE_TESTES] [database tests] verificar se há import não usado.
04526. [QUALIDADE_TESTES] [database tests] verificar se há variável indefinida.
04527. [QUALIDADE_TESTES] [database tests] verificar se há duplicação de lógica.
04528. [QUALIDADE_TESTES] [database tests] verificar se há comentário desatualizado.
04529. [QUALIDADE_TESTES] [database tests] verificar se a regra de negócio está clara.
04530. [QUALIDADE_TESTES] [database tests] verificar se há tratamento de erro.
04531. [QUALIDADE_TESTES] [database tests] verificar se o erro é amigável para usuário comum.
04532. [QUALIDADE_TESTES] [database tests] verificar se erro técnico fica apenas no console ou relatório.
04533. [QUALIDADE_TESTES] [database tests] verificar se há validação de entrada.
04534. [QUALIDADE_TESTES] [database tests] verificar se há validação de saída.
04535. [QUALIDADE_TESTES] [database tests] verificar se há validação de permissão.
04536. [QUALIDADE_TESTES] [database tests] verificar se há risco de acesso indevido.
04537. [QUALIDADE_TESTES] [database tests] verificar se há risco de dados de outro usuário.
04538. [QUALIDADE_TESTES] [database tests] verificar se há risco de SQL injection.
04539. [QUALIDADE_TESTES] [database tests] verificar se há risco de XSS.
04540. [QUALIDADE_TESTES] [database tests] verificar se há risco de upload inseguro.
04541. [QUALIDADE_TESTES] [database tests] verificar se imagens têm fallback correto.
04542. [QUALIDADE_TESTES] [database tests] verificar se /core.png aparece como placeholder.
04543. [QUALIDADE_TESTES] [database tests] verificar se /logo.png está disponível.
04544. [QUALIDADE_TESTES] [database tests] verificar se rotas batem entre front e back.
04545. [QUALIDADE_TESTES] [database tests] verificar se payload esperado bate com payload real.
04546. [QUALIDADE_TESTES] [database tests] verificar se campos do banco batem com model.
04547. [QUALIDADE_TESTES] [database tests] verificar se controller retorna padrão consistente.
04548. [QUALIDADE_TESTES] [database tests] verificar se paginação existe e funciona.
04549. [QUALIDADE_TESTES] [database tests] verificar se filtros podem ser combinados.
04550. [QUALIDADE_TESTES] [database tests] verificar se dados null quebram a tela.
04551. [QUALIDADE_TESTES] [database tests] verificar se array vazio tem estado visual.
04552. [QUALIDADE_TESTES] [database tests] verificar se loading impede tela quebrada.
04553. [QUALIDADE_TESTES] [database tests] verificar se modal fecha corretamente.
04554. [QUALIDADE_TESTES] [database tests] verificar se header não sobrepõe conteúdo.
04555. [QUALIDADE_TESTES] [database tests] verificar se layout é responsivo.
04556. [QUALIDADE_TESTES] [database tests] verificar se contraste é legível.
04557. [QUALIDADE_TESTES] [database tests] verificar se texto é humano e não técnico.
04558. [QUALIDADE_TESTES] [database tests] verificar se existe teste manual possível.
04559. [QUALIDADE_TESTES] [database tests] classificar severidade.
04560. [QUALIDADE_TESTES] [database tests] propor correção com risco estimado.

### QUALIDADE_TESTES / upload tests
04561. [QUALIDADE_TESTES] [upload tests] identificar arquivo responsável.
04562. [QUALIDADE_TESTES] [upload tests] identificar dependências diretas.
04563. [QUALIDADE_TESTES] [upload tests] identificar dependências indiretas.
04564. [QUALIDADE_TESTES] [upload tests] verificar se há código morto.
04565. [QUALIDADE_TESTES] [upload tests] verificar se há import não usado.
04566. [QUALIDADE_TESTES] [upload tests] verificar se há variável indefinida.
04567. [QUALIDADE_TESTES] [upload tests] verificar se há duplicação de lógica.
04568. [QUALIDADE_TESTES] [upload tests] verificar se há comentário desatualizado.
04569. [QUALIDADE_TESTES] [upload tests] verificar se a regra de negócio está clara.
04570. [QUALIDADE_TESTES] [upload tests] verificar se há tratamento de erro.
04571. [QUALIDADE_TESTES] [upload tests] verificar se o erro é amigável para usuário comum.
04572. [QUALIDADE_TESTES] [upload tests] verificar se erro técnico fica apenas no console ou relatório.
04573. [QUALIDADE_TESTES] [upload tests] verificar se há validação de entrada.
04574. [QUALIDADE_TESTES] [upload tests] verificar se há validação de saída.
04575. [QUALIDADE_TESTES] [upload tests] verificar se há validação de permissão.
04576. [QUALIDADE_TESTES] [upload tests] verificar se há risco de acesso indevido.
04577. [QUALIDADE_TESTES] [upload tests] verificar se há risco de dados de outro usuário.
04578. [QUALIDADE_TESTES] [upload tests] verificar se há risco de SQL injection.
04579. [QUALIDADE_TESTES] [upload tests] verificar se há risco de XSS.
04580. [QUALIDADE_TESTES] [upload tests] verificar se há risco de upload inseguro.
04581. [QUALIDADE_TESTES] [upload tests] verificar se imagens têm fallback correto.
04582. [QUALIDADE_TESTES] [upload tests] verificar se /core.png aparece como placeholder.
04583. [QUALIDADE_TESTES] [upload tests] verificar se /logo.png está disponível.
04584. [QUALIDADE_TESTES] [upload tests] verificar se rotas batem entre front e back.
04585. [QUALIDADE_TESTES] [upload tests] verificar se payload esperado bate com payload real.
04586. [QUALIDADE_TESTES] [upload tests] verificar se campos do banco batem com model.
04587. [QUALIDADE_TESTES] [upload tests] verificar se controller retorna padrão consistente.
04588. [QUALIDADE_TESTES] [upload tests] verificar se paginação existe e funciona.
04589. [QUALIDADE_TESTES] [upload tests] verificar se filtros podem ser combinados.
04590. [QUALIDADE_TESTES] [upload tests] verificar se dados null quebram a tela.
04591. [QUALIDADE_TESTES] [upload tests] verificar se array vazio tem estado visual.
04592. [QUALIDADE_TESTES] [upload tests] verificar se loading impede tela quebrada.
04593. [QUALIDADE_TESTES] [upload tests] verificar se modal fecha corretamente.
04594. [QUALIDADE_TESTES] [upload tests] verificar se header não sobrepõe conteúdo.
04595. [QUALIDADE_TESTES] [upload tests] verificar se layout é responsivo.
04596. [QUALIDADE_TESTES] [upload tests] verificar se contraste é legível.
04597. [QUALIDADE_TESTES] [upload tests] verificar se texto é humano e não técnico.
04598. [QUALIDADE_TESTES] [upload tests] verificar se existe teste manual possível.
04599. [QUALIDADE_TESTES] [upload tests] classificar severidade.
04600. [QUALIDADE_TESTES] [upload tests] propor correção com risco estimado.

### QUALIDADE_TESTES / auth tests
04601. [QUALIDADE_TESTES] [auth tests] identificar arquivo responsável.
04602. [QUALIDADE_TESTES] [auth tests] identificar dependências diretas.
04603. [QUALIDADE_TESTES] [auth tests] identificar dependências indiretas.
04604. [QUALIDADE_TESTES] [auth tests] verificar se há código morto.
04605. [QUALIDADE_TESTES] [auth tests] verificar se há import não usado.
04606. [QUALIDADE_TESTES] [auth tests] verificar se há variável indefinida.
04607. [QUALIDADE_TESTES] [auth tests] verificar se há duplicação de lógica.
04608. [QUALIDADE_TESTES] [auth tests] verificar se há comentário desatualizado.
04609. [QUALIDADE_TESTES] [auth tests] verificar se a regra de negócio está clara.
04610. [QUALIDADE_TESTES] [auth tests] verificar se há tratamento de erro.
04611. [QUALIDADE_TESTES] [auth tests] verificar se o erro é amigável para usuário comum.
04612. [QUALIDADE_TESTES] [auth tests] verificar se erro técnico fica apenas no console ou relatório.
04613. [QUALIDADE_TESTES] [auth tests] verificar se há validação de entrada.
04614. [QUALIDADE_TESTES] [auth tests] verificar se há validação de saída.
04615. [QUALIDADE_TESTES] [auth tests] verificar se há validação de permissão.
04616. [QUALIDADE_TESTES] [auth tests] verificar se há risco de acesso indevido.
04617. [QUALIDADE_TESTES] [auth tests] verificar se há risco de dados de outro usuário.
04618. [QUALIDADE_TESTES] [auth tests] verificar se há risco de SQL injection.
04619. [QUALIDADE_TESTES] [auth tests] verificar se há risco de XSS.
04620. [QUALIDADE_TESTES] [auth tests] verificar se há risco de upload inseguro.
04621. [QUALIDADE_TESTES] [auth tests] verificar se imagens têm fallback correto.
04622. [QUALIDADE_TESTES] [auth tests] verificar se /core.png aparece como placeholder.
04623. [QUALIDADE_TESTES] [auth tests] verificar se /logo.png está disponível.
04624. [QUALIDADE_TESTES] [auth tests] verificar se rotas batem entre front e back.
04625. [QUALIDADE_TESTES] [auth tests] verificar se payload esperado bate com payload real.
04626. [QUALIDADE_TESTES] [auth tests] verificar se campos do banco batem com model.
04627. [QUALIDADE_TESTES] [auth tests] verificar se controller retorna padrão consistente.
04628. [QUALIDADE_TESTES] [auth tests] verificar se paginação existe e funciona.
04629. [QUALIDADE_TESTES] [auth tests] verificar se filtros podem ser combinados.
04630. [QUALIDADE_TESTES] [auth tests] verificar se dados null quebram a tela.
04631. [QUALIDADE_TESTES] [auth tests] verificar se array vazio tem estado visual.
04632. [QUALIDADE_TESTES] [auth tests] verificar se loading impede tela quebrada.
04633. [QUALIDADE_TESTES] [auth tests] verificar se modal fecha corretamente.
04634. [QUALIDADE_TESTES] [auth tests] verificar se header não sobrepõe conteúdo.
04635. [QUALIDADE_TESTES] [auth tests] verificar se layout é responsivo.
04636. [QUALIDADE_TESTES] [auth tests] verificar se contraste é legível.
04637. [QUALIDADE_TESTES] [auth tests] verificar se texto é humano e não técnico.
04638. [QUALIDADE_TESTES] [auth tests] verificar se existe teste manual possível.
04639. [QUALIDADE_TESTES] [auth tests] classificar severidade.
04640. [QUALIDADE_TESTES] [auth tests] propor correção com risco estimado.

---

## 7. Revisões focadas obrigatórias

### REVISÃO_FRONTEND_ROTAS
04641. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada pasta de rota do App Router sob a ótica de existência.
04642. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada pasta de rota do App Router sob a ótica de consistência.
04643. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada pasta de rota do App Router sob a ótica de risco.
04644. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada pasta de rota do App Router sob a ótica de impacto.
04645. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada pasta de rota do App Router sob a ótica de teste recomendado.
04646. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada page.jsx sob a ótica de existência.
04647. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada page.jsx sob a ótica de consistência.
04648. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada page.jsx sob a ótica de risco.
04649. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada page.jsx sob a ótica de impacto.
04650. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada page.jsx sob a ótica de teste recomendado.
04651. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada layout.jsx sob a ótica de existência.
04652. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada layout.jsx sob a ótica de consistência.
04653. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada layout.jsx sob a ótica de risco.
04654. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada layout.jsx sob a ótica de impacto.
04655. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada layout.jsx sob a ótica de teste recomendado.
04656. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada loading.js sob a ótica de existência.
04657. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada loading.js sob a ótica de consistência.
04658. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada loading.js sob a ótica de risco.
04659. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada loading.js sob a ótica de impacto.
04660. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada loading.js sob a ótica de teste recomendado.
04661. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada not-found.jsx sob a ótica de existência.
04662. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada not-found.jsx sob a ótica de consistência.
04663. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada not-found.jsx sob a ótica de risco.
04664. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada not-found.jsx sob a ótica de impacto.
04665. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada not-found.jsx sob a ótica de teste recomendado.
04666. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada componente usado por rota sob a ótica de existência.
04667. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada componente usado por rota sob a ótica de consistência.
04668. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada componente usado por rota sob a ótica de risco.
04669. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada componente usado por rota sob a ótica de impacto.
04670. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear cada componente usado por rota sob a ótica de teste recomendado.
04671. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas públicas sob a ótica de existência.
04672. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas públicas sob a ótica de consistência.
04673. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas públicas sob a ótica de risco.
04674. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas públicas sob a ótica de impacto.
04675. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas públicas sob a ótica de teste recomendado.
04676. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas protegidas sob a ótica de existência.
04677. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas protegidas sob a ótica de consistência.
04678. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas protegidas sob a ótica de risco.
04679. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas protegidas sob a ótica de impacto.
04680. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas protegidas sob a ótica de teste recomendado.
04681. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas admin sob a ótica de existência.
04682. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas admin sob a ótica de consistência.
04683. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas admin sob a ótica de risco.
04684. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas admin sob a ótica de impacto.
04685. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas admin sob a ótica de teste recomendado.
04686. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas fornecedor sob a ótica de existência.
04687. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas fornecedor sob a ótica de consistência.
04688. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas fornecedor sob a ótica de risco.
04689. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas fornecedor sob a ótica de impacto.
04690. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas fornecedor sob a ótica de teste recomendado.
04691. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas cliente comum sob a ótica de existência.
04692. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas cliente comum sob a ótica de consistência.
04693. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas cliente comum sob a ótica de risco.
04694. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas cliente comum sob a ótica de impacto.
04695. [REVISÃO_FRONTEND_ROTAS] Revisar Mapear rotas cliente comum sob a ótica de teste recomendado.
04696. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar redirect esperado sob a ótica de existência.
04697. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar redirect esperado sob a ótica de consistência.
04698. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar redirect esperado sob a ótica de risco.
04699. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar redirect esperado sob a ótica de impacto.
04700. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar redirect esperado sob a ótica de teste recomendado.
04701. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar token necessário sob a ótica de existência.
04702. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar token necessário sob a ótica de consistência.
04703. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar token necessário sob a ótica de risco.
04704. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar token necessário sob a ótica de impacto.
04705. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar token necessário sob a ótica de teste recomendado.
04706. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar tipo de usuário necessário sob a ótica de existência.
04707. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar tipo de usuário necessário sob a ótica de consistência.
04708. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar tipo de usuário necessário sob a ótica de risco.
04709. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar tipo de usuário necessário sob a ótica de impacto.
04710. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar tipo de usuário necessário sob a ótica de teste recomendado.
04711. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar endpoints usados sob a ótica de existência.
04712. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar endpoints usados sob a ótica de consistência.
04713. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar endpoints usados sob a ótica de risco.
04714. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar endpoints usados sob a ótica de impacto.
04715. [REVISÃO_FRONTEND_ROTAS] Revisar Registrar endpoints usados sob a ótica de teste recomendado.

### REVISÃO_BACKEND_ROTAS
04716. [REVISÃO_BACKEND_ROTAS] Revisar Mapear todos os routers Express sob a ótica de existência.
04717. [REVISÃO_BACKEND_ROTAS] Revisar Mapear todos os routers Express sob a ótica de consistência.
04718. [REVISÃO_BACKEND_ROTAS] Revisar Mapear todos os routers Express sob a ótica de risco.
04719. [REVISÃO_BACKEND_ROTAS] Revisar Mapear todos os routers Express sob a ótica de impacto.
04720. [REVISÃO_BACKEND_ROTAS] Revisar Mapear todos os routers Express sob a ótica de teste recomendado.
04721. [REVISÃO_BACKEND_ROTAS] Revisar Verificar ordem das rotas específicas antes de rotas dinâmicas sob a ótica de existência.
04722. [REVISÃO_BACKEND_ROTAS] Revisar Verificar ordem das rotas específicas antes de rotas dinâmicas sob a ótica de consistência.
04723. [REVISÃO_BACKEND_ROTAS] Revisar Verificar ordem das rotas específicas antes de rotas dinâmicas sob a ótica de risco.
04724. [REVISÃO_BACKEND_ROTAS] Revisar Verificar ordem das rotas específicas antes de rotas dinâmicas sob a ótica de impacto.
04725. [REVISÃO_BACKEND_ROTAS] Revisar Verificar ordem das rotas específicas antes de rotas dinâmicas sob a ótica de teste recomendado.
04726. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de autenticação sob a ótica de existência.
04727. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de autenticação sob a ótica de consistência.
04728. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de autenticação sob a ótica de risco.
04729. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de autenticação sob a ótica de impacto.
04730. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de autenticação sob a ótica de teste recomendado.
04731. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de fornecedor sob a ótica de existência.
04732. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de fornecedor sob a ótica de consistência.
04733. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de fornecedor sob a ótica de risco.
04734. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de fornecedor sob a ótica de impacto.
04735. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de fornecedor sob a ótica de teste recomendado.
04736. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de admin sob a ótica de existência.
04737. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de admin sob a ótica de consistência.
04738. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de admin sob a ótica de risco.
04739. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de admin sob a ótica de impacto.
04740. [REVISÃO_BACKEND_ROTAS] Revisar Verificar middleware de admin sob a ótica de teste recomendado.
04741. [REVISÃO_BACKEND_ROTAS] Revisar Verificar controllers usados sob a ótica de existência.
04742. [REVISÃO_BACKEND_ROTAS] Revisar Verificar controllers usados sob a ótica de consistência.
04743. [REVISÃO_BACKEND_ROTAS] Revisar Verificar controllers usados sob a ótica de risco.
04744. [REVISÃO_BACKEND_ROTAS] Revisar Verificar controllers usados sob a ótica de impacto.
04745. [REVISÃO_BACKEND_ROTAS] Revisar Verificar controllers usados sob a ótica de teste recomendado.
04746. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos inexistentes sob a ótica de existência.
04747. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos inexistentes sob a ótica de consistência.
04748. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos inexistentes sob a ótica de risco.
04749. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos inexistentes sob a ótica de impacto.
04750. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos inexistentes sob a ótica de teste recomendado.
04751. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos duplicados sob a ótica de existência.
04752. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos duplicados sob a ótica de consistência.
04753. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos duplicados sob a ótica de risco.
04754. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos duplicados sob a ótica de impacto.
04755. [REVISÃO_BACKEND_ROTAS] Revisar Verificar métodos duplicados sob a ótica de teste recomendado.
04756. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints sem uso sob a ótica de existência.
04757. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints sem uso sob a ótica de consistência.
04758. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints sem uso sob a ótica de risco.
04759. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints sem uso sob a ótica de impacto.
04760. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints sem uso sob a ótica de teste recomendado.
04761. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints usados pelo front sob a ótica de existência.
04762. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints usados pelo front sob a ótica de consistência.
04763. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints usados pelo front sob a ótica de risco.
04764. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints usados pelo front sob a ótica de impacto.
04765. [REVISÃO_BACKEND_ROTAS] Revisar Verificar endpoints usados pelo front sob a ótica de teste recomendado.
04766. [REVISÃO_BACKEND_ROTAS] Revisar Verificar OPTIONS/CORS sob a ótica de existência.
04767. [REVISÃO_BACKEND_ROTAS] Revisar Verificar OPTIONS/CORS sob a ótica de consistência.
04768. [REVISÃO_BACKEND_ROTAS] Revisar Verificar OPTIONS/CORS sob a ótica de risco.
04769. [REVISÃO_BACKEND_ROTAS] Revisar Verificar OPTIONS/CORS sob a ótica de impacto.
04770. [REVISÃO_BACKEND_ROTAS] Revisar Verificar OPTIONS/CORS sob a ótica de teste recomendado.
04771. [REVISÃO_BACKEND_ROTAS] Revisar Verificar status HTTP sob a ótica de existência.
04772. [REVISÃO_BACKEND_ROTAS] Revisar Verificar status HTTP sob a ótica de consistência.
04773. [REVISÃO_BACKEND_ROTAS] Revisar Verificar status HTTP sob a ótica de risco.
04774. [REVISÃO_BACKEND_ROTAS] Revisar Verificar status HTTP sob a ótica de impacto.
04775. [REVISÃO_BACKEND_ROTAS] Revisar Verificar status HTTP sob a ótica de teste recomendado.
04776. [REVISÃO_BACKEND_ROTAS] Revisar Verificar JSON padrão sob a ótica de existência.
04777. [REVISÃO_BACKEND_ROTAS] Revisar Verificar JSON padrão sob a ótica de consistência.
04778. [REVISÃO_BACKEND_ROTAS] Revisar Verificar JSON padrão sob a ótica de risco.
04779. [REVISÃO_BACKEND_ROTAS] Revisar Verificar JSON padrão sob a ótica de impacto.
04780. [REVISÃO_BACKEND_ROTAS] Revisar Verificar JSON padrão sob a ótica de teste recomendado.
04781. [REVISÃO_BACKEND_ROTAS] Revisar Verificar mensagens de erro sob a ótica de existência.
04782. [REVISÃO_BACKEND_ROTAS] Revisar Verificar mensagens de erro sob a ótica de consistência.
04783. [REVISÃO_BACKEND_ROTAS] Revisar Verificar mensagens de erro sob a ótica de risco.
04784. [REVISÃO_BACKEND_ROTAS] Revisar Verificar mensagens de erro sob a ótica de impacto.
04785. [REVISÃO_BACKEND_ROTAS] Revisar Verificar mensagens de erro sob a ótica de teste recomendado.
04786. [REVISÃO_BACKEND_ROTAS] Revisar Verificar logs sob a ótica de existência.
04787. [REVISÃO_BACKEND_ROTAS] Revisar Verificar logs sob a ótica de consistência.
04788. [REVISÃO_BACKEND_ROTAS] Revisar Verificar logs sob a ótica de risco.
04789. [REVISÃO_BACKEND_ROTAS] Revisar Verificar logs sob a ótica de impacto.
04790. [REVISÃO_BACKEND_ROTAS] Revisar Verificar logs sob a ótica de teste recomendado.

### REVISÃO_BANCO_DADOS
04791. [REVISÃO_BANCO_DADOS] Revisar Mapear tabelas reais sob a ótica de existência.
04792. [REVISÃO_BANCO_DADOS] Revisar Mapear tabelas reais sob a ótica de consistência.
04793. [REVISÃO_BANCO_DADOS] Revisar Mapear tabelas reais sob a ótica de risco.
04794. [REVISÃO_BANCO_DADOS] Revisar Mapear tabelas reais sob a ótica de impacto.
04795. [REVISÃO_BANCO_DADOS] Revisar Mapear tabelas reais sob a ótica de teste recomendado.
04796. [REVISÃO_BANCO_DADOS] Revisar Mapear colunas reais sob a ótica de existência.
04797. [REVISÃO_BANCO_DADOS] Revisar Mapear colunas reais sob a ótica de consistência.
04798. [REVISÃO_BANCO_DADOS] Revisar Mapear colunas reais sob a ótica de risco.
04799. [REVISÃO_BANCO_DADOS] Revisar Mapear colunas reais sob a ótica de impacto.
04800. [REVISÃO_BANCO_DADOS] Revisar Mapear colunas reais sob a ótica de teste recomendado.
04801. [REVISÃO_BANCO_DADOS] Revisar Mapear tipos de dados sob a ótica de existência.
04802. [REVISÃO_BANCO_DADOS] Revisar Mapear tipos de dados sob a ótica de consistência.
04803. [REVISÃO_BANCO_DADOS] Revisar Mapear tipos de dados sob a ótica de risco.
04804. [REVISÃO_BANCO_DADOS] Revisar Mapear tipos de dados sob a ótica de impacto.
04805. [REVISÃO_BANCO_DADOS] Revisar Mapear tipos de dados sob a ótica de teste recomendado.
04806. [REVISÃO_BANCO_DADOS] Revisar Mapear enums sob a ótica de existência.
04807. [REVISÃO_BANCO_DADOS] Revisar Mapear enums sob a ótica de consistência.
04808. [REVISÃO_BANCO_DADOS] Revisar Mapear enums sob a ótica de risco.
04809. [REVISÃO_BANCO_DADOS] Revisar Mapear enums sob a ótica de impacto.
04810. [REVISÃO_BANCO_DADOS] Revisar Mapear enums sob a ótica de teste recomendado.
04811. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves primárias sob a ótica de existência.
04812. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves primárias sob a ótica de consistência.
04813. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves primárias sob a ótica de risco.
04814. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves primárias sob a ótica de impacto.
04815. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves primárias sob a ótica de teste recomendado.
04816. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves estrangeiras sob a ótica de existência.
04817. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves estrangeiras sob a ótica de consistência.
04818. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves estrangeiras sob a ótica de risco.
04819. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves estrangeiras sob a ótica de impacto.
04820. [REVISÃO_BANCO_DADOS] Revisar Mapear chaves estrangeiras sob a ótica de teste recomendado.
04821. [REVISÃO_BANCO_DADOS] Revisar Mapear índices sob a ótica de existência.
04822. [REVISÃO_BANCO_DADOS] Revisar Mapear índices sob a ótica de consistência.
04823. [REVISÃO_BANCO_DADOS] Revisar Mapear índices sob a ótica de risco.
04824. [REVISÃO_BANCO_DADOS] Revisar Mapear índices sob a ótica de impacto.
04825. [REVISÃO_BANCO_DADOS] Revisar Mapear índices sob a ótica de teste recomendado.
04826. [REVISÃO_BANCO_DADOS] Revisar Verificar campos obrigatórios sob a ótica de existência.
04827. [REVISÃO_BANCO_DADOS] Revisar Verificar campos obrigatórios sob a ótica de consistência.
04828. [REVISÃO_BANCO_DADOS] Revisar Verificar campos obrigatórios sob a ótica de risco.
04829. [REVISÃO_BANCO_DADOS] Revisar Verificar campos obrigatórios sob a ótica de impacto.
04830. [REVISÃO_BANCO_DADOS] Revisar Verificar campos obrigatórios sob a ótica de teste recomendado.
04831. [REVISÃO_BANCO_DADOS] Revisar Verificar campos opcionais sob a ótica de existência.
04832. [REVISÃO_BANCO_DADOS] Revisar Verificar campos opcionais sob a ótica de consistência.
04833. [REVISÃO_BANCO_DADOS] Revisar Verificar campos opcionais sob a ótica de risco.
04834. [REVISÃO_BANCO_DADOS] Revisar Verificar campos opcionais sob a ótica de impacto.
04835. [REVISÃO_BANCO_DADOS] Revisar Verificar campos opcionais sob a ótica de teste recomendado.
04836. [REVISÃO_BANCO_DADOS] Revisar Verificar default values sob a ótica de existência.
04837. [REVISÃO_BANCO_DADOS] Revisar Verificar default values sob a ótica de consistência.
04838. [REVISÃO_BANCO_DADOS] Revisar Verificar default values sob a ótica de risco.
04839. [REVISÃO_BANCO_DADOS] Revisar Verificar default values sob a ótica de impacto.
04840. [REVISÃO_BANCO_DADOS] Revisar Verificar default values sob a ótica de teste recomendado.
04841. [REVISÃO_BANCO_DADOS] Revisar Verificar relacionamentos órfãos sob a ótica de existência.
04842. [REVISÃO_BANCO_DADOS] Revisar Verificar relacionamentos órfãos sob a ótica de consistência.
04843. [REVISÃO_BANCO_DADOS] Revisar Verificar relacionamentos órfãos sob a ótica de risco.
04844. [REVISÃO_BANCO_DADOS] Revisar Verificar relacionamentos órfãos sob a ótica de impacto.
04845. [REVISÃO_BANCO_DADOS] Revisar Verificar relacionamentos órfãos sob a ótica de teste recomendado.
04846. [REVISÃO_BANCO_DADOS] Revisar Verificar pedidos com produto inexistente sob a ótica de existência.
04847. [REVISÃO_BANCO_DADOS] Revisar Verificar pedidos com produto inexistente sob a ótica de consistência.
04848. [REVISÃO_BANCO_DADOS] Revisar Verificar pedidos com produto inexistente sob a ótica de risco.
04849. [REVISÃO_BANCO_DADOS] Revisar Verificar pedidos com produto inexistente sob a ótica de impacto.
04850. [REVISÃO_BANCO_DADOS] Revisar Verificar pedidos com produto inexistente sob a ótica de teste recomendado.
04851. [REVISÃO_BANCO_DADOS] Revisar Verificar encomendas sem usuário sob a ótica de existência.
04852. [REVISÃO_BANCO_DADOS] Revisar Verificar encomendas sem usuário sob a ótica de consistência.
04853. [REVISÃO_BANCO_DADOS] Revisar Verificar encomendas sem usuário sob a ótica de risco.
04854. [REVISÃO_BANCO_DADOS] Revisar Verificar encomendas sem usuário sob a ótica de impacto.
04855. [REVISÃO_BANCO_DADOS] Revisar Verificar encomendas sem usuário sob a ótica de teste recomendado.
04856. [REVISÃO_BANCO_DADOS] Revisar Verificar logística sem dono sob a ótica de existência.
04857. [REVISÃO_BANCO_DADOS] Revisar Verificar logística sem dono sob a ótica de consistência.
04858. [REVISÃO_BANCO_DADOS] Revisar Verificar logística sem dono sob a ótica de risco.
04859. [REVISÃO_BANCO_DADOS] Revisar Verificar logística sem dono sob a ótica de impacto.
04860. [REVISÃO_BANCO_DADOS] Revisar Verificar logística sem dono sob a ótica de teste recomendado.
04861. [REVISÃO_BANCO_DADOS] Revisar Verificar orçamentos sem encomenda sob a ótica de existência.
04862. [REVISÃO_BANCO_DADOS] Revisar Verificar orçamentos sem encomenda sob a ótica de consistência.
04863. [REVISÃO_BANCO_DADOS] Revisar Verificar orçamentos sem encomenda sob a ótica de risco.
04864. [REVISÃO_BANCO_DADOS] Revisar Verificar orçamentos sem encomenda sob a ótica de impacto.
04865. [REVISÃO_BANCO_DADOS] Revisar Verificar orçamentos sem encomenda sob a ótica de teste recomendado.

### REVISÃO_SEGURANCA
04866. [REVISÃO_SEGURANCA] Revisar Verificar hash de senha sob a ótica de existência.
04867. [REVISÃO_SEGURANCA] Revisar Verificar hash de senha sob a ótica de consistência.
04868. [REVISÃO_SEGURANCA] Revisar Verificar hash de senha sob a ótica de risco.
04869. [REVISÃO_SEGURANCA] Revisar Verificar hash de senha sob a ótica de impacto.
04870. [REVISÃO_SEGURANCA] Revisar Verificar hash de senha sob a ótica de teste recomendado.
04871. [REVISÃO_SEGURANCA] Revisar Verificar JWT secret sob a ótica de existência.
04872. [REVISÃO_SEGURANCA] Revisar Verificar JWT secret sob a ótica de consistência.
04873. [REVISÃO_SEGURANCA] Revisar Verificar JWT secret sob a ótica de risco.
04874. [REVISÃO_SEGURANCA] Revisar Verificar JWT secret sob a ótica de impacto.
04875. [REVISÃO_SEGURANCA] Revisar Verificar JWT secret sob a ótica de teste recomendado.
04876. [REVISÃO_SEGURANCA] Revisar Verificar expiração de token sob a ótica de existência.
04877. [REVISÃO_SEGURANCA] Revisar Verificar expiração de token sob a ótica de consistência.
04878. [REVISÃO_SEGURANCA] Revisar Verificar expiração de token sob a ótica de risco.
04879. [REVISÃO_SEGURANCA] Revisar Verificar expiração de token sob a ótica de impacto.
04880. [REVISÃO_SEGURANCA] Revisar Verificar expiração de token sob a ótica de teste recomendado.
04881. [REVISÃO_SEGURANCA] Revisar Verificar dados sensíveis no localStorage sob a ótica de existência.
04882. [REVISÃO_SEGURANCA] Revisar Verificar dados sensíveis no localStorage sob a ótica de consistência.
04883. [REVISÃO_SEGURANCA] Revisar Verificar dados sensíveis no localStorage sob a ótica de risco.
04884. [REVISÃO_SEGURANCA] Revisar Verificar dados sensíveis no localStorage sob a ótica de impacto.
04885. [REVISÃO_SEGURANCA] Revisar Verificar dados sensíveis no localStorage sob a ótica de teste recomendado.
04886. [REVISÃO_SEGURANCA] Revisar Verificar endpoint público indevido sob a ótica de existência.
04887. [REVISÃO_SEGURANCA] Revisar Verificar endpoint público indevido sob a ótica de consistência.
04888. [REVISÃO_SEGURANCA] Revisar Verificar endpoint público indevido sob a ótica de risco.
04889. [REVISÃO_SEGURANCA] Revisar Verificar endpoint público indevido sob a ótica de impacto.
04890. [REVISÃO_SEGURANCA] Revisar Verificar endpoint público indevido sob a ótica de teste recomendado.
04891. [REVISÃO_SEGURANCA] Revisar Verificar admin middleware sob a ótica de existência.
04892. [REVISÃO_SEGURANCA] Revisar Verificar admin middleware sob a ótica de consistência.
04893. [REVISÃO_SEGURANCA] Revisar Verificar admin middleware sob a ótica de risco.
04894. [REVISÃO_SEGURANCA] Revisar Verificar admin middleware sob a ótica de impacto.
04895. [REVISÃO_SEGURANCA] Revisar Verificar admin middleware sob a ótica de teste recomendado.
04896. [REVISÃO_SEGURANCA] Revisar Verificar supplier middleware sob a ótica de existência.
04897. [REVISÃO_SEGURANCA] Revisar Verificar supplier middleware sob a ótica de consistência.
04898. [REVISÃO_SEGURANCA] Revisar Verificar supplier middleware sob a ótica de risco.
04899. [REVISÃO_SEGURANCA] Revisar Verificar supplier middleware sob a ótica de impacto.
04900. [REVISÃO_SEGURANCA] Revisar Verificar supplier middleware sob a ótica de teste recomendado.
04901. [REVISÃO_SEGURANCA] Revisar Verificar acesso horizontal sob a ótica de existência.
04902. [REVISÃO_SEGURANCA] Revisar Verificar acesso horizontal sob a ótica de consistência.
04903. [REVISÃO_SEGURANCA] Revisar Verificar acesso horizontal sob a ótica de risco.
04904. [REVISÃO_SEGURANCA] Revisar Verificar acesso horizontal sob a ótica de impacto.
04905. [REVISÃO_SEGURANCA] Revisar Verificar acesso horizontal sob a ótica de teste recomendado.
04906. [REVISÃO_SEGURANCA] Revisar Verificar validação de ownership sob a ótica de existência.
04907. [REVISÃO_SEGURANCA] Revisar Verificar validação de ownership sob a ótica de consistência.
04908. [REVISÃO_SEGURANCA] Revisar Verificar validação de ownership sob a ótica de risco.
04909. [REVISÃO_SEGURANCA] Revisar Verificar validação de ownership sob a ótica de impacto.
04910. [REVISÃO_SEGURANCA] Revisar Verificar validação de ownership sob a ótica de teste recomendado.
04911. [REVISÃO_SEGURANCA] Revisar Verificar upload file type sob a ótica de existência.
04912. [REVISÃO_SEGURANCA] Revisar Verificar upload file type sob a ótica de consistência.
04913. [REVISÃO_SEGURANCA] Revisar Verificar upload file type sob a ótica de risco.
04914. [REVISÃO_SEGURANCA] Revisar Verificar upload file type sob a ótica de impacto.
04915. [REVISÃO_SEGURANCA] Revisar Verificar upload file type sob a ótica de teste recomendado.
04916. [REVISÃO_SEGURANCA] Revisar Verificar upload file size sob a ótica de existência.
04917. [REVISÃO_SEGURANCA] Revisar Verificar upload file size sob a ótica de consistência.
04918. [REVISÃO_SEGURANCA] Revisar Verificar upload file size sob a ótica de risco.
04919. [REVISÃO_SEGURANCA] Revisar Verificar upload file size sob a ótica de impacto.
04920. [REVISÃO_SEGURANCA] Revisar Verificar upload file size sob a ótica de teste recomendado.
04921. [REVISÃO_SEGURANCA] Revisar Verificar path traversal sob a ótica de existência.
04922. [REVISÃO_SEGURANCA] Revisar Verificar path traversal sob a ótica de consistência.
04923. [REVISÃO_SEGURANCA] Revisar Verificar path traversal sob a ótica de risco.
04924. [REVISÃO_SEGURANCA] Revisar Verificar path traversal sob a ótica de impacto.
04925. [REVISÃO_SEGURANCA] Revisar Verificar path traversal sob a ótica de teste recomendado.
04926. [REVISÃO_SEGURANCA] Revisar Verificar SQL injection sob a ótica de existência.
04927. [REVISÃO_SEGURANCA] Revisar Verificar SQL injection sob a ótica de consistência.
04928. [REVISÃO_SEGURANCA] Revisar Verificar SQL injection sob a ótica de risco.
04929. [REVISÃO_SEGURANCA] Revisar Verificar SQL injection sob a ótica de impacto.
04930. [REVISÃO_SEGURANCA] Revisar Verificar SQL injection sob a ótica de teste recomendado.
04931. [REVISÃO_SEGURANCA] Revisar Verificar mensagens técnicas sob a ótica de existência.
04932. [REVISÃO_SEGURANCA] Revisar Verificar mensagens técnicas sob a ótica de consistência.
04933. [REVISÃO_SEGURANCA] Revisar Verificar mensagens técnicas sob a ótica de risco.
04934. [REVISÃO_SEGURANCA] Revisar Verificar mensagens técnicas sob a ótica de impacto.
04935. [REVISÃO_SEGURANCA] Revisar Verificar mensagens técnicas sob a ótica de teste recomendado.
04936. [REVISÃO_SEGURANCA] Revisar Verificar CORS permissivo sob a ótica de existência.
04937. [REVISÃO_SEGURANCA] Revisar Verificar CORS permissivo sob a ótica de consistência.
04938. [REVISÃO_SEGURANCA] Revisar Verificar CORS permissivo sob a ótica de risco.
04939. [REVISÃO_SEGURANCA] Revisar Verificar CORS permissivo sob a ótica de impacto.
04940. [REVISÃO_SEGURANCA] Revisar Verificar CORS permissivo sob a ótica de teste recomendado.

### REVISÃO_TESTES
04941. [REVISÃO_TESTES] Revisar Listar scripts de teste sob a ótica de existência.
04942. [REVISÃO_TESTES] Revisar Listar scripts de teste sob a ótica de consistência.
04943. [REVISÃO_TESTES] Revisar Listar scripts de teste sob a ótica de risco.
04944. [REVISÃO_TESTES] Revisar Listar scripts de teste sob a ótica de impacto.
04945. [REVISÃO_TESTES] Revisar Listar scripts de teste sob a ótica de teste recomendado.
04946. [REVISÃO_TESTES] Revisar Listar ausência de testes sob a ótica de existência.
04947. [REVISÃO_TESTES] Revisar Listar ausência de testes sob a ótica de consistência.
04948. [REVISÃO_TESTES] Revisar Listar ausência de testes sob a ótica de risco.
04949. [REVISÃO_TESTES] Revisar Listar ausência de testes sob a ótica de impacto.
04950. [REVISÃO_TESTES] Revisar Listar ausência de testes sob a ótica de teste recomendado.
04951. [REVISÃO_TESTES] Revisar Criar matriz manual de testes sob a ótica de existência.
04952. [REVISÃO_TESTES] Revisar Criar matriz manual de testes sob a ótica de consistência.
04953. [REVISÃO_TESTES] Revisar Criar matriz manual de testes sob a ótica de risco.
04954. [REVISÃO_TESTES] Revisar Criar matriz manual de testes sob a ótica de impacto.
04955. [REVISÃO_TESTES] Revisar Criar matriz manual de testes sob a ótica de teste recomendado.
04956. [REVISÃO_TESTES] Revisar Criar matriz de regressão sob a ótica de existência.
04957. [REVISÃO_TESTES] Revisar Criar matriz de regressão sob a ótica de consistência.
04958. [REVISÃO_TESTES] Revisar Criar matriz de regressão sob a ótica de risco.
04959. [REVISÃO_TESTES] Revisar Criar matriz de regressão sob a ótica de impacto.
04960. [REVISÃO_TESTES] Revisar Criar matriz de regressão sob a ótica de teste recomendado.
04961. [REVISÃO_TESTES] Revisar Criar casos de autenticação sob a ótica de existência.
04962. [REVISÃO_TESTES] Revisar Criar casos de autenticação sob a ótica de consistência.
04963. [REVISÃO_TESTES] Revisar Criar casos de autenticação sob a ótica de risco.
04964. [REVISÃO_TESTES] Revisar Criar casos de autenticação sob a ótica de impacto.
04965. [REVISÃO_TESTES] Revisar Criar casos de autenticação sob a ótica de teste recomendado.
04966. [REVISÃO_TESTES] Revisar Criar casos de autorização sob a ótica de existência.
04967. [REVISÃO_TESTES] Revisar Criar casos de autorização sob a ótica de consistência.
04968. [REVISÃO_TESTES] Revisar Criar casos de autorização sob a ótica de risco.
04969. [REVISÃO_TESTES] Revisar Criar casos de autorização sob a ótica de impacto.
04970. [REVISÃO_TESTES] Revisar Criar casos de autorização sob a ótica de teste recomendado.
04971. [REVISÃO_TESTES] Revisar Criar casos de produtos sob a ótica de existência.
04972. [REVISÃO_TESTES] Revisar Criar casos de produtos sob a ótica de consistência.
04973. [REVISÃO_TESTES] Revisar Criar casos de produtos sob a ótica de risco.
04974. [REVISÃO_TESTES] Revisar Criar casos de produtos sob a ótica de impacto.
04975. [REVISÃO_TESTES] Revisar Criar casos de produtos sob a ótica de teste recomendado.
04976. [REVISÃO_TESTES] Revisar Criar casos de pedidos sob a ótica de existência.
04977. [REVISÃO_TESTES] Revisar Criar casos de pedidos sob a ótica de consistência.
04978. [REVISÃO_TESTES] Revisar Criar casos de pedidos sob a ótica de risco.
04979. [REVISÃO_TESTES] Revisar Criar casos de pedidos sob a ótica de impacto.
04980. [REVISÃO_TESTES] Revisar Criar casos de pedidos sob a ótica de teste recomendado.
04981. [REVISÃO_TESTES] Revisar Criar casos de encomendas sob a ótica de existência.
04982. [REVISÃO_TESTES] Revisar Criar casos de encomendas sob a ótica de consistência.
04983. [REVISÃO_TESTES] Revisar Criar casos de encomendas sob a ótica de risco.
04984. [REVISÃO_TESTES] Revisar Criar casos de encomendas sob a ótica de impacto.
04985. [REVISÃO_TESTES] Revisar Criar casos de encomendas sob a ótica de teste recomendado.
04986. [REVISÃO_TESTES] Revisar Criar casos de logística sob a ótica de existência.
04987. [REVISÃO_TESTES] Revisar Criar casos de logística sob a ótica de consistência.
04988. [REVISÃO_TESTES] Revisar Criar casos de logística sob a ótica de risco.
04989. [REVISÃO_TESTES] Revisar Criar casos de logística sob a ótica de impacto.
04990. [REVISÃO_TESTES] Revisar Criar casos de logística sob a ótica de teste recomendado.
04991. [REVISÃO_TESTES] Revisar Criar casos de suporte sob a ótica de existência.
04992. [REVISÃO_TESTES] Revisar Criar casos de suporte sob a ótica de consistência.
04993. [REVISÃO_TESTES] Revisar Criar casos de suporte sob a ótica de risco.
04994. [REVISÃO_TESTES] Revisar Criar casos de suporte sob a ótica de impacto.
04995. [REVISÃO_TESTES] Revisar Criar casos de suporte sob a ótica de teste recomendado.
04996. [REVISÃO_TESTES] Revisar Criar casos de notificações sob a ótica de existência.
04997. [REVISÃO_TESTES] Revisar Criar casos de notificações sob a ótica de consistência.
04998. [REVISÃO_TESTES] Revisar Criar casos de notificações sob a ótica de risco.
04999. [REVISÃO_TESTES] Revisar Criar casos de notificações sob a ótica de impacto.
05000. [REVISÃO_TESTES] Revisar Criar casos de notificações sob a ótica de teste recomendado.
05001. [REVISÃO_TESTES] Revisar Criar casos de upload sob a ótica de existência.
05002. [REVISÃO_TESTES] Revisar Criar casos de upload sob a ótica de consistência.
05003. [REVISÃO_TESTES] Revisar Criar casos de upload sob a ótica de risco.
05004. [REVISÃO_TESTES] Revisar Criar casos de upload sob a ótica de impacto.
05005. [REVISÃO_TESTES] Revisar Criar casos de upload sob a ótica de teste recomendado.
05006. [REVISÃO_TESTES] Revisar Criar casos de imagens quebradas sob a ótica de existência.
05007. [REVISÃO_TESTES] Revisar Criar casos de imagens quebradas sob a ótica de consistência.
05008. [REVISÃO_TESTES] Revisar Criar casos de imagens quebradas sob a ótica de risco.
05009. [REVISÃO_TESTES] Revisar Criar casos de imagens quebradas sob a ótica de impacto.
05010. [REVISÃO_TESTES] Revisar Criar casos de imagens quebradas sob a ótica de teste recomendado.
05011. [REVISÃO_TESTES] Revisar Criar casos de banco inconsistente sob a ótica de existência.
05012. [REVISÃO_TESTES] Revisar Criar casos de banco inconsistente sob a ótica de consistência.
05013. [REVISÃO_TESTES] Revisar Criar casos de banco inconsistente sob a ótica de risco.
05014. [REVISÃO_TESTES] Revisar Criar casos de banco inconsistente sob a ótica de impacto.
05015. [REVISÃO_TESTES] Revisar Criar casos de banco inconsistente sob a ótica de teste recomendado.

---

## 8. Checklist massivo de revisão total — 10k linhas reais

05016. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05017. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05018. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05019. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05020. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05021. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05022. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05023. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05024. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05025. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05026. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05027. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05028. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05029. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05030. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05031. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05032. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05033. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05034. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05035. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05036. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05037. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05038. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05039. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05040. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05041. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05042. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05043. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05044. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05045. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05046. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05047. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05048. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05049. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05050. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05051. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05052. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05053. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05054. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05055. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05056. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05057. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05058. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05059. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05060. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05061. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05062. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05063. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05064. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05065. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05066. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05067. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05068. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05069. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05070. [REVISÃO_TOTAL] Na área `cards`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05071. [REVISÃO_TOTAL] Na área `responsividade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05072. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05073. [REVISÃO_TOTAL] Na área `segurança`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05074. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05075. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05076. [REVISÃO_TOTAL] Na área `front-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05077. [REVISÃO_TOTAL] Na área `back-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05078. [REVISÃO_TOTAL] Na área `banco de dados`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05079. [REVISÃO_TOTAL] Na área `API`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05080. [REVISÃO_TOTAL] Na área `autenticação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05081. [REVISÃO_TOTAL] Na área `autorização`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05082. [REVISÃO_TOTAL] Na área `produtos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05083. [REVISÃO_TOTAL] Na área `pedidos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05084. [REVISÃO_TOTAL] Na área `encomendas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05085. [REVISÃO_TOTAL] Na área `orçamentos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05086. [REVISÃO_TOTAL] Na área `logística`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05087. [REVISÃO_TOTAL] Na área `suporte`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05088. [REVISÃO_TOTAL] Na área `notificações`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05089. [REVISÃO_TOTAL] Na área `header`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05090. [REVISÃO_TOTAL] Na área `footer`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05091. [REVISÃO_TOTAL] Na área `sidebar`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05092. [REVISÃO_TOTAL] Na área `dashboard`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05093. [REVISÃO_TOTAL] Na área `perfil`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05094. [REVISÃO_TOTAL] Na área `uploads`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05095. [REVISÃO_TOTAL] Na área `imagens`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05096. [REVISÃO_TOTAL] Na área `filtros`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05097. [REVISÃO_TOTAL] Na área `paginação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05098. [REVISÃO_TOTAL] Na área `modais`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05099. [REVISÃO_TOTAL] Na área `tabelas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05100. [REVISÃO_TOTAL] Na área `cards`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05101. [REVISÃO_TOTAL] Na área `responsividade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05102. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05103. [REVISÃO_TOTAL] Na área `segurança`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05104. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05105. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05106. [REVISÃO_TOTAL] Na área `front-end`, mapear validações existentes e documentar achado no relatório de auditoria.
05107. [REVISÃO_TOTAL] Na área `back-end`, mapear validações existentes e documentar achado no relatório de auditoria.
05108. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações existentes e documentar achado no relatório de auditoria.
05109. [REVISÃO_TOTAL] Na área `API`, mapear validações existentes e documentar achado no relatório de auditoria.
05110. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações existentes e documentar achado no relatório de auditoria.
05111. [REVISÃO_TOTAL] Na área `autorização`, mapear validações existentes e documentar achado no relatório de auditoria.
05112. [REVISÃO_TOTAL] Na área `produtos`, mapear validações existentes e documentar achado no relatório de auditoria.
05113. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações existentes e documentar achado no relatório de auditoria.
05114. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações existentes e documentar achado no relatório de auditoria.
05115. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações existentes e documentar achado no relatório de auditoria.
05116. [REVISÃO_TOTAL] Na área `logística`, mapear validações existentes e documentar achado no relatório de auditoria.
05117. [REVISÃO_TOTAL] Na área `suporte`, mapear validações existentes e documentar achado no relatório de auditoria.
05118. [REVISÃO_TOTAL] Na área `notificações`, mapear validações existentes e documentar achado no relatório de auditoria.
05119. [REVISÃO_TOTAL] Na área `header`, mapear validações existentes e documentar achado no relatório de auditoria.
05120. [REVISÃO_TOTAL] Na área `footer`, mapear validações existentes e documentar achado no relatório de auditoria.
05121. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações existentes e documentar achado no relatório de auditoria.
05122. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações existentes e documentar achado no relatório de auditoria.
05123. [REVISÃO_TOTAL] Na área `perfil`, mapear validações existentes e documentar achado no relatório de auditoria.
05124. [REVISÃO_TOTAL] Na área `uploads`, mapear validações existentes e documentar achado no relatório de auditoria.
05125. [REVISÃO_TOTAL] Na área `imagens`, mapear validações existentes e documentar achado no relatório de auditoria.
05126. [REVISÃO_TOTAL] Na área `filtros`, mapear validações existentes e documentar achado no relatório de auditoria.
05127. [REVISÃO_TOTAL] Na área `paginação`, mapear validações existentes e documentar achado no relatório de auditoria.
05128. [REVISÃO_TOTAL] Na área `modais`, mapear validações existentes e documentar achado no relatório de auditoria.
05129. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações existentes e documentar achado no relatório de auditoria.
05130. [REVISÃO_TOTAL] Na área `cards`, mapear validações existentes e documentar achado no relatório de auditoria.
05131. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações existentes e documentar achado no relatório de auditoria.
05132. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações existentes e documentar achado no relatório de auditoria.
05133. [REVISÃO_TOTAL] Na área `segurança`, mapear validações existentes e documentar achado no relatório de auditoria.
05134. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações existentes e documentar achado no relatório de auditoria.
05135. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações existentes e documentar achado no relatório de auditoria.
05136. [REVISÃO_TOTAL] Na área `front-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
05137. [REVISÃO_TOTAL] Na área `back-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
05138. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações ausentes e documentar achado no relatório de auditoria.
05139. [REVISÃO_TOTAL] Na área `API`, mapear validações ausentes e documentar achado no relatório de auditoria.
05140. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações ausentes e documentar achado no relatório de auditoria.
05141. [REVISÃO_TOTAL] Na área `autorização`, mapear validações ausentes e documentar achado no relatório de auditoria.
05142. [REVISÃO_TOTAL] Na área `produtos`, mapear validações ausentes e documentar achado no relatório de auditoria.
05143. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações ausentes e documentar achado no relatório de auditoria.
05144. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações ausentes e documentar achado no relatório de auditoria.
05145. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações ausentes e documentar achado no relatório de auditoria.
05146. [REVISÃO_TOTAL] Na área `logística`, mapear validações ausentes e documentar achado no relatório de auditoria.
05147. [REVISÃO_TOTAL] Na área `suporte`, mapear validações ausentes e documentar achado no relatório de auditoria.
05148. [REVISÃO_TOTAL] Na área `notificações`, mapear validações ausentes e documentar achado no relatório de auditoria.
05149. [REVISÃO_TOTAL] Na área `header`, mapear validações ausentes e documentar achado no relatório de auditoria.
05150. [REVISÃO_TOTAL] Na área `footer`, mapear validações ausentes e documentar achado no relatório de auditoria.
05151. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações ausentes e documentar achado no relatório de auditoria.
05152. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações ausentes e documentar achado no relatório de auditoria.
05153. [REVISÃO_TOTAL] Na área `perfil`, mapear validações ausentes e documentar achado no relatório de auditoria.
05154. [REVISÃO_TOTAL] Na área `uploads`, mapear validações ausentes e documentar achado no relatório de auditoria.
05155. [REVISÃO_TOTAL] Na área `imagens`, mapear validações ausentes e documentar achado no relatório de auditoria.
05156. [REVISÃO_TOTAL] Na área `filtros`, mapear validações ausentes e documentar achado no relatório de auditoria.
05157. [REVISÃO_TOTAL] Na área `paginação`, mapear validações ausentes e documentar achado no relatório de auditoria.
05158. [REVISÃO_TOTAL] Na área `modais`, mapear validações ausentes e documentar achado no relatório de auditoria.
05159. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações ausentes e documentar achado no relatório de auditoria.
05160. [REVISÃO_TOTAL] Na área `cards`, mapear validações ausentes e documentar achado no relatório de auditoria.
05161. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações ausentes e documentar achado no relatório de auditoria.
05162. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações ausentes e documentar achado no relatório de auditoria.
05163. [REVISÃO_TOTAL] Na área `segurança`, mapear validações ausentes e documentar achado no relatório de auditoria.
05164. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações ausentes e documentar achado no relatório de auditoria.
05165. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações ausentes e documentar achado no relatório de auditoria.
05166. [REVISÃO_TOTAL] Na área `front-end`, mapear dependências e documentar achado no relatório de auditoria.
05167. [REVISÃO_TOTAL] Na área `back-end`, mapear dependências e documentar achado no relatório de auditoria.
05168. [REVISÃO_TOTAL] Na área `banco de dados`, mapear dependências e documentar achado no relatório de auditoria.
05169. [REVISÃO_TOTAL] Na área `API`, mapear dependências e documentar achado no relatório de auditoria.
05170. [REVISÃO_TOTAL] Na área `autenticação`, mapear dependências e documentar achado no relatório de auditoria.
05171. [REVISÃO_TOTAL] Na área `autorização`, mapear dependências e documentar achado no relatório de auditoria.
05172. [REVISÃO_TOTAL] Na área `produtos`, mapear dependências e documentar achado no relatório de auditoria.
05173. [REVISÃO_TOTAL] Na área `pedidos`, mapear dependências e documentar achado no relatório de auditoria.
05174. [REVISÃO_TOTAL] Na área `encomendas`, mapear dependências e documentar achado no relatório de auditoria.
05175. [REVISÃO_TOTAL] Na área `orçamentos`, mapear dependências e documentar achado no relatório de auditoria.
05176. [REVISÃO_TOTAL] Na área `logística`, mapear dependências e documentar achado no relatório de auditoria.
05177. [REVISÃO_TOTAL] Na área `suporte`, mapear dependências e documentar achado no relatório de auditoria.
05178. [REVISÃO_TOTAL] Na área `notificações`, mapear dependências e documentar achado no relatório de auditoria.
05179. [REVISÃO_TOTAL] Na área `header`, mapear dependências e documentar achado no relatório de auditoria.
05180. [REVISÃO_TOTAL] Na área `footer`, mapear dependências e documentar achado no relatório de auditoria.
05181. [REVISÃO_TOTAL] Na área `sidebar`, mapear dependências e documentar achado no relatório de auditoria.
05182. [REVISÃO_TOTAL] Na área `dashboard`, mapear dependências e documentar achado no relatório de auditoria.
05183. [REVISÃO_TOTAL] Na área `perfil`, mapear dependências e documentar achado no relatório de auditoria.
05184. [REVISÃO_TOTAL] Na área `uploads`, mapear dependências e documentar achado no relatório de auditoria.
05185. [REVISÃO_TOTAL] Na área `imagens`, mapear dependências e documentar achado no relatório de auditoria.
05186. [REVISÃO_TOTAL] Na área `filtros`, mapear dependências e documentar achado no relatório de auditoria.
05187. [REVISÃO_TOTAL] Na área `paginação`, mapear dependências e documentar achado no relatório de auditoria.
05188. [REVISÃO_TOTAL] Na área `modais`, mapear dependências e documentar achado no relatório de auditoria.
05189. [REVISÃO_TOTAL] Na área `tabelas`, mapear dependências e documentar achado no relatório de auditoria.
05190. [REVISÃO_TOTAL] Na área `cards`, mapear dependências e documentar achado no relatório de auditoria.
05191. [REVISÃO_TOTAL] Na área `responsividade`, mapear dependências e documentar achado no relatório de auditoria.
05192. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear dependências e documentar achado no relatório de auditoria.
05193. [REVISÃO_TOTAL] Na área `segurança`, mapear dependências e documentar achado no relatório de auditoria.
05194. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear dependências e documentar achado no relatório de auditoria.
05195. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear dependências e documentar achado no relatório de auditoria.
05196. [REVISÃO_TOTAL] Na área `front-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
05197. [REVISÃO_TOTAL] Na área `back-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
05198. [REVISÃO_TOTAL] Na área `banco de dados`, mapear risco de regressão e documentar achado no relatório de auditoria.
05199. [REVISÃO_TOTAL] Na área `API`, mapear risco de regressão e documentar achado no relatório de auditoria.
05200. [REVISÃO_TOTAL] Na área `autenticação`, mapear risco de regressão e documentar achado no relatório de auditoria.
05201. [REVISÃO_TOTAL] Na área `autorização`, mapear risco de regressão e documentar achado no relatório de auditoria.
05202. [REVISÃO_TOTAL] Na área `produtos`, mapear risco de regressão e documentar achado no relatório de auditoria.
05203. [REVISÃO_TOTAL] Na área `pedidos`, mapear risco de regressão e documentar achado no relatório de auditoria.
05204. [REVISÃO_TOTAL] Na área `encomendas`, mapear risco de regressão e documentar achado no relatório de auditoria.
05205. [REVISÃO_TOTAL] Na área `orçamentos`, mapear risco de regressão e documentar achado no relatório de auditoria.
05206. [REVISÃO_TOTAL] Na área `logística`, mapear risco de regressão e documentar achado no relatório de auditoria.
05207. [REVISÃO_TOTAL] Na área `suporte`, mapear risco de regressão e documentar achado no relatório de auditoria.
05208. [REVISÃO_TOTAL] Na área `notificações`, mapear risco de regressão e documentar achado no relatório de auditoria.
05209. [REVISÃO_TOTAL] Na área `header`, mapear risco de regressão e documentar achado no relatório de auditoria.
05210. [REVISÃO_TOTAL] Na área `footer`, mapear risco de regressão e documentar achado no relatório de auditoria.
05211. [REVISÃO_TOTAL] Na área `sidebar`, mapear risco de regressão e documentar achado no relatório de auditoria.
05212. [REVISÃO_TOTAL] Na área `dashboard`, mapear risco de regressão e documentar achado no relatório de auditoria.
05213. [REVISÃO_TOTAL] Na área `perfil`, mapear risco de regressão e documentar achado no relatório de auditoria.
05214. [REVISÃO_TOTAL] Na área `uploads`, mapear risco de regressão e documentar achado no relatório de auditoria.
05215. [REVISÃO_TOTAL] Na área `imagens`, mapear risco de regressão e documentar achado no relatório de auditoria.
05216. [REVISÃO_TOTAL] Na área `filtros`, mapear risco de regressão e documentar achado no relatório de auditoria.
05217. [REVISÃO_TOTAL] Na área `paginação`, mapear risco de regressão e documentar achado no relatório de auditoria.
05218. [REVISÃO_TOTAL] Na área `modais`, mapear risco de regressão e documentar achado no relatório de auditoria.
05219. [REVISÃO_TOTAL] Na área `tabelas`, mapear risco de regressão e documentar achado no relatório de auditoria.
05220. [REVISÃO_TOTAL] Na área `cards`, mapear risco de regressão e documentar achado no relatório de auditoria.
05221. [REVISÃO_TOTAL] Na área `responsividade`, mapear risco de regressão e documentar achado no relatório de auditoria.
05222. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear risco de regressão e documentar achado no relatório de auditoria.
05223. [REVISÃO_TOTAL] Na área `segurança`, mapear risco de regressão e documentar achado no relatório de auditoria.
05224. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear risco de regressão e documentar achado no relatório de auditoria.
05225. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear risco de regressão e documentar achado no relatório de auditoria.
05226. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05227. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05228. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05229. [REVISÃO_TOTAL] Na área `API`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05230. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05231. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05232. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05233. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05234. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05235. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05236. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05237. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05238. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05239. [REVISÃO_TOTAL] Na área `header`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05240. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05241. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05242. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05243. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05244. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05245. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05246. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05247. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05248. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05249. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05250. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05251. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05252. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05253. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05254. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05255. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05256. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05257. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05258. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05259. [REVISÃO_TOTAL] Na área `API`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05260. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05261. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05262. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05263. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05264. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05265. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05266. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05267. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05268. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05269. [REVISÃO_TOTAL] Na área `header`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05270. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05271. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05272. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05273. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05274. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05275. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05276. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05277. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05278. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05279. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05280. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05281. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05282. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05283. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05284. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05285. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
05286. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
05287. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
05288. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em admin e documentar achado no relatório de auditoria.
05289. [REVISÃO_TOTAL] Na área `API`, mapear impacto em admin e documentar achado no relatório de auditoria.
05290. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em admin e documentar achado no relatório de auditoria.
05291. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em admin e documentar achado no relatório de auditoria.
05292. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em admin e documentar achado no relatório de auditoria.
05293. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em admin e documentar achado no relatório de auditoria.
05294. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em admin e documentar achado no relatório de auditoria.
05295. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em admin e documentar achado no relatório de auditoria.
05296. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em admin e documentar achado no relatório de auditoria.
05297. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em admin e documentar achado no relatório de auditoria.
05298. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em admin e documentar achado no relatório de auditoria.
05299. [REVISÃO_TOTAL] Na área `header`, mapear impacto em admin e documentar achado no relatório de auditoria.
05300. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em admin e documentar achado no relatório de auditoria.
05301. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em admin e documentar achado no relatório de auditoria.
05302. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em admin e documentar achado no relatório de auditoria.
05303. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em admin e documentar achado no relatório de auditoria.
05304. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em admin e documentar achado no relatório de auditoria.
05305. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em admin e documentar achado no relatório de auditoria.
05306. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em admin e documentar achado no relatório de auditoria.
05307. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em admin e documentar achado no relatório de auditoria.
05308. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em admin e documentar achado no relatório de auditoria.
05309. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em admin e documentar achado no relatório de auditoria.
05310. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em admin e documentar achado no relatório de auditoria.
05311. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em admin e documentar achado no relatório de auditoria.
05312. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em admin e documentar achado no relatório de auditoria.
05313. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em admin e documentar achado no relatório de auditoria.
05314. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em admin e documentar achado no relatório de auditoria.
05315. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em admin e documentar achado no relatório de auditoria.
05316. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05317. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05318. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05319. [REVISÃO_TOTAL] Na área `API`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05320. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05321. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05322. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05323. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05324. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05325. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05326. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05327. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05328. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05329. [REVISÃO_TOTAL] Na área `header`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05330. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05331. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05332. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05333. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05334. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05335. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05336. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05337. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05338. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05339. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05340. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05341. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05342. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05343. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05344. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05345. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de nomes e documentar achado no relatório de auditoria.
05346. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de status e documentar achado no relatório de auditoria.
05347. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de status e documentar achado no relatório de auditoria.
05348. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de status e documentar achado no relatório de auditoria.
05349. [REVISÃO_TOTAL] Na área `API`, verificar consistência de status e documentar achado no relatório de auditoria.
05350. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de status e documentar achado no relatório de auditoria.
05351. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de status e documentar achado no relatório de auditoria.
05352. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de status e documentar achado no relatório de auditoria.
05353. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de status e documentar achado no relatório de auditoria.
05354. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de status e documentar achado no relatório de auditoria.
05355. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de status e documentar achado no relatório de auditoria.
05356. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de status e documentar achado no relatório de auditoria.
05357. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de status e documentar achado no relatório de auditoria.
05358. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de status e documentar achado no relatório de auditoria.
05359. [REVISÃO_TOTAL] Na área `header`, verificar consistência de status e documentar achado no relatório de auditoria.
05360. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de status e documentar achado no relatório de auditoria.
05361. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de status e documentar achado no relatório de auditoria.
05362. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de status e documentar achado no relatório de auditoria.
05363. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de status e documentar achado no relatório de auditoria.
05364. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de status e documentar achado no relatório de auditoria.
05365. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de status e documentar achado no relatório de auditoria.
05366. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de status e documentar achado no relatório de auditoria.
05367. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de status e documentar achado no relatório de auditoria.
05368. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de status e documentar achado no relatório de auditoria.
05369. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de status e documentar achado no relatório de auditoria.
05370. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de status e documentar achado no relatório de auditoria.
05371. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de status e documentar achado no relatório de auditoria.
05372. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de status e documentar achado no relatório de auditoria.
05373. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de status e documentar achado no relatório de auditoria.
05374. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de status e documentar achado no relatório de auditoria.
05375. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de status e documentar achado no relatório de auditoria.
05376. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
05377. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
05378. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de ids e documentar achado no relatório de auditoria.
05379. [REVISÃO_TOTAL] Na área `API`, verificar consistência de ids e documentar achado no relatório de auditoria.
05380. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de ids e documentar achado no relatório de auditoria.
05381. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de ids e documentar achado no relatório de auditoria.
05382. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de ids e documentar achado no relatório de auditoria.
05383. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de ids e documentar achado no relatório de auditoria.
05384. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de ids e documentar achado no relatório de auditoria.
05385. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de ids e documentar achado no relatório de auditoria.
05386. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de ids e documentar achado no relatório de auditoria.
05387. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de ids e documentar achado no relatório de auditoria.
05388. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de ids e documentar achado no relatório de auditoria.
05389. [REVISÃO_TOTAL] Na área `header`, verificar consistência de ids e documentar achado no relatório de auditoria.
05390. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de ids e documentar achado no relatório de auditoria.
05391. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de ids e documentar achado no relatório de auditoria.
05392. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de ids e documentar achado no relatório de auditoria.
05393. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de ids e documentar achado no relatório de auditoria.
05394. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de ids e documentar achado no relatório de auditoria.
05395. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de ids e documentar achado no relatório de auditoria.
05396. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de ids e documentar achado no relatório de auditoria.
05397. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de ids e documentar achado no relatório de auditoria.
05398. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de ids e documentar achado no relatório de auditoria.
05399. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de ids e documentar achado no relatório de auditoria.
05400. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de ids e documentar achado no relatório de auditoria.
05401. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de ids e documentar achado no relatório de auditoria.
05402. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de ids e documentar achado no relatório de auditoria.
05403. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de ids e documentar achado no relatório de auditoria.
05404. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de ids e documentar achado no relatório de auditoria.
05405. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de ids e documentar achado no relatório de auditoria.
05406. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
05407. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
05408. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de datas e documentar achado no relatório de auditoria.
05409. [REVISÃO_TOTAL] Na área `API`, verificar consistência de datas e documentar achado no relatório de auditoria.
05410. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de datas e documentar achado no relatório de auditoria.
05411. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de datas e documentar achado no relatório de auditoria.
05412. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de datas e documentar achado no relatório de auditoria.
05413. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de datas e documentar achado no relatório de auditoria.
05414. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de datas e documentar achado no relatório de auditoria.
05415. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de datas e documentar achado no relatório de auditoria.
05416. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de datas e documentar achado no relatório de auditoria.
05417. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de datas e documentar achado no relatório de auditoria.
05418. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de datas e documentar achado no relatório de auditoria.
05419. [REVISÃO_TOTAL] Na área `header`, verificar consistência de datas e documentar achado no relatório de auditoria.
05420. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de datas e documentar achado no relatório de auditoria.
05421. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de datas e documentar achado no relatório de auditoria.
05422. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de datas e documentar achado no relatório de auditoria.
05423. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de datas e documentar achado no relatório de auditoria.
05424. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de datas e documentar achado no relatório de auditoria.
05425. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de datas e documentar achado no relatório de auditoria.
05426. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de datas e documentar achado no relatório de auditoria.
05427. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de datas e documentar achado no relatório de auditoria.
05428. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de datas e documentar achado no relatório de auditoria.
05429. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de datas e documentar achado no relatório de auditoria.
05430. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de datas e documentar achado no relatório de auditoria.
05431. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de datas e documentar achado no relatório de auditoria.
05432. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de datas e documentar achado no relatório de auditoria.
05433. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de datas e documentar achado no relatório de auditoria.
05434. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de datas e documentar achado no relatório de auditoria.
05435. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de datas e documentar achado no relatório de auditoria.
05436. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05437. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05438. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05439. [REVISÃO_TOTAL] Na área `API`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05440. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05441. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05442. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05443. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05444. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05445. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05446. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05447. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05448. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05449. [REVISÃO_TOTAL] Na área `header`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05450. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05451. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05452. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05453. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05454. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05455. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05456. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05457. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05458. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05459. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05460. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05461. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05462. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05463. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05464. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05465. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de imagens e documentar achado no relatório de auditoria.
05466. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05467. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05468. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05469. [REVISÃO_TOTAL] Na área `API`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05470. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05471. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05472. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05473. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05474. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05475. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05476. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05477. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05478. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05479. [REVISÃO_TOTAL] Na área `header`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05480. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05481. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05482. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05483. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05484. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05485. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05486. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05487. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05488. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05489. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05490. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05491. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05492. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05493. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05494. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05495. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de permissões e documentar achado no relatório de auditoria.
05496. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência visual e documentar achado no relatório de auditoria.
05497. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência visual e documentar achado no relatório de auditoria.
05498. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência visual e documentar achado no relatório de auditoria.
05499. [REVISÃO_TOTAL] Na área `API`, verificar consistência visual e documentar achado no relatório de auditoria.
05500. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência visual e documentar achado no relatório de auditoria.
05501. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência visual e documentar achado no relatório de auditoria.
05502. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência visual e documentar achado no relatório de auditoria.
05503. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência visual e documentar achado no relatório de auditoria.
05504. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência visual e documentar achado no relatório de auditoria.
05505. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência visual e documentar achado no relatório de auditoria.
05506. [REVISÃO_TOTAL] Na área `logística`, verificar consistência visual e documentar achado no relatório de auditoria.
05507. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência visual e documentar achado no relatório de auditoria.
05508. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência visual e documentar achado no relatório de auditoria.
05509. [REVISÃO_TOTAL] Na área `header`, verificar consistência visual e documentar achado no relatório de auditoria.
05510. [REVISÃO_TOTAL] Na área `footer`, verificar consistência visual e documentar achado no relatório de auditoria.
05511. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência visual e documentar achado no relatório de auditoria.
05512. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência visual e documentar achado no relatório de auditoria.
05513. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência visual e documentar achado no relatório de auditoria.
05514. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência visual e documentar achado no relatório de auditoria.
05515. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência visual e documentar achado no relatório de auditoria.
05516. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência visual e documentar achado no relatório de auditoria.
05517. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência visual e documentar achado no relatório de auditoria.
05518. [REVISÃO_TOTAL] Na área `modais`, verificar consistência visual e documentar achado no relatório de auditoria.
05519. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência visual e documentar achado no relatório de auditoria.
05520. [REVISÃO_TOTAL] Na área `cards`, verificar consistência visual e documentar achado no relatório de auditoria.
05521. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência visual e documentar achado no relatório de auditoria.
05522. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência visual e documentar achado no relatório de auditoria.
05523. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência visual e documentar achado no relatório de auditoria.
05524. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência visual e documentar achado no relatório de auditoria.
05525. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência visual e documentar achado no relatório de auditoria.
05526. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
05527. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
05528. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de erros e documentar achado no relatório de auditoria.
05529. [REVISÃO_TOTAL] Na área `API`, verificar consistência de erros e documentar achado no relatório de auditoria.
05530. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de erros e documentar achado no relatório de auditoria.
05531. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de erros e documentar achado no relatório de auditoria.
05532. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de erros e documentar achado no relatório de auditoria.
05533. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de erros e documentar achado no relatório de auditoria.
05534. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de erros e documentar achado no relatório de auditoria.
05535. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de erros e documentar achado no relatório de auditoria.
05536. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de erros e documentar achado no relatório de auditoria.
05537. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de erros e documentar achado no relatório de auditoria.
05538. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de erros e documentar achado no relatório de auditoria.
05539. [REVISÃO_TOTAL] Na área `header`, verificar consistência de erros e documentar achado no relatório de auditoria.
05540. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de erros e documentar achado no relatório de auditoria.
05541. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de erros e documentar achado no relatório de auditoria.
05542. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de erros e documentar achado no relatório de auditoria.
05543. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de erros e documentar achado no relatório de auditoria.
05544. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de erros e documentar achado no relatório de auditoria.
05545. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de erros e documentar achado no relatório de auditoria.
05546. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de erros e documentar achado no relatório de auditoria.
05547. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de erros e documentar achado no relatório de auditoria.
05548. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de erros e documentar achado no relatório de auditoria.
05549. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de erros e documentar achado no relatório de auditoria.
05550. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de erros e documentar achado no relatório de auditoria.
05551. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de erros e documentar achado no relatório de auditoria.
05552. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de erros e documentar achado no relatório de auditoria.
05553. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de erros e documentar achado no relatório de auditoria.
05554. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de erros e documentar achado no relatório de auditoria.
05555. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de erros e documentar achado no relatório de auditoria.
05556. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
05557. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
05558. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário feliz e documentar achado no relatório de auditoria.
05559. [REVISÃO_TOTAL] Na área `API`, verificar cenário feliz e documentar achado no relatório de auditoria.
05560. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário feliz e documentar achado no relatório de auditoria.
05561. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário feliz e documentar achado no relatório de auditoria.
05562. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário feliz e documentar achado no relatório de auditoria.
05563. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário feliz e documentar achado no relatório de auditoria.
05564. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário feliz e documentar achado no relatório de auditoria.
05565. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário feliz e documentar achado no relatório de auditoria.
05566. [REVISÃO_TOTAL] Na área `logística`, verificar cenário feliz e documentar achado no relatório de auditoria.
05567. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário feliz e documentar achado no relatório de auditoria.
05568. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário feliz e documentar achado no relatório de auditoria.
05569. [REVISÃO_TOTAL] Na área `header`, verificar cenário feliz e documentar achado no relatório de auditoria.
05570. [REVISÃO_TOTAL] Na área `footer`, verificar cenário feliz e documentar achado no relatório de auditoria.
05571. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário feliz e documentar achado no relatório de auditoria.
05572. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário feliz e documentar achado no relatório de auditoria.
05573. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário feliz e documentar achado no relatório de auditoria.
05574. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário feliz e documentar achado no relatório de auditoria.
05575. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário feliz e documentar achado no relatório de auditoria.
05576. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário feliz e documentar achado no relatório de auditoria.
05577. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário feliz e documentar achado no relatório de auditoria.
05578. [REVISÃO_TOTAL] Na área `modais`, verificar cenário feliz e documentar achado no relatório de auditoria.
05579. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário feliz e documentar achado no relatório de auditoria.
05580. [REVISÃO_TOTAL] Na área `cards`, verificar cenário feliz e documentar achado no relatório de auditoria.
05581. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário feliz e documentar achado no relatório de auditoria.
05582. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário feliz e documentar achado no relatório de auditoria.
05583. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário feliz e documentar achado no relatório de auditoria.
05584. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário feliz e documentar achado no relatório de auditoria.
05585. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário feliz e documentar achado no relatório de auditoria.
05586. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
05587. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
05588. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário extremo e documentar achado no relatório de auditoria.
05589. [REVISÃO_TOTAL] Na área `API`, verificar cenário extremo e documentar achado no relatório de auditoria.
05590. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário extremo e documentar achado no relatório de auditoria.
05591. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário extremo e documentar achado no relatório de auditoria.
05592. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário extremo e documentar achado no relatório de auditoria.
05593. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário extremo e documentar achado no relatório de auditoria.
05594. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário extremo e documentar achado no relatório de auditoria.
05595. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário extremo e documentar achado no relatório de auditoria.
05596. [REVISÃO_TOTAL] Na área `logística`, verificar cenário extremo e documentar achado no relatório de auditoria.
05597. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário extremo e documentar achado no relatório de auditoria.
05598. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário extremo e documentar achado no relatório de auditoria.
05599. [REVISÃO_TOTAL] Na área `header`, verificar cenário extremo e documentar achado no relatório de auditoria.
05600. [REVISÃO_TOTAL] Na área `footer`, verificar cenário extremo e documentar achado no relatório de auditoria.
05601. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário extremo e documentar achado no relatório de auditoria.
05602. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário extremo e documentar achado no relatório de auditoria.
05603. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário extremo e documentar achado no relatório de auditoria.
05604. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário extremo e documentar achado no relatório de auditoria.
05605. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário extremo e documentar achado no relatório de auditoria.
05606. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário extremo e documentar achado no relatório de auditoria.
05607. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário extremo e documentar achado no relatório de auditoria.
05608. [REVISÃO_TOTAL] Na área `modais`, verificar cenário extremo e documentar achado no relatório de auditoria.
05609. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário extremo e documentar achado no relatório de auditoria.
05610. [REVISÃO_TOTAL] Na área `cards`, verificar cenário extremo e documentar achado no relatório de auditoria.
05611. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário extremo e documentar achado no relatório de auditoria.
05612. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário extremo e documentar achado no relatório de auditoria.
05613. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário extremo e documentar achado no relatório de auditoria.
05614. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário extremo e documentar achado no relatório de auditoria.
05615. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário extremo e documentar achado no relatório de auditoria.
05616. [REVISÃO_TOTAL] Na área `front-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05617. [REVISÃO_TOTAL] Na área `back-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05618. [REVISÃO_TOTAL] Na área `banco de dados`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05619. [REVISÃO_TOTAL] Na área `API`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05620. [REVISÃO_TOTAL] Na área `autenticação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05621. [REVISÃO_TOTAL] Na área `autorização`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05622. [REVISÃO_TOTAL] Na área `produtos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05623. [REVISÃO_TOTAL] Na área `pedidos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05624. [REVISÃO_TOTAL] Na área `encomendas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05625. [REVISÃO_TOTAL] Na área `orçamentos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05626. [REVISÃO_TOTAL] Na área `logística`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05627. [REVISÃO_TOTAL] Na área `suporte`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05628. [REVISÃO_TOTAL] Na área `notificações`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05629. [REVISÃO_TOTAL] Na área `header`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05630. [REVISÃO_TOTAL] Na área `footer`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05631. [REVISÃO_TOTAL] Na área `sidebar`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05632. [REVISÃO_TOTAL] Na área `dashboard`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05633. [REVISÃO_TOTAL] Na área `perfil`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05634. [REVISÃO_TOTAL] Na área `uploads`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05635. [REVISÃO_TOTAL] Na área `imagens`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05636. [REVISÃO_TOTAL] Na área `filtros`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05637. [REVISÃO_TOTAL] Na área `paginação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05638. [REVISÃO_TOTAL] Na área `modais`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05639. [REVISÃO_TOTAL] Na área `tabelas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05640. [REVISÃO_TOTAL] Na área `cards`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05641. [REVISÃO_TOTAL] Na área `responsividade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05642. [REVISÃO_TOTAL] Na área `acessibilidade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05643. [REVISÃO_TOTAL] Na área `segurança`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05644. [REVISÃO_TOTAL] Na área `tratamento de erro`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05645. [REVISÃO_TOTAL] Na área `mensagens de usuário`, registrar evidência encontrada e documentar achado no relatório de auditoria.
05646. [REVISÃO_TOTAL] Na área `front-end`, classificar severidade e documentar achado no relatório de auditoria.
05647. [REVISÃO_TOTAL] Na área `back-end`, classificar severidade e documentar achado no relatório de auditoria.
05648. [REVISÃO_TOTAL] Na área `banco de dados`, classificar severidade e documentar achado no relatório de auditoria.
05649. [REVISÃO_TOTAL] Na área `API`, classificar severidade e documentar achado no relatório de auditoria.
05650. [REVISÃO_TOTAL] Na área `autenticação`, classificar severidade e documentar achado no relatório de auditoria.
05651. [REVISÃO_TOTAL] Na área `autorização`, classificar severidade e documentar achado no relatório de auditoria.
05652. [REVISÃO_TOTAL] Na área `produtos`, classificar severidade e documentar achado no relatório de auditoria.
05653. [REVISÃO_TOTAL] Na área `pedidos`, classificar severidade e documentar achado no relatório de auditoria.
05654. [REVISÃO_TOTAL] Na área `encomendas`, classificar severidade e documentar achado no relatório de auditoria.
05655. [REVISÃO_TOTAL] Na área `orçamentos`, classificar severidade e documentar achado no relatório de auditoria.
05656. [REVISÃO_TOTAL] Na área `logística`, classificar severidade e documentar achado no relatório de auditoria.
05657. [REVISÃO_TOTAL] Na área `suporte`, classificar severidade e documentar achado no relatório de auditoria.
05658. [REVISÃO_TOTAL] Na área `notificações`, classificar severidade e documentar achado no relatório de auditoria.
05659. [REVISÃO_TOTAL] Na área `header`, classificar severidade e documentar achado no relatório de auditoria.
05660. [REVISÃO_TOTAL] Na área `footer`, classificar severidade e documentar achado no relatório de auditoria.
05661. [REVISÃO_TOTAL] Na área `sidebar`, classificar severidade e documentar achado no relatório de auditoria.
05662. [REVISÃO_TOTAL] Na área `dashboard`, classificar severidade e documentar achado no relatório de auditoria.
05663. [REVISÃO_TOTAL] Na área `perfil`, classificar severidade e documentar achado no relatório de auditoria.
05664. [REVISÃO_TOTAL] Na área `uploads`, classificar severidade e documentar achado no relatório de auditoria.
05665. [REVISÃO_TOTAL] Na área `imagens`, classificar severidade e documentar achado no relatório de auditoria.
05666. [REVISÃO_TOTAL] Na área `filtros`, classificar severidade e documentar achado no relatório de auditoria.
05667. [REVISÃO_TOTAL] Na área `paginação`, classificar severidade e documentar achado no relatório de auditoria.
05668. [REVISÃO_TOTAL] Na área `modais`, classificar severidade e documentar achado no relatório de auditoria.
05669. [REVISÃO_TOTAL] Na área `tabelas`, classificar severidade e documentar achado no relatório de auditoria.
05670. [REVISÃO_TOTAL] Na área `cards`, classificar severidade e documentar achado no relatório de auditoria.
05671. [REVISÃO_TOTAL] Na área `responsividade`, classificar severidade e documentar achado no relatório de auditoria.
05672. [REVISÃO_TOTAL] Na área `acessibilidade`, classificar severidade e documentar achado no relatório de auditoria.
05673. [REVISÃO_TOTAL] Na área `segurança`, classificar severidade e documentar achado no relatório de auditoria.
05674. [REVISÃO_TOTAL] Na área `tratamento de erro`, classificar severidade e documentar achado no relatório de auditoria.
05675. [REVISÃO_TOTAL] Na área `mensagens de usuário`, classificar severidade e documentar achado no relatório de auditoria.
05676. [REVISÃO_TOTAL] Na área `front-end`, propor correção futura e documentar achado no relatório de auditoria.
05677. [REVISÃO_TOTAL] Na área `back-end`, propor correção futura e documentar achado no relatório de auditoria.
05678. [REVISÃO_TOTAL] Na área `banco de dados`, propor correção futura e documentar achado no relatório de auditoria.
05679. [REVISÃO_TOTAL] Na área `API`, propor correção futura e documentar achado no relatório de auditoria.
05680. [REVISÃO_TOTAL] Na área `autenticação`, propor correção futura e documentar achado no relatório de auditoria.
05681. [REVISÃO_TOTAL] Na área `autorização`, propor correção futura e documentar achado no relatório de auditoria.
05682. [REVISÃO_TOTAL] Na área `produtos`, propor correção futura e documentar achado no relatório de auditoria.
05683. [REVISÃO_TOTAL] Na área `pedidos`, propor correção futura e documentar achado no relatório de auditoria.
05684. [REVISÃO_TOTAL] Na área `encomendas`, propor correção futura e documentar achado no relatório de auditoria.
05685. [REVISÃO_TOTAL] Na área `orçamentos`, propor correção futura e documentar achado no relatório de auditoria.
05686. [REVISÃO_TOTAL] Na área `logística`, propor correção futura e documentar achado no relatório de auditoria.
05687. [REVISÃO_TOTAL] Na área `suporte`, propor correção futura e documentar achado no relatório de auditoria.
05688. [REVISÃO_TOTAL] Na área `notificações`, propor correção futura e documentar achado no relatório de auditoria.
05689. [REVISÃO_TOTAL] Na área `header`, propor correção futura e documentar achado no relatório de auditoria.
05690. [REVISÃO_TOTAL] Na área `footer`, propor correção futura e documentar achado no relatório de auditoria.
05691. [REVISÃO_TOTAL] Na área `sidebar`, propor correção futura e documentar achado no relatório de auditoria.
05692. [REVISÃO_TOTAL] Na área `dashboard`, propor correção futura e documentar achado no relatório de auditoria.
05693. [REVISÃO_TOTAL] Na área `perfil`, propor correção futura e documentar achado no relatório de auditoria.
05694. [REVISÃO_TOTAL] Na área `uploads`, propor correção futura e documentar achado no relatório de auditoria.
05695. [REVISÃO_TOTAL] Na área `imagens`, propor correção futura e documentar achado no relatório de auditoria.
05696. [REVISÃO_TOTAL] Na área `filtros`, propor correção futura e documentar achado no relatório de auditoria.
05697. [REVISÃO_TOTAL] Na área `paginação`, propor correção futura e documentar achado no relatório de auditoria.
05698. [REVISÃO_TOTAL] Na área `modais`, propor correção futura e documentar achado no relatório de auditoria.
05699. [REVISÃO_TOTAL] Na área `tabelas`, propor correção futura e documentar achado no relatório de auditoria.
05700. [REVISÃO_TOTAL] Na área `cards`, propor correção futura e documentar achado no relatório de auditoria.
05701. [REVISÃO_TOTAL] Na área `responsividade`, propor correção futura e documentar achado no relatório de auditoria.
05702. [REVISÃO_TOTAL] Na área `acessibilidade`, propor correção futura e documentar achado no relatório de auditoria.
05703. [REVISÃO_TOTAL] Na área `segurança`, propor correção futura e documentar achado no relatório de auditoria.
05704. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor correção futura e documentar achado no relatório de auditoria.
05705. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor correção futura e documentar achado no relatório de auditoria.
05706. [REVISÃO_TOTAL] Na área `front-end`, propor teste manual e documentar achado no relatório de auditoria.
05707. [REVISÃO_TOTAL] Na área `back-end`, propor teste manual e documentar achado no relatório de auditoria.
05708. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste manual e documentar achado no relatório de auditoria.
05709. [REVISÃO_TOTAL] Na área `API`, propor teste manual e documentar achado no relatório de auditoria.
05710. [REVISÃO_TOTAL] Na área `autenticação`, propor teste manual e documentar achado no relatório de auditoria.
05711. [REVISÃO_TOTAL] Na área `autorização`, propor teste manual e documentar achado no relatório de auditoria.
05712. [REVISÃO_TOTAL] Na área `produtos`, propor teste manual e documentar achado no relatório de auditoria.
05713. [REVISÃO_TOTAL] Na área `pedidos`, propor teste manual e documentar achado no relatório de auditoria.
05714. [REVISÃO_TOTAL] Na área `encomendas`, propor teste manual e documentar achado no relatório de auditoria.
05715. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste manual e documentar achado no relatório de auditoria.
05716. [REVISÃO_TOTAL] Na área `logística`, propor teste manual e documentar achado no relatório de auditoria.
05717. [REVISÃO_TOTAL] Na área `suporte`, propor teste manual e documentar achado no relatório de auditoria.
05718. [REVISÃO_TOTAL] Na área `notificações`, propor teste manual e documentar achado no relatório de auditoria.
05719. [REVISÃO_TOTAL] Na área `header`, propor teste manual e documentar achado no relatório de auditoria.
05720. [REVISÃO_TOTAL] Na área `footer`, propor teste manual e documentar achado no relatório de auditoria.
05721. [REVISÃO_TOTAL] Na área `sidebar`, propor teste manual e documentar achado no relatório de auditoria.
05722. [REVISÃO_TOTAL] Na área `dashboard`, propor teste manual e documentar achado no relatório de auditoria.
05723. [REVISÃO_TOTAL] Na área `perfil`, propor teste manual e documentar achado no relatório de auditoria.
05724. [REVISÃO_TOTAL] Na área `uploads`, propor teste manual e documentar achado no relatório de auditoria.
05725. [REVISÃO_TOTAL] Na área `imagens`, propor teste manual e documentar achado no relatório de auditoria.
05726. [REVISÃO_TOTAL] Na área `filtros`, propor teste manual e documentar achado no relatório de auditoria.
05727. [REVISÃO_TOTAL] Na área `paginação`, propor teste manual e documentar achado no relatório de auditoria.
05728. [REVISÃO_TOTAL] Na área `modais`, propor teste manual e documentar achado no relatório de auditoria.
05729. [REVISÃO_TOTAL] Na área `tabelas`, propor teste manual e documentar achado no relatório de auditoria.
05730. [REVISÃO_TOTAL] Na área `cards`, propor teste manual e documentar achado no relatório de auditoria.
05731. [REVISÃO_TOTAL] Na área `responsividade`, propor teste manual e documentar achado no relatório de auditoria.
05732. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste manual e documentar achado no relatório de auditoria.
05733. [REVISÃO_TOTAL] Na área `segurança`, propor teste manual e documentar achado no relatório de auditoria.
05734. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste manual e documentar achado no relatório de auditoria.
05735. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste manual e documentar achado no relatório de auditoria.
05736. [REVISÃO_TOTAL] Na área `front-end`, propor teste automatizado e documentar achado no relatório de auditoria.
05737. [REVISÃO_TOTAL] Na área `back-end`, propor teste automatizado e documentar achado no relatório de auditoria.
05738. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste automatizado e documentar achado no relatório de auditoria.
05739. [REVISÃO_TOTAL] Na área `API`, propor teste automatizado e documentar achado no relatório de auditoria.
05740. [REVISÃO_TOTAL] Na área `autenticação`, propor teste automatizado e documentar achado no relatório de auditoria.
05741. [REVISÃO_TOTAL] Na área `autorização`, propor teste automatizado e documentar achado no relatório de auditoria.
05742. [REVISÃO_TOTAL] Na área `produtos`, propor teste automatizado e documentar achado no relatório de auditoria.
05743. [REVISÃO_TOTAL] Na área `pedidos`, propor teste automatizado e documentar achado no relatório de auditoria.
05744. [REVISÃO_TOTAL] Na área `encomendas`, propor teste automatizado e documentar achado no relatório de auditoria.
05745. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste automatizado e documentar achado no relatório de auditoria.
05746. [REVISÃO_TOTAL] Na área `logística`, propor teste automatizado e documentar achado no relatório de auditoria.
05747. [REVISÃO_TOTAL] Na área `suporte`, propor teste automatizado e documentar achado no relatório de auditoria.
05748. [REVISÃO_TOTAL] Na área `notificações`, propor teste automatizado e documentar achado no relatório de auditoria.
05749. [REVISÃO_TOTAL] Na área `header`, propor teste automatizado e documentar achado no relatório de auditoria.
05750. [REVISÃO_TOTAL] Na área `footer`, propor teste automatizado e documentar achado no relatório de auditoria.
05751. [REVISÃO_TOTAL] Na área `sidebar`, propor teste automatizado e documentar achado no relatório de auditoria.
05752. [REVISÃO_TOTAL] Na área `dashboard`, propor teste automatizado e documentar achado no relatório de auditoria.
05753. [REVISÃO_TOTAL] Na área `perfil`, propor teste automatizado e documentar achado no relatório de auditoria.
05754. [REVISÃO_TOTAL] Na área `uploads`, propor teste automatizado e documentar achado no relatório de auditoria.
05755. [REVISÃO_TOTAL] Na área `imagens`, propor teste automatizado e documentar achado no relatório de auditoria.
05756. [REVISÃO_TOTAL] Na área `filtros`, propor teste automatizado e documentar achado no relatório de auditoria.
05757. [REVISÃO_TOTAL] Na área `paginação`, propor teste automatizado e documentar achado no relatório de auditoria.
05758. [REVISÃO_TOTAL] Na área `modais`, propor teste automatizado e documentar achado no relatório de auditoria.
05759. [REVISÃO_TOTAL] Na área `tabelas`, propor teste automatizado e documentar achado no relatório de auditoria.
05760. [REVISÃO_TOTAL] Na área `cards`, propor teste automatizado e documentar achado no relatório de auditoria.
05761. [REVISÃO_TOTAL] Na área `responsividade`, propor teste automatizado e documentar achado no relatório de auditoria.
05762. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste automatizado e documentar achado no relatório de auditoria.
05763. [REVISÃO_TOTAL] Na área `segurança`, propor teste automatizado e documentar achado no relatório de auditoria.
05764. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste automatizado e documentar achado no relatório de auditoria.
05765. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste automatizado e documentar achado no relatório de auditoria.
05766. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05767. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05768. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05769. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05770. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05771. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05772. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05773. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05774. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05775. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05776. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05777. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05778. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05779. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05780. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05781. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05782. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05783. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05784. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05785. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05786. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05787. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05788. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05789. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05790. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05791. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05792. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05793. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05794. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05795. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
05796. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05797. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05798. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05799. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05800. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05801. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05802. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05803. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05804. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05805. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05806. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05807. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05808. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05809. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05810. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05811. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05812. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05813. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05814. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05815. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05816. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05817. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05818. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05819. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05820. [REVISÃO_TOTAL] Na área `cards`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05821. [REVISÃO_TOTAL] Na área `responsividade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05822. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05823. [REVISÃO_TOTAL] Na área `segurança`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05824. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05825. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear fluxo de dados e documentar achado no relatório de auditoria.
05826. [REVISÃO_TOTAL] Na área `front-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05827. [REVISÃO_TOTAL] Na área `back-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05828. [REVISÃO_TOTAL] Na área `banco de dados`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05829. [REVISÃO_TOTAL] Na área `API`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05830. [REVISÃO_TOTAL] Na área `autenticação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05831. [REVISÃO_TOTAL] Na área `autorização`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05832. [REVISÃO_TOTAL] Na área `produtos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05833. [REVISÃO_TOTAL] Na área `pedidos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05834. [REVISÃO_TOTAL] Na área `encomendas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05835. [REVISÃO_TOTAL] Na área `orçamentos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05836. [REVISÃO_TOTAL] Na área `logística`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05837. [REVISÃO_TOTAL] Na área `suporte`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05838. [REVISÃO_TOTAL] Na área `notificações`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05839. [REVISÃO_TOTAL] Na área `header`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05840. [REVISÃO_TOTAL] Na área `footer`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05841. [REVISÃO_TOTAL] Na área `sidebar`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05842. [REVISÃO_TOTAL] Na área `dashboard`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05843. [REVISÃO_TOTAL] Na área `perfil`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05844. [REVISÃO_TOTAL] Na área `uploads`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05845. [REVISÃO_TOTAL] Na área `imagens`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05846. [REVISÃO_TOTAL] Na área `filtros`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05847. [REVISÃO_TOTAL] Na área `paginação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05848. [REVISÃO_TOTAL] Na área `modais`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05849. [REVISÃO_TOTAL] Na área `tabelas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05850. [REVISÃO_TOTAL] Na área `cards`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05851. [REVISÃO_TOTAL] Na área `responsividade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05852. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05853. [REVISÃO_TOTAL] Na área `segurança`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05854. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05855. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
05856. [REVISÃO_TOTAL] Na área `front-end`, mapear validações existentes e documentar achado no relatório de auditoria.
05857. [REVISÃO_TOTAL] Na área `back-end`, mapear validações existentes e documentar achado no relatório de auditoria.
05858. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações existentes e documentar achado no relatório de auditoria.
05859. [REVISÃO_TOTAL] Na área `API`, mapear validações existentes e documentar achado no relatório de auditoria.
05860. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações existentes e documentar achado no relatório de auditoria.
05861. [REVISÃO_TOTAL] Na área `autorização`, mapear validações existentes e documentar achado no relatório de auditoria.
05862. [REVISÃO_TOTAL] Na área `produtos`, mapear validações existentes e documentar achado no relatório de auditoria.
05863. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações existentes e documentar achado no relatório de auditoria.
05864. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações existentes e documentar achado no relatório de auditoria.
05865. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações existentes e documentar achado no relatório de auditoria.
05866. [REVISÃO_TOTAL] Na área `logística`, mapear validações existentes e documentar achado no relatório de auditoria.
05867. [REVISÃO_TOTAL] Na área `suporte`, mapear validações existentes e documentar achado no relatório de auditoria.
05868. [REVISÃO_TOTAL] Na área `notificações`, mapear validações existentes e documentar achado no relatório de auditoria.
05869. [REVISÃO_TOTAL] Na área `header`, mapear validações existentes e documentar achado no relatório de auditoria.
05870. [REVISÃO_TOTAL] Na área `footer`, mapear validações existentes e documentar achado no relatório de auditoria.
05871. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações existentes e documentar achado no relatório de auditoria.
05872. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações existentes e documentar achado no relatório de auditoria.
05873. [REVISÃO_TOTAL] Na área `perfil`, mapear validações existentes e documentar achado no relatório de auditoria.
05874. [REVISÃO_TOTAL] Na área `uploads`, mapear validações existentes e documentar achado no relatório de auditoria.
05875. [REVISÃO_TOTAL] Na área `imagens`, mapear validações existentes e documentar achado no relatório de auditoria.
05876. [REVISÃO_TOTAL] Na área `filtros`, mapear validações existentes e documentar achado no relatório de auditoria.
05877. [REVISÃO_TOTAL] Na área `paginação`, mapear validações existentes e documentar achado no relatório de auditoria.
05878. [REVISÃO_TOTAL] Na área `modais`, mapear validações existentes e documentar achado no relatório de auditoria.
05879. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações existentes e documentar achado no relatório de auditoria.
05880. [REVISÃO_TOTAL] Na área `cards`, mapear validações existentes e documentar achado no relatório de auditoria.
05881. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações existentes e documentar achado no relatório de auditoria.
05882. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações existentes e documentar achado no relatório de auditoria.
05883. [REVISÃO_TOTAL] Na área `segurança`, mapear validações existentes e documentar achado no relatório de auditoria.
05884. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações existentes e documentar achado no relatório de auditoria.
05885. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações existentes e documentar achado no relatório de auditoria.
05886. [REVISÃO_TOTAL] Na área `front-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
05887. [REVISÃO_TOTAL] Na área `back-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
05888. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações ausentes e documentar achado no relatório de auditoria.
05889. [REVISÃO_TOTAL] Na área `API`, mapear validações ausentes e documentar achado no relatório de auditoria.
05890. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações ausentes e documentar achado no relatório de auditoria.
05891. [REVISÃO_TOTAL] Na área `autorização`, mapear validações ausentes e documentar achado no relatório de auditoria.
05892. [REVISÃO_TOTAL] Na área `produtos`, mapear validações ausentes e documentar achado no relatório de auditoria.
05893. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações ausentes e documentar achado no relatório de auditoria.
05894. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações ausentes e documentar achado no relatório de auditoria.
05895. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações ausentes e documentar achado no relatório de auditoria.
05896. [REVISÃO_TOTAL] Na área `logística`, mapear validações ausentes e documentar achado no relatório de auditoria.
05897. [REVISÃO_TOTAL] Na área `suporte`, mapear validações ausentes e documentar achado no relatório de auditoria.
05898. [REVISÃO_TOTAL] Na área `notificações`, mapear validações ausentes e documentar achado no relatório de auditoria.
05899. [REVISÃO_TOTAL] Na área `header`, mapear validações ausentes e documentar achado no relatório de auditoria.
05900. [REVISÃO_TOTAL] Na área `footer`, mapear validações ausentes e documentar achado no relatório de auditoria.
05901. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações ausentes e documentar achado no relatório de auditoria.
05902. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações ausentes e documentar achado no relatório de auditoria.
05903. [REVISÃO_TOTAL] Na área `perfil`, mapear validações ausentes e documentar achado no relatório de auditoria.
05904. [REVISÃO_TOTAL] Na área `uploads`, mapear validações ausentes e documentar achado no relatório de auditoria.
05905. [REVISÃO_TOTAL] Na área `imagens`, mapear validações ausentes e documentar achado no relatório de auditoria.
05906. [REVISÃO_TOTAL] Na área `filtros`, mapear validações ausentes e documentar achado no relatório de auditoria.
05907. [REVISÃO_TOTAL] Na área `paginação`, mapear validações ausentes e documentar achado no relatório de auditoria.
05908. [REVISÃO_TOTAL] Na área `modais`, mapear validações ausentes e documentar achado no relatório de auditoria.
05909. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações ausentes e documentar achado no relatório de auditoria.
05910. [REVISÃO_TOTAL] Na área `cards`, mapear validações ausentes e documentar achado no relatório de auditoria.
05911. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações ausentes e documentar achado no relatório de auditoria.
05912. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações ausentes e documentar achado no relatório de auditoria.
05913. [REVISÃO_TOTAL] Na área `segurança`, mapear validações ausentes e documentar achado no relatório de auditoria.
05914. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações ausentes e documentar achado no relatório de auditoria.
05915. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações ausentes e documentar achado no relatório de auditoria.
05916. [REVISÃO_TOTAL] Na área `front-end`, mapear dependências e documentar achado no relatório de auditoria.
05917. [REVISÃO_TOTAL] Na área `back-end`, mapear dependências e documentar achado no relatório de auditoria.
05918. [REVISÃO_TOTAL] Na área `banco de dados`, mapear dependências e documentar achado no relatório de auditoria.
05919. [REVISÃO_TOTAL] Na área `API`, mapear dependências e documentar achado no relatório de auditoria.
05920. [REVISÃO_TOTAL] Na área `autenticação`, mapear dependências e documentar achado no relatório de auditoria.
05921. [REVISÃO_TOTAL] Na área `autorização`, mapear dependências e documentar achado no relatório de auditoria.
05922. [REVISÃO_TOTAL] Na área `produtos`, mapear dependências e documentar achado no relatório de auditoria.
05923. [REVISÃO_TOTAL] Na área `pedidos`, mapear dependências e documentar achado no relatório de auditoria.
05924. [REVISÃO_TOTAL] Na área `encomendas`, mapear dependências e documentar achado no relatório de auditoria.
05925. [REVISÃO_TOTAL] Na área `orçamentos`, mapear dependências e documentar achado no relatório de auditoria.
05926. [REVISÃO_TOTAL] Na área `logística`, mapear dependências e documentar achado no relatório de auditoria.
05927. [REVISÃO_TOTAL] Na área `suporte`, mapear dependências e documentar achado no relatório de auditoria.
05928. [REVISÃO_TOTAL] Na área `notificações`, mapear dependências e documentar achado no relatório de auditoria.
05929. [REVISÃO_TOTAL] Na área `header`, mapear dependências e documentar achado no relatório de auditoria.
05930. [REVISÃO_TOTAL] Na área `footer`, mapear dependências e documentar achado no relatório de auditoria.
05931. [REVISÃO_TOTAL] Na área `sidebar`, mapear dependências e documentar achado no relatório de auditoria.
05932. [REVISÃO_TOTAL] Na área `dashboard`, mapear dependências e documentar achado no relatório de auditoria.
05933. [REVISÃO_TOTAL] Na área `perfil`, mapear dependências e documentar achado no relatório de auditoria.
05934. [REVISÃO_TOTAL] Na área `uploads`, mapear dependências e documentar achado no relatório de auditoria.
05935. [REVISÃO_TOTAL] Na área `imagens`, mapear dependências e documentar achado no relatório de auditoria.
05936. [REVISÃO_TOTAL] Na área `filtros`, mapear dependências e documentar achado no relatório de auditoria.
05937. [REVISÃO_TOTAL] Na área `paginação`, mapear dependências e documentar achado no relatório de auditoria.
05938. [REVISÃO_TOTAL] Na área `modais`, mapear dependências e documentar achado no relatório de auditoria.
05939. [REVISÃO_TOTAL] Na área `tabelas`, mapear dependências e documentar achado no relatório de auditoria.
05940. [REVISÃO_TOTAL] Na área `cards`, mapear dependências e documentar achado no relatório de auditoria.
05941. [REVISÃO_TOTAL] Na área `responsividade`, mapear dependências e documentar achado no relatório de auditoria.
05942. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear dependências e documentar achado no relatório de auditoria.
05943. [REVISÃO_TOTAL] Na área `segurança`, mapear dependências e documentar achado no relatório de auditoria.
05944. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear dependências e documentar achado no relatório de auditoria.
05945. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear dependências e documentar achado no relatório de auditoria.
05946. [REVISÃO_TOTAL] Na área `front-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
05947. [REVISÃO_TOTAL] Na área `back-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
05948. [REVISÃO_TOTAL] Na área `banco de dados`, mapear risco de regressão e documentar achado no relatório de auditoria.
05949. [REVISÃO_TOTAL] Na área `API`, mapear risco de regressão e documentar achado no relatório de auditoria.
05950. [REVISÃO_TOTAL] Na área `autenticação`, mapear risco de regressão e documentar achado no relatório de auditoria.
05951. [REVISÃO_TOTAL] Na área `autorização`, mapear risco de regressão e documentar achado no relatório de auditoria.
05952. [REVISÃO_TOTAL] Na área `produtos`, mapear risco de regressão e documentar achado no relatório de auditoria.
05953. [REVISÃO_TOTAL] Na área `pedidos`, mapear risco de regressão e documentar achado no relatório de auditoria.
05954. [REVISÃO_TOTAL] Na área `encomendas`, mapear risco de regressão e documentar achado no relatório de auditoria.
05955. [REVISÃO_TOTAL] Na área `orçamentos`, mapear risco de regressão e documentar achado no relatório de auditoria.
05956. [REVISÃO_TOTAL] Na área `logística`, mapear risco de regressão e documentar achado no relatório de auditoria.
05957. [REVISÃO_TOTAL] Na área `suporte`, mapear risco de regressão e documentar achado no relatório de auditoria.
05958. [REVISÃO_TOTAL] Na área `notificações`, mapear risco de regressão e documentar achado no relatório de auditoria.
05959. [REVISÃO_TOTAL] Na área `header`, mapear risco de regressão e documentar achado no relatório de auditoria.
05960. [REVISÃO_TOTAL] Na área `footer`, mapear risco de regressão e documentar achado no relatório de auditoria.
05961. [REVISÃO_TOTAL] Na área `sidebar`, mapear risco de regressão e documentar achado no relatório de auditoria.
05962. [REVISÃO_TOTAL] Na área `dashboard`, mapear risco de regressão e documentar achado no relatório de auditoria.
05963. [REVISÃO_TOTAL] Na área `perfil`, mapear risco de regressão e documentar achado no relatório de auditoria.
05964. [REVISÃO_TOTAL] Na área `uploads`, mapear risco de regressão e documentar achado no relatório de auditoria.
05965. [REVISÃO_TOTAL] Na área `imagens`, mapear risco de regressão e documentar achado no relatório de auditoria.
05966. [REVISÃO_TOTAL] Na área `filtros`, mapear risco de regressão e documentar achado no relatório de auditoria.
05967. [REVISÃO_TOTAL] Na área `paginação`, mapear risco de regressão e documentar achado no relatório de auditoria.
05968. [REVISÃO_TOTAL] Na área `modais`, mapear risco de regressão e documentar achado no relatório de auditoria.
05969. [REVISÃO_TOTAL] Na área `tabelas`, mapear risco de regressão e documentar achado no relatório de auditoria.
05970. [REVISÃO_TOTAL] Na área `cards`, mapear risco de regressão e documentar achado no relatório de auditoria.
05971. [REVISÃO_TOTAL] Na área `responsividade`, mapear risco de regressão e documentar achado no relatório de auditoria.
05972. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear risco de regressão e documentar achado no relatório de auditoria.
05973. [REVISÃO_TOTAL] Na área `segurança`, mapear risco de regressão e documentar achado no relatório de auditoria.
05974. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear risco de regressão e documentar achado no relatório de auditoria.
05975. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear risco de regressão e documentar achado no relatório de auditoria.
05976. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05977. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05978. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05979. [REVISÃO_TOTAL] Na área `API`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05980. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05981. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05982. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05983. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05984. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05985. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05986. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05987. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05988. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05989. [REVISÃO_TOTAL] Na área `header`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05990. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05991. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05992. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05993. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05994. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05995. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05996. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05997. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05998. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
05999. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06000. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06001. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06002. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06003. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06004. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06005. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06006. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06007. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06008. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06009. [REVISÃO_TOTAL] Na área `API`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06010. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06011. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06012. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06013. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06014. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06015. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06016. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06017. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06018. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06019. [REVISÃO_TOTAL] Na área `header`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06020. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06021. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06022. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06023. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06024. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06025. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06026. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06027. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06028. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06029. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06030. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06031. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06032. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06033. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06034. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06035. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06036. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
06037. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
06038. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em admin e documentar achado no relatório de auditoria.
06039. [REVISÃO_TOTAL] Na área `API`, mapear impacto em admin e documentar achado no relatório de auditoria.
06040. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em admin e documentar achado no relatório de auditoria.
06041. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em admin e documentar achado no relatório de auditoria.
06042. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em admin e documentar achado no relatório de auditoria.
06043. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em admin e documentar achado no relatório de auditoria.
06044. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em admin e documentar achado no relatório de auditoria.
06045. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em admin e documentar achado no relatório de auditoria.
06046. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em admin e documentar achado no relatório de auditoria.
06047. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em admin e documentar achado no relatório de auditoria.
06048. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em admin e documentar achado no relatório de auditoria.
06049. [REVISÃO_TOTAL] Na área `header`, mapear impacto em admin e documentar achado no relatório de auditoria.
06050. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em admin e documentar achado no relatório de auditoria.
06051. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em admin e documentar achado no relatório de auditoria.
06052. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em admin e documentar achado no relatório de auditoria.
06053. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em admin e documentar achado no relatório de auditoria.
06054. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em admin e documentar achado no relatório de auditoria.
06055. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em admin e documentar achado no relatório de auditoria.
06056. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em admin e documentar achado no relatório de auditoria.
06057. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em admin e documentar achado no relatório de auditoria.
06058. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em admin e documentar achado no relatório de auditoria.
06059. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em admin e documentar achado no relatório de auditoria.
06060. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em admin e documentar achado no relatório de auditoria.
06061. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em admin e documentar achado no relatório de auditoria.
06062. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em admin e documentar achado no relatório de auditoria.
06063. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em admin e documentar achado no relatório de auditoria.
06064. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em admin e documentar achado no relatório de auditoria.
06065. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em admin e documentar achado no relatório de auditoria.
06066. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06067. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06068. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06069. [REVISÃO_TOTAL] Na área `API`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06070. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06071. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06072. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06073. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06074. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06075. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06076. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06077. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06078. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06079. [REVISÃO_TOTAL] Na área `header`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06080. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06081. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06082. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06083. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06084. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06085. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06086. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06087. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06088. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06089. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06090. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06091. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06092. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06093. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06094. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06095. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06096. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de status e documentar achado no relatório de auditoria.
06097. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de status e documentar achado no relatório de auditoria.
06098. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de status e documentar achado no relatório de auditoria.
06099. [REVISÃO_TOTAL] Na área `API`, verificar consistência de status e documentar achado no relatório de auditoria.
06100. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de status e documentar achado no relatório de auditoria.
06101. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de status e documentar achado no relatório de auditoria.
06102. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de status e documentar achado no relatório de auditoria.
06103. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de status e documentar achado no relatório de auditoria.
06104. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de status e documentar achado no relatório de auditoria.
06105. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de status e documentar achado no relatório de auditoria.
06106. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de status e documentar achado no relatório de auditoria.
06107. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de status e documentar achado no relatório de auditoria.
06108. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de status e documentar achado no relatório de auditoria.
06109. [REVISÃO_TOTAL] Na área `header`, verificar consistência de status e documentar achado no relatório de auditoria.
06110. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de status e documentar achado no relatório de auditoria.
06111. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de status e documentar achado no relatório de auditoria.
06112. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de status e documentar achado no relatório de auditoria.
06113. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de status e documentar achado no relatório de auditoria.
06114. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de status e documentar achado no relatório de auditoria.
06115. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de status e documentar achado no relatório de auditoria.
06116. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de status e documentar achado no relatório de auditoria.
06117. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de status e documentar achado no relatório de auditoria.
06118. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de status e documentar achado no relatório de auditoria.
06119. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de status e documentar achado no relatório de auditoria.
06120. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de status e documentar achado no relatório de auditoria.
06121. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de status e documentar achado no relatório de auditoria.
06122. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de status e documentar achado no relatório de auditoria.
06123. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de status e documentar achado no relatório de auditoria.
06124. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de status e documentar achado no relatório de auditoria.
06125. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de status e documentar achado no relatório de auditoria.
06126. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
06127. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
06128. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de ids e documentar achado no relatório de auditoria.
06129. [REVISÃO_TOTAL] Na área `API`, verificar consistência de ids e documentar achado no relatório de auditoria.
06130. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de ids e documentar achado no relatório de auditoria.
06131. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de ids e documentar achado no relatório de auditoria.
06132. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de ids e documentar achado no relatório de auditoria.
06133. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de ids e documentar achado no relatório de auditoria.
06134. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de ids e documentar achado no relatório de auditoria.
06135. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de ids e documentar achado no relatório de auditoria.
06136. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de ids e documentar achado no relatório de auditoria.
06137. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de ids e documentar achado no relatório de auditoria.
06138. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de ids e documentar achado no relatório de auditoria.
06139. [REVISÃO_TOTAL] Na área `header`, verificar consistência de ids e documentar achado no relatório de auditoria.
06140. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de ids e documentar achado no relatório de auditoria.
06141. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de ids e documentar achado no relatório de auditoria.
06142. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de ids e documentar achado no relatório de auditoria.
06143. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de ids e documentar achado no relatório de auditoria.
06144. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de ids e documentar achado no relatório de auditoria.
06145. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de ids e documentar achado no relatório de auditoria.
06146. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de ids e documentar achado no relatório de auditoria.
06147. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de ids e documentar achado no relatório de auditoria.
06148. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de ids e documentar achado no relatório de auditoria.
06149. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de ids e documentar achado no relatório de auditoria.
06150. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de ids e documentar achado no relatório de auditoria.
06151. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de ids e documentar achado no relatório de auditoria.
06152. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de ids e documentar achado no relatório de auditoria.
06153. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de ids e documentar achado no relatório de auditoria.
06154. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de ids e documentar achado no relatório de auditoria.
06155. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de ids e documentar achado no relatório de auditoria.
06156. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
06157. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
06158. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de datas e documentar achado no relatório de auditoria.
06159. [REVISÃO_TOTAL] Na área `API`, verificar consistência de datas e documentar achado no relatório de auditoria.
06160. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de datas e documentar achado no relatório de auditoria.
06161. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de datas e documentar achado no relatório de auditoria.
06162. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de datas e documentar achado no relatório de auditoria.
06163. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de datas e documentar achado no relatório de auditoria.
06164. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de datas e documentar achado no relatório de auditoria.
06165. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de datas e documentar achado no relatório de auditoria.
06166. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de datas e documentar achado no relatório de auditoria.
06167. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de datas e documentar achado no relatório de auditoria.
06168. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de datas e documentar achado no relatório de auditoria.
06169. [REVISÃO_TOTAL] Na área `header`, verificar consistência de datas e documentar achado no relatório de auditoria.
06170. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de datas e documentar achado no relatório de auditoria.
06171. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de datas e documentar achado no relatório de auditoria.
06172. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de datas e documentar achado no relatório de auditoria.
06173. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de datas e documentar achado no relatório de auditoria.
06174. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de datas e documentar achado no relatório de auditoria.
06175. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de datas e documentar achado no relatório de auditoria.
06176. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de datas e documentar achado no relatório de auditoria.
06177. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de datas e documentar achado no relatório de auditoria.
06178. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de datas e documentar achado no relatório de auditoria.
06179. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de datas e documentar achado no relatório de auditoria.
06180. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de datas e documentar achado no relatório de auditoria.
06181. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de datas e documentar achado no relatório de auditoria.
06182. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de datas e documentar achado no relatório de auditoria.
06183. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de datas e documentar achado no relatório de auditoria.
06184. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de datas e documentar achado no relatório de auditoria.
06185. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de datas e documentar achado no relatório de auditoria.
06186. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06187. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06188. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06189. [REVISÃO_TOTAL] Na área `API`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06190. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06191. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06192. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06193. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06194. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06195. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06196. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06197. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06198. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06199. [REVISÃO_TOTAL] Na área `header`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06200. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06201. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06202. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06203. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06204. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06205. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06206. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06207. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06208. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06209. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06210. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06211. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06212. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06213. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06214. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06215. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06216. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06217. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06218. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06219. [REVISÃO_TOTAL] Na área `API`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06220. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06221. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06222. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06223. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06224. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06225. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06226. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06227. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06228. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06229. [REVISÃO_TOTAL] Na área `header`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06230. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06231. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06232. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06233. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06234. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06235. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06236. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06237. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06238. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06239. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06240. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06241. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06242. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06243. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06244. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06245. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06246. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência visual e documentar achado no relatório de auditoria.
06247. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência visual e documentar achado no relatório de auditoria.
06248. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência visual e documentar achado no relatório de auditoria.
06249. [REVISÃO_TOTAL] Na área `API`, verificar consistência visual e documentar achado no relatório de auditoria.
06250. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência visual e documentar achado no relatório de auditoria.
06251. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência visual e documentar achado no relatório de auditoria.
06252. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência visual e documentar achado no relatório de auditoria.
06253. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência visual e documentar achado no relatório de auditoria.
06254. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência visual e documentar achado no relatório de auditoria.
06255. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência visual e documentar achado no relatório de auditoria.
06256. [REVISÃO_TOTAL] Na área `logística`, verificar consistência visual e documentar achado no relatório de auditoria.
06257. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência visual e documentar achado no relatório de auditoria.
06258. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência visual e documentar achado no relatório de auditoria.
06259. [REVISÃO_TOTAL] Na área `header`, verificar consistência visual e documentar achado no relatório de auditoria.
06260. [REVISÃO_TOTAL] Na área `footer`, verificar consistência visual e documentar achado no relatório de auditoria.
06261. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência visual e documentar achado no relatório de auditoria.
06262. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência visual e documentar achado no relatório de auditoria.
06263. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência visual e documentar achado no relatório de auditoria.
06264. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência visual e documentar achado no relatório de auditoria.
06265. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência visual e documentar achado no relatório de auditoria.
06266. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência visual e documentar achado no relatório de auditoria.
06267. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência visual e documentar achado no relatório de auditoria.
06268. [REVISÃO_TOTAL] Na área `modais`, verificar consistência visual e documentar achado no relatório de auditoria.
06269. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência visual e documentar achado no relatório de auditoria.
06270. [REVISÃO_TOTAL] Na área `cards`, verificar consistência visual e documentar achado no relatório de auditoria.
06271. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência visual e documentar achado no relatório de auditoria.
06272. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência visual e documentar achado no relatório de auditoria.
06273. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência visual e documentar achado no relatório de auditoria.
06274. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência visual e documentar achado no relatório de auditoria.
06275. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência visual e documentar achado no relatório de auditoria.
06276. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
06277. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
06278. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de erros e documentar achado no relatório de auditoria.
06279. [REVISÃO_TOTAL] Na área `API`, verificar consistência de erros e documentar achado no relatório de auditoria.
06280. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de erros e documentar achado no relatório de auditoria.
06281. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de erros e documentar achado no relatório de auditoria.
06282. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de erros e documentar achado no relatório de auditoria.
06283. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de erros e documentar achado no relatório de auditoria.
06284. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de erros e documentar achado no relatório de auditoria.
06285. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de erros e documentar achado no relatório de auditoria.
06286. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de erros e documentar achado no relatório de auditoria.
06287. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de erros e documentar achado no relatório de auditoria.
06288. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de erros e documentar achado no relatório de auditoria.
06289. [REVISÃO_TOTAL] Na área `header`, verificar consistência de erros e documentar achado no relatório de auditoria.
06290. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de erros e documentar achado no relatório de auditoria.
06291. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de erros e documentar achado no relatório de auditoria.
06292. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de erros e documentar achado no relatório de auditoria.
06293. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de erros e documentar achado no relatório de auditoria.
06294. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de erros e documentar achado no relatório de auditoria.
06295. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de erros e documentar achado no relatório de auditoria.
06296. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de erros e documentar achado no relatório de auditoria.
06297. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de erros e documentar achado no relatório de auditoria.
06298. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de erros e documentar achado no relatório de auditoria.
06299. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de erros e documentar achado no relatório de auditoria.
06300. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de erros e documentar achado no relatório de auditoria.
06301. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de erros e documentar achado no relatório de auditoria.
06302. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de erros e documentar achado no relatório de auditoria.
06303. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de erros e documentar achado no relatório de auditoria.
06304. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de erros e documentar achado no relatório de auditoria.
06305. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de erros e documentar achado no relatório de auditoria.
06306. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
06307. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
06308. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário feliz e documentar achado no relatório de auditoria.
06309. [REVISÃO_TOTAL] Na área `API`, verificar cenário feliz e documentar achado no relatório de auditoria.
06310. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário feliz e documentar achado no relatório de auditoria.
06311. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário feliz e documentar achado no relatório de auditoria.
06312. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário feliz e documentar achado no relatório de auditoria.
06313. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário feliz e documentar achado no relatório de auditoria.
06314. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário feliz e documentar achado no relatório de auditoria.
06315. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário feliz e documentar achado no relatório de auditoria.
06316. [REVISÃO_TOTAL] Na área `logística`, verificar cenário feliz e documentar achado no relatório de auditoria.
06317. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário feliz e documentar achado no relatório de auditoria.
06318. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário feliz e documentar achado no relatório de auditoria.
06319. [REVISÃO_TOTAL] Na área `header`, verificar cenário feliz e documentar achado no relatório de auditoria.
06320. [REVISÃO_TOTAL] Na área `footer`, verificar cenário feliz e documentar achado no relatório de auditoria.
06321. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário feliz e documentar achado no relatório de auditoria.
06322. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário feliz e documentar achado no relatório de auditoria.
06323. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário feliz e documentar achado no relatório de auditoria.
06324. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário feliz e documentar achado no relatório de auditoria.
06325. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário feliz e documentar achado no relatório de auditoria.
06326. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário feliz e documentar achado no relatório de auditoria.
06327. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário feliz e documentar achado no relatório de auditoria.
06328. [REVISÃO_TOTAL] Na área `modais`, verificar cenário feliz e documentar achado no relatório de auditoria.
06329. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário feliz e documentar achado no relatório de auditoria.
06330. [REVISÃO_TOTAL] Na área `cards`, verificar cenário feliz e documentar achado no relatório de auditoria.
06331. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário feliz e documentar achado no relatório de auditoria.
06332. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário feliz e documentar achado no relatório de auditoria.
06333. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário feliz e documentar achado no relatório de auditoria.
06334. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário feliz e documentar achado no relatório de auditoria.
06335. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário feliz e documentar achado no relatório de auditoria.
06336. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
06337. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
06338. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário extremo e documentar achado no relatório de auditoria.
06339. [REVISÃO_TOTAL] Na área `API`, verificar cenário extremo e documentar achado no relatório de auditoria.
06340. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário extremo e documentar achado no relatório de auditoria.
06341. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário extremo e documentar achado no relatório de auditoria.
06342. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário extremo e documentar achado no relatório de auditoria.
06343. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário extremo e documentar achado no relatório de auditoria.
06344. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário extremo e documentar achado no relatório de auditoria.
06345. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário extremo e documentar achado no relatório de auditoria.
06346. [REVISÃO_TOTAL] Na área `logística`, verificar cenário extremo e documentar achado no relatório de auditoria.
06347. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário extremo e documentar achado no relatório de auditoria.
06348. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário extremo e documentar achado no relatório de auditoria.
06349. [REVISÃO_TOTAL] Na área `header`, verificar cenário extremo e documentar achado no relatório de auditoria.
06350. [REVISÃO_TOTAL] Na área `footer`, verificar cenário extremo e documentar achado no relatório de auditoria.
06351. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário extremo e documentar achado no relatório de auditoria.
06352. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário extremo e documentar achado no relatório de auditoria.
06353. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário extremo e documentar achado no relatório de auditoria.
06354. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário extremo e documentar achado no relatório de auditoria.
06355. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário extremo e documentar achado no relatório de auditoria.
06356. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário extremo e documentar achado no relatório de auditoria.
06357. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário extremo e documentar achado no relatório de auditoria.
06358. [REVISÃO_TOTAL] Na área `modais`, verificar cenário extremo e documentar achado no relatório de auditoria.
06359. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário extremo e documentar achado no relatório de auditoria.
06360. [REVISÃO_TOTAL] Na área `cards`, verificar cenário extremo e documentar achado no relatório de auditoria.
06361. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário extremo e documentar achado no relatório de auditoria.
06362. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário extremo e documentar achado no relatório de auditoria.
06363. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário extremo e documentar achado no relatório de auditoria.
06364. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário extremo e documentar achado no relatório de auditoria.
06365. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário extremo e documentar achado no relatório de auditoria.
06366. [REVISÃO_TOTAL] Na área `front-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06367. [REVISÃO_TOTAL] Na área `back-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06368. [REVISÃO_TOTAL] Na área `banco de dados`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06369. [REVISÃO_TOTAL] Na área `API`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06370. [REVISÃO_TOTAL] Na área `autenticação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06371. [REVISÃO_TOTAL] Na área `autorização`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06372. [REVISÃO_TOTAL] Na área `produtos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06373. [REVISÃO_TOTAL] Na área `pedidos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06374. [REVISÃO_TOTAL] Na área `encomendas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06375. [REVISÃO_TOTAL] Na área `orçamentos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06376. [REVISÃO_TOTAL] Na área `logística`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06377. [REVISÃO_TOTAL] Na área `suporte`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06378. [REVISÃO_TOTAL] Na área `notificações`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06379. [REVISÃO_TOTAL] Na área `header`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06380. [REVISÃO_TOTAL] Na área `footer`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06381. [REVISÃO_TOTAL] Na área `sidebar`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06382. [REVISÃO_TOTAL] Na área `dashboard`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06383. [REVISÃO_TOTAL] Na área `perfil`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06384. [REVISÃO_TOTAL] Na área `uploads`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06385. [REVISÃO_TOTAL] Na área `imagens`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06386. [REVISÃO_TOTAL] Na área `filtros`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06387. [REVISÃO_TOTAL] Na área `paginação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06388. [REVISÃO_TOTAL] Na área `modais`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06389. [REVISÃO_TOTAL] Na área `tabelas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06390. [REVISÃO_TOTAL] Na área `cards`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06391. [REVISÃO_TOTAL] Na área `responsividade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06392. [REVISÃO_TOTAL] Na área `acessibilidade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06393. [REVISÃO_TOTAL] Na área `segurança`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06394. [REVISÃO_TOTAL] Na área `tratamento de erro`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06395. [REVISÃO_TOTAL] Na área `mensagens de usuário`, registrar evidência encontrada e documentar achado no relatório de auditoria.
06396. [REVISÃO_TOTAL] Na área `front-end`, classificar severidade e documentar achado no relatório de auditoria.
06397. [REVISÃO_TOTAL] Na área `back-end`, classificar severidade e documentar achado no relatório de auditoria.
06398. [REVISÃO_TOTAL] Na área `banco de dados`, classificar severidade e documentar achado no relatório de auditoria.
06399. [REVISÃO_TOTAL] Na área `API`, classificar severidade e documentar achado no relatório de auditoria.
06400. [REVISÃO_TOTAL] Na área `autenticação`, classificar severidade e documentar achado no relatório de auditoria.
06401. [REVISÃO_TOTAL] Na área `autorização`, classificar severidade e documentar achado no relatório de auditoria.
06402. [REVISÃO_TOTAL] Na área `produtos`, classificar severidade e documentar achado no relatório de auditoria.
06403. [REVISÃO_TOTAL] Na área `pedidos`, classificar severidade e documentar achado no relatório de auditoria.
06404. [REVISÃO_TOTAL] Na área `encomendas`, classificar severidade e documentar achado no relatório de auditoria.
06405. [REVISÃO_TOTAL] Na área `orçamentos`, classificar severidade e documentar achado no relatório de auditoria.
06406. [REVISÃO_TOTAL] Na área `logística`, classificar severidade e documentar achado no relatório de auditoria.
06407. [REVISÃO_TOTAL] Na área `suporte`, classificar severidade e documentar achado no relatório de auditoria.
06408. [REVISÃO_TOTAL] Na área `notificações`, classificar severidade e documentar achado no relatório de auditoria.
06409. [REVISÃO_TOTAL] Na área `header`, classificar severidade e documentar achado no relatório de auditoria.
06410. [REVISÃO_TOTAL] Na área `footer`, classificar severidade e documentar achado no relatório de auditoria.
06411. [REVISÃO_TOTAL] Na área `sidebar`, classificar severidade e documentar achado no relatório de auditoria.
06412. [REVISÃO_TOTAL] Na área `dashboard`, classificar severidade e documentar achado no relatório de auditoria.
06413. [REVISÃO_TOTAL] Na área `perfil`, classificar severidade e documentar achado no relatório de auditoria.
06414. [REVISÃO_TOTAL] Na área `uploads`, classificar severidade e documentar achado no relatório de auditoria.
06415. [REVISÃO_TOTAL] Na área `imagens`, classificar severidade e documentar achado no relatório de auditoria.
06416. [REVISÃO_TOTAL] Na área `filtros`, classificar severidade e documentar achado no relatório de auditoria.
06417. [REVISÃO_TOTAL] Na área `paginação`, classificar severidade e documentar achado no relatório de auditoria.
06418. [REVISÃO_TOTAL] Na área `modais`, classificar severidade e documentar achado no relatório de auditoria.
06419. [REVISÃO_TOTAL] Na área `tabelas`, classificar severidade e documentar achado no relatório de auditoria.
06420. [REVISÃO_TOTAL] Na área `cards`, classificar severidade e documentar achado no relatório de auditoria.
06421. [REVISÃO_TOTAL] Na área `responsividade`, classificar severidade e documentar achado no relatório de auditoria.
06422. [REVISÃO_TOTAL] Na área `acessibilidade`, classificar severidade e documentar achado no relatório de auditoria.
06423. [REVISÃO_TOTAL] Na área `segurança`, classificar severidade e documentar achado no relatório de auditoria.
06424. [REVISÃO_TOTAL] Na área `tratamento de erro`, classificar severidade e documentar achado no relatório de auditoria.
06425. [REVISÃO_TOTAL] Na área `mensagens de usuário`, classificar severidade e documentar achado no relatório de auditoria.
06426. [REVISÃO_TOTAL] Na área `front-end`, propor correção futura e documentar achado no relatório de auditoria.
06427. [REVISÃO_TOTAL] Na área `back-end`, propor correção futura e documentar achado no relatório de auditoria.
06428. [REVISÃO_TOTAL] Na área `banco de dados`, propor correção futura e documentar achado no relatório de auditoria.
06429. [REVISÃO_TOTAL] Na área `API`, propor correção futura e documentar achado no relatório de auditoria.
06430. [REVISÃO_TOTAL] Na área `autenticação`, propor correção futura e documentar achado no relatório de auditoria.
06431. [REVISÃO_TOTAL] Na área `autorização`, propor correção futura e documentar achado no relatório de auditoria.
06432. [REVISÃO_TOTAL] Na área `produtos`, propor correção futura e documentar achado no relatório de auditoria.
06433. [REVISÃO_TOTAL] Na área `pedidos`, propor correção futura e documentar achado no relatório de auditoria.
06434. [REVISÃO_TOTAL] Na área `encomendas`, propor correção futura e documentar achado no relatório de auditoria.
06435. [REVISÃO_TOTAL] Na área `orçamentos`, propor correção futura e documentar achado no relatório de auditoria.
06436. [REVISÃO_TOTAL] Na área `logística`, propor correção futura e documentar achado no relatório de auditoria.
06437. [REVISÃO_TOTAL] Na área `suporte`, propor correção futura e documentar achado no relatório de auditoria.
06438. [REVISÃO_TOTAL] Na área `notificações`, propor correção futura e documentar achado no relatório de auditoria.
06439. [REVISÃO_TOTAL] Na área `header`, propor correção futura e documentar achado no relatório de auditoria.
06440. [REVISÃO_TOTAL] Na área `footer`, propor correção futura e documentar achado no relatório de auditoria.
06441. [REVISÃO_TOTAL] Na área `sidebar`, propor correção futura e documentar achado no relatório de auditoria.
06442. [REVISÃO_TOTAL] Na área `dashboard`, propor correção futura e documentar achado no relatório de auditoria.
06443. [REVISÃO_TOTAL] Na área `perfil`, propor correção futura e documentar achado no relatório de auditoria.
06444. [REVISÃO_TOTAL] Na área `uploads`, propor correção futura e documentar achado no relatório de auditoria.
06445. [REVISÃO_TOTAL] Na área `imagens`, propor correção futura e documentar achado no relatório de auditoria.
06446. [REVISÃO_TOTAL] Na área `filtros`, propor correção futura e documentar achado no relatório de auditoria.
06447. [REVISÃO_TOTAL] Na área `paginação`, propor correção futura e documentar achado no relatório de auditoria.
06448. [REVISÃO_TOTAL] Na área `modais`, propor correção futura e documentar achado no relatório de auditoria.
06449. [REVISÃO_TOTAL] Na área `tabelas`, propor correção futura e documentar achado no relatório de auditoria.
06450. [REVISÃO_TOTAL] Na área `cards`, propor correção futura e documentar achado no relatório de auditoria.
06451. [REVISÃO_TOTAL] Na área `responsividade`, propor correção futura e documentar achado no relatório de auditoria.
06452. [REVISÃO_TOTAL] Na área `acessibilidade`, propor correção futura e documentar achado no relatório de auditoria.
06453. [REVISÃO_TOTAL] Na área `segurança`, propor correção futura e documentar achado no relatório de auditoria.
06454. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor correção futura e documentar achado no relatório de auditoria.
06455. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor correção futura e documentar achado no relatório de auditoria.
06456. [REVISÃO_TOTAL] Na área `front-end`, propor teste manual e documentar achado no relatório de auditoria.
06457. [REVISÃO_TOTAL] Na área `back-end`, propor teste manual e documentar achado no relatório de auditoria.
06458. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste manual e documentar achado no relatório de auditoria.
06459. [REVISÃO_TOTAL] Na área `API`, propor teste manual e documentar achado no relatório de auditoria.
06460. [REVISÃO_TOTAL] Na área `autenticação`, propor teste manual e documentar achado no relatório de auditoria.
06461. [REVISÃO_TOTAL] Na área `autorização`, propor teste manual e documentar achado no relatório de auditoria.
06462. [REVISÃO_TOTAL] Na área `produtos`, propor teste manual e documentar achado no relatório de auditoria.
06463. [REVISÃO_TOTAL] Na área `pedidos`, propor teste manual e documentar achado no relatório de auditoria.
06464. [REVISÃO_TOTAL] Na área `encomendas`, propor teste manual e documentar achado no relatório de auditoria.
06465. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste manual e documentar achado no relatório de auditoria.
06466. [REVISÃO_TOTAL] Na área `logística`, propor teste manual e documentar achado no relatório de auditoria.
06467. [REVISÃO_TOTAL] Na área `suporte`, propor teste manual e documentar achado no relatório de auditoria.
06468. [REVISÃO_TOTAL] Na área `notificações`, propor teste manual e documentar achado no relatório de auditoria.
06469. [REVISÃO_TOTAL] Na área `header`, propor teste manual e documentar achado no relatório de auditoria.
06470. [REVISÃO_TOTAL] Na área `footer`, propor teste manual e documentar achado no relatório de auditoria.
06471. [REVISÃO_TOTAL] Na área `sidebar`, propor teste manual e documentar achado no relatório de auditoria.
06472. [REVISÃO_TOTAL] Na área `dashboard`, propor teste manual e documentar achado no relatório de auditoria.
06473. [REVISÃO_TOTAL] Na área `perfil`, propor teste manual e documentar achado no relatório de auditoria.
06474. [REVISÃO_TOTAL] Na área `uploads`, propor teste manual e documentar achado no relatório de auditoria.
06475. [REVISÃO_TOTAL] Na área `imagens`, propor teste manual e documentar achado no relatório de auditoria.
06476. [REVISÃO_TOTAL] Na área `filtros`, propor teste manual e documentar achado no relatório de auditoria.
06477. [REVISÃO_TOTAL] Na área `paginação`, propor teste manual e documentar achado no relatório de auditoria.
06478. [REVISÃO_TOTAL] Na área `modais`, propor teste manual e documentar achado no relatório de auditoria.
06479. [REVISÃO_TOTAL] Na área `tabelas`, propor teste manual e documentar achado no relatório de auditoria.
06480. [REVISÃO_TOTAL] Na área `cards`, propor teste manual e documentar achado no relatório de auditoria.
06481. [REVISÃO_TOTAL] Na área `responsividade`, propor teste manual e documentar achado no relatório de auditoria.
06482. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste manual e documentar achado no relatório de auditoria.
06483. [REVISÃO_TOTAL] Na área `segurança`, propor teste manual e documentar achado no relatório de auditoria.
06484. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste manual e documentar achado no relatório de auditoria.
06485. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste manual e documentar achado no relatório de auditoria.
06486. [REVISÃO_TOTAL] Na área `front-end`, propor teste automatizado e documentar achado no relatório de auditoria.
06487. [REVISÃO_TOTAL] Na área `back-end`, propor teste automatizado e documentar achado no relatório de auditoria.
06488. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste automatizado e documentar achado no relatório de auditoria.
06489. [REVISÃO_TOTAL] Na área `API`, propor teste automatizado e documentar achado no relatório de auditoria.
06490. [REVISÃO_TOTAL] Na área `autenticação`, propor teste automatizado e documentar achado no relatório de auditoria.
06491. [REVISÃO_TOTAL] Na área `autorização`, propor teste automatizado e documentar achado no relatório de auditoria.
06492. [REVISÃO_TOTAL] Na área `produtos`, propor teste automatizado e documentar achado no relatório de auditoria.
06493. [REVISÃO_TOTAL] Na área `pedidos`, propor teste automatizado e documentar achado no relatório de auditoria.
06494. [REVISÃO_TOTAL] Na área `encomendas`, propor teste automatizado e documentar achado no relatório de auditoria.
06495. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste automatizado e documentar achado no relatório de auditoria.
06496. [REVISÃO_TOTAL] Na área `logística`, propor teste automatizado e documentar achado no relatório de auditoria.
06497. [REVISÃO_TOTAL] Na área `suporte`, propor teste automatizado e documentar achado no relatório de auditoria.
06498. [REVISÃO_TOTAL] Na área `notificações`, propor teste automatizado e documentar achado no relatório de auditoria.
06499. [REVISÃO_TOTAL] Na área `header`, propor teste automatizado e documentar achado no relatório de auditoria.
06500. [REVISÃO_TOTAL] Na área `footer`, propor teste automatizado e documentar achado no relatório de auditoria.
06501. [REVISÃO_TOTAL] Na área `sidebar`, propor teste automatizado e documentar achado no relatório de auditoria.
06502. [REVISÃO_TOTAL] Na área `dashboard`, propor teste automatizado e documentar achado no relatório de auditoria.
06503. [REVISÃO_TOTAL] Na área `perfil`, propor teste automatizado e documentar achado no relatório de auditoria.
06504. [REVISÃO_TOTAL] Na área `uploads`, propor teste automatizado e documentar achado no relatório de auditoria.
06505. [REVISÃO_TOTAL] Na área `imagens`, propor teste automatizado e documentar achado no relatório de auditoria.
06506. [REVISÃO_TOTAL] Na área `filtros`, propor teste automatizado e documentar achado no relatório de auditoria.
06507. [REVISÃO_TOTAL] Na área `paginação`, propor teste automatizado e documentar achado no relatório de auditoria.
06508. [REVISÃO_TOTAL] Na área `modais`, propor teste automatizado e documentar achado no relatório de auditoria.
06509. [REVISÃO_TOTAL] Na área `tabelas`, propor teste automatizado e documentar achado no relatório de auditoria.
06510. [REVISÃO_TOTAL] Na área `cards`, propor teste automatizado e documentar achado no relatório de auditoria.
06511. [REVISÃO_TOTAL] Na área `responsividade`, propor teste automatizado e documentar achado no relatório de auditoria.
06512. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste automatizado e documentar achado no relatório de auditoria.
06513. [REVISÃO_TOTAL] Na área `segurança`, propor teste automatizado e documentar achado no relatório de auditoria.
06514. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste automatizado e documentar achado no relatório de auditoria.
06515. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste automatizado e documentar achado no relatório de auditoria.
06516. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06517. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06518. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06519. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06520. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06521. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06522. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06523. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06524. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06525. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06526. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06527. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06528. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06529. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06530. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06531. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06532. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06533. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06534. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06535. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06536. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06537. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06538. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06539. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06540. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06541. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06542. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06543. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06544. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06545. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
06546. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06547. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06548. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06549. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06550. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06551. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06552. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06553. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06554. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06555. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06556. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06557. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06558. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06559. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06560. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06561. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06562. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06563. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06564. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06565. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06566. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06567. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06568. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06569. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06570. [REVISÃO_TOTAL] Na área `cards`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06571. [REVISÃO_TOTAL] Na área `responsividade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06572. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06573. [REVISÃO_TOTAL] Na área `segurança`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06574. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06575. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear fluxo de dados e documentar achado no relatório de auditoria.
06576. [REVISÃO_TOTAL] Na área `front-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06577. [REVISÃO_TOTAL] Na área `back-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06578. [REVISÃO_TOTAL] Na área `banco de dados`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06579. [REVISÃO_TOTAL] Na área `API`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06580. [REVISÃO_TOTAL] Na área `autenticação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06581. [REVISÃO_TOTAL] Na área `autorização`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06582. [REVISÃO_TOTAL] Na área `produtos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06583. [REVISÃO_TOTAL] Na área `pedidos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06584. [REVISÃO_TOTAL] Na área `encomendas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06585. [REVISÃO_TOTAL] Na área `orçamentos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06586. [REVISÃO_TOTAL] Na área `logística`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06587. [REVISÃO_TOTAL] Na área `suporte`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06588. [REVISÃO_TOTAL] Na área `notificações`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06589. [REVISÃO_TOTAL] Na área `header`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06590. [REVISÃO_TOTAL] Na área `footer`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06591. [REVISÃO_TOTAL] Na área `sidebar`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06592. [REVISÃO_TOTAL] Na área `dashboard`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06593. [REVISÃO_TOTAL] Na área `perfil`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06594. [REVISÃO_TOTAL] Na área `uploads`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06595. [REVISÃO_TOTAL] Na área `imagens`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06596. [REVISÃO_TOTAL] Na área `filtros`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06597. [REVISÃO_TOTAL] Na área `paginação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06598. [REVISÃO_TOTAL] Na área `modais`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06599. [REVISÃO_TOTAL] Na área `tabelas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06600. [REVISÃO_TOTAL] Na área `cards`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06601. [REVISÃO_TOTAL] Na área `responsividade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06602. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06603. [REVISÃO_TOTAL] Na área `segurança`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06604. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06605. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
06606. [REVISÃO_TOTAL] Na área `front-end`, mapear validações existentes e documentar achado no relatório de auditoria.
06607. [REVISÃO_TOTAL] Na área `back-end`, mapear validações existentes e documentar achado no relatório de auditoria.
06608. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações existentes e documentar achado no relatório de auditoria.
06609. [REVISÃO_TOTAL] Na área `API`, mapear validações existentes e documentar achado no relatório de auditoria.
06610. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações existentes e documentar achado no relatório de auditoria.
06611. [REVISÃO_TOTAL] Na área `autorização`, mapear validações existentes e documentar achado no relatório de auditoria.
06612. [REVISÃO_TOTAL] Na área `produtos`, mapear validações existentes e documentar achado no relatório de auditoria.
06613. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações existentes e documentar achado no relatório de auditoria.
06614. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações existentes e documentar achado no relatório de auditoria.
06615. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações existentes e documentar achado no relatório de auditoria.
06616. [REVISÃO_TOTAL] Na área `logística`, mapear validações existentes e documentar achado no relatório de auditoria.
06617. [REVISÃO_TOTAL] Na área `suporte`, mapear validações existentes e documentar achado no relatório de auditoria.
06618. [REVISÃO_TOTAL] Na área `notificações`, mapear validações existentes e documentar achado no relatório de auditoria.
06619. [REVISÃO_TOTAL] Na área `header`, mapear validações existentes e documentar achado no relatório de auditoria.
06620. [REVISÃO_TOTAL] Na área `footer`, mapear validações existentes e documentar achado no relatório de auditoria.
06621. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações existentes e documentar achado no relatório de auditoria.
06622. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações existentes e documentar achado no relatório de auditoria.
06623. [REVISÃO_TOTAL] Na área `perfil`, mapear validações existentes e documentar achado no relatório de auditoria.
06624. [REVISÃO_TOTAL] Na área `uploads`, mapear validações existentes e documentar achado no relatório de auditoria.
06625. [REVISÃO_TOTAL] Na área `imagens`, mapear validações existentes e documentar achado no relatório de auditoria.
06626. [REVISÃO_TOTAL] Na área `filtros`, mapear validações existentes e documentar achado no relatório de auditoria.
06627. [REVISÃO_TOTAL] Na área `paginação`, mapear validações existentes e documentar achado no relatório de auditoria.
06628. [REVISÃO_TOTAL] Na área `modais`, mapear validações existentes e documentar achado no relatório de auditoria.
06629. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações existentes e documentar achado no relatório de auditoria.
06630. [REVISÃO_TOTAL] Na área `cards`, mapear validações existentes e documentar achado no relatório de auditoria.
06631. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações existentes e documentar achado no relatório de auditoria.
06632. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações existentes e documentar achado no relatório de auditoria.
06633. [REVISÃO_TOTAL] Na área `segurança`, mapear validações existentes e documentar achado no relatório de auditoria.
06634. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações existentes e documentar achado no relatório de auditoria.
06635. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações existentes e documentar achado no relatório de auditoria.
06636. [REVISÃO_TOTAL] Na área `front-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
06637. [REVISÃO_TOTAL] Na área `back-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
06638. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações ausentes e documentar achado no relatório de auditoria.
06639. [REVISÃO_TOTAL] Na área `API`, mapear validações ausentes e documentar achado no relatório de auditoria.
06640. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações ausentes e documentar achado no relatório de auditoria.
06641. [REVISÃO_TOTAL] Na área `autorização`, mapear validações ausentes e documentar achado no relatório de auditoria.
06642. [REVISÃO_TOTAL] Na área `produtos`, mapear validações ausentes e documentar achado no relatório de auditoria.
06643. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações ausentes e documentar achado no relatório de auditoria.
06644. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações ausentes e documentar achado no relatório de auditoria.
06645. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações ausentes e documentar achado no relatório de auditoria.
06646. [REVISÃO_TOTAL] Na área `logística`, mapear validações ausentes e documentar achado no relatório de auditoria.
06647. [REVISÃO_TOTAL] Na área `suporte`, mapear validações ausentes e documentar achado no relatório de auditoria.
06648. [REVISÃO_TOTAL] Na área `notificações`, mapear validações ausentes e documentar achado no relatório de auditoria.
06649. [REVISÃO_TOTAL] Na área `header`, mapear validações ausentes e documentar achado no relatório de auditoria.
06650. [REVISÃO_TOTAL] Na área `footer`, mapear validações ausentes e documentar achado no relatório de auditoria.
06651. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações ausentes e documentar achado no relatório de auditoria.
06652. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações ausentes e documentar achado no relatório de auditoria.
06653. [REVISÃO_TOTAL] Na área `perfil`, mapear validações ausentes e documentar achado no relatório de auditoria.
06654. [REVISÃO_TOTAL] Na área `uploads`, mapear validações ausentes e documentar achado no relatório de auditoria.
06655. [REVISÃO_TOTAL] Na área `imagens`, mapear validações ausentes e documentar achado no relatório de auditoria.
06656. [REVISÃO_TOTAL] Na área `filtros`, mapear validações ausentes e documentar achado no relatório de auditoria.
06657. [REVISÃO_TOTAL] Na área `paginação`, mapear validações ausentes e documentar achado no relatório de auditoria.
06658. [REVISÃO_TOTAL] Na área `modais`, mapear validações ausentes e documentar achado no relatório de auditoria.
06659. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações ausentes e documentar achado no relatório de auditoria.
06660. [REVISÃO_TOTAL] Na área `cards`, mapear validações ausentes e documentar achado no relatório de auditoria.
06661. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações ausentes e documentar achado no relatório de auditoria.
06662. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações ausentes e documentar achado no relatório de auditoria.
06663. [REVISÃO_TOTAL] Na área `segurança`, mapear validações ausentes e documentar achado no relatório de auditoria.
06664. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações ausentes e documentar achado no relatório de auditoria.
06665. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações ausentes e documentar achado no relatório de auditoria.
06666. [REVISÃO_TOTAL] Na área `front-end`, mapear dependências e documentar achado no relatório de auditoria.
06667. [REVISÃO_TOTAL] Na área `back-end`, mapear dependências e documentar achado no relatório de auditoria.
06668. [REVISÃO_TOTAL] Na área `banco de dados`, mapear dependências e documentar achado no relatório de auditoria.
06669. [REVISÃO_TOTAL] Na área `API`, mapear dependências e documentar achado no relatório de auditoria.
06670. [REVISÃO_TOTAL] Na área `autenticação`, mapear dependências e documentar achado no relatório de auditoria.
06671. [REVISÃO_TOTAL] Na área `autorização`, mapear dependências e documentar achado no relatório de auditoria.
06672. [REVISÃO_TOTAL] Na área `produtos`, mapear dependências e documentar achado no relatório de auditoria.
06673. [REVISÃO_TOTAL] Na área `pedidos`, mapear dependências e documentar achado no relatório de auditoria.
06674. [REVISÃO_TOTAL] Na área `encomendas`, mapear dependências e documentar achado no relatório de auditoria.
06675. [REVISÃO_TOTAL] Na área `orçamentos`, mapear dependências e documentar achado no relatório de auditoria.
06676. [REVISÃO_TOTAL] Na área `logística`, mapear dependências e documentar achado no relatório de auditoria.
06677. [REVISÃO_TOTAL] Na área `suporte`, mapear dependências e documentar achado no relatório de auditoria.
06678. [REVISÃO_TOTAL] Na área `notificações`, mapear dependências e documentar achado no relatório de auditoria.
06679. [REVISÃO_TOTAL] Na área `header`, mapear dependências e documentar achado no relatório de auditoria.
06680. [REVISÃO_TOTAL] Na área `footer`, mapear dependências e documentar achado no relatório de auditoria.
06681. [REVISÃO_TOTAL] Na área `sidebar`, mapear dependências e documentar achado no relatório de auditoria.
06682. [REVISÃO_TOTAL] Na área `dashboard`, mapear dependências e documentar achado no relatório de auditoria.
06683. [REVISÃO_TOTAL] Na área `perfil`, mapear dependências e documentar achado no relatório de auditoria.
06684. [REVISÃO_TOTAL] Na área `uploads`, mapear dependências e documentar achado no relatório de auditoria.
06685. [REVISÃO_TOTAL] Na área `imagens`, mapear dependências e documentar achado no relatório de auditoria.
06686. [REVISÃO_TOTAL] Na área `filtros`, mapear dependências e documentar achado no relatório de auditoria.
06687. [REVISÃO_TOTAL] Na área `paginação`, mapear dependências e documentar achado no relatório de auditoria.
06688. [REVISÃO_TOTAL] Na área `modais`, mapear dependências e documentar achado no relatório de auditoria.
06689. [REVISÃO_TOTAL] Na área `tabelas`, mapear dependências e documentar achado no relatório de auditoria.
06690. [REVISÃO_TOTAL] Na área `cards`, mapear dependências e documentar achado no relatório de auditoria.
06691. [REVISÃO_TOTAL] Na área `responsividade`, mapear dependências e documentar achado no relatório de auditoria.
06692. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear dependências e documentar achado no relatório de auditoria.
06693. [REVISÃO_TOTAL] Na área `segurança`, mapear dependências e documentar achado no relatório de auditoria.
06694. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear dependências e documentar achado no relatório de auditoria.
06695. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear dependências e documentar achado no relatório de auditoria.
06696. [REVISÃO_TOTAL] Na área `front-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
06697. [REVISÃO_TOTAL] Na área `back-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
06698. [REVISÃO_TOTAL] Na área `banco de dados`, mapear risco de regressão e documentar achado no relatório de auditoria.
06699. [REVISÃO_TOTAL] Na área `API`, mapear risco de regressão e documentar achado no relatório de auditoria.
06700. [REVISÃO_TOTAL] Na área `autenticação`, mapear risco de regressão e documentar achado no relatório de auditoria.
06701. [REVISÃO_TOTAL] Na área `autorização`, mapear risco de regressão e documentar achado no relatório de auditoria.
06702. [REVISÃO_TOTAL] Na área `produtos`, mapear risco de regressão e documentar achado no relatório de auditoria.
06703. [REVISÃO_TOTAL] Na área `pedidos`, mapear risco de regressão e documentar achado no relatório de auditoria.
06704. [REVISÃO_TOTAL] Na área `encomendas`, mapear risco de regressão e documentar achado no relatório de auditoria.
06705. [REVISÃO_TOTAL] Na área `orçamentos`, mapear risco de regressão e documentar achado no relatório de auditoria.
06706. [REVISÃO_TOTAL] Na área `logística`, mapear risco de regressão e documentar achado no relatório de auditoria.
06707. [REVISÃO_TOTAL] Na área `suporte`, mapear risco de regressão e documentar achado no relatório de auditoria.
06708. [REVISÃO_TOTAL] Na área `notificações`, mapear risco de regressão e documentar achado no relatório de auditoria.
06709. [REVISÃO_TOTAL] Na área `header`, mapear risco de regressão e documentar achado no relatório de auditoria.
06710. [REVISÃO_TOTAL] Na área `footer`, mapear risco de regressão e documentar achado no relatório de auditoria.
06711. [REVISÃO_TOTAL] Na área `sidebar`, mapear risco de regressão e documentar achado no relatório de auditoria.
06712. [REVISÃO_TOTAL] Na área `dashboard`, mapear risco de regressão e documentar achado no relatório de auditoria.
06713. [REVISÃO_TOTAL] Na área `perfil`, mapear risco de regressão e documentar achado no relatório de auditoria.
06714. [REVISÃO_TOTAL] Na área `uploads`, mapear risco de regressão e documentar achado no relatório de auditoria.
06715. [REVISÃO_TOTAL] Na área `imagens`, mapear risco de regressão e documentar achado no relatório de auditoria.
06716. [REVISÃO_TOTAL] Na área `filtros`, mapear risco de regressão e documentar achado no relatório de auditoria.
06717. [REVISÃO_TOTAL] Na área `paginação`, mapear risco de regressão e documentar achado no relatório de auditoria.
06718. [REVISÃO_TOTAL] Na área `modais`, mapear risco de regressão e documentar achado no relatório de auditoria.
06719. [REVISÃO_TOTAL] Na área `tabelas`, mapear risco de regressão e documentar achado no relatório de auditoria.
06720. [REVISÃO_TOTAL] Na área `cards`, mapear risco de regressão e documentar achado no relatório de auditoria.
06721. [REVISÃO_TOTAL] Na área `responsividade`, mapear risco de regressão e documentar achado no relatório de auditoria.
06722. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear risco de regressão e documentar achado no relatório de auditoria.
06723. [REVISÃO_TOTAL] Na área `segurança`, mapear risco de regressão e documentar achado no relatório de auditoria.
06724. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear risco de regressão e documentar achado no relatório de auditoria.
06725. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear risco de regressão e documentar achado no relatório de auditoria.
06726. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06727. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06728. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06729. [REVISÃO_TOTAL] Na área `API`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06730. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06731. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06732. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06733. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06734. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06735. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06736. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06737. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06738. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06739. [REVISÃO_TOTAL] Na área `header`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06740. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06741. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06742. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06743. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06744. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06745. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06746. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06747. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06748. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06749. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06750. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06751. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06752. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06753. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06754. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06755. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
06756. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06757. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06758. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06759. [REVISÃO_TOTAL] Na área `API`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06760. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06761. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06762. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06763. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06764. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06765. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06766. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06767. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06768. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06769. [REVISÃO_TOTAL] Na área `header`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06770. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06771. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06772. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06773. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06774. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06775. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06776. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06777. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06778. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06779. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06780. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06781. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06782. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06783. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06784. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06785. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
06786. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
06787. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
06788. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em admin e documentar achado no relatório de auditoria.
06789. [REVISÃO_TOTAL] Na área `API`, mapear impacto em admin e documentar achado no relatório de auditoria.
06790. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em admin e documentar achado no relatório de auditoria.
06791. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em admin e documentar achado no relatório de auditoria.
06792. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em admin e documentar achado no relatório de auditoria.
06793. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em admin e documentar achado no relatório de auditoria.
06794. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em admin e documentar achado no relatório de auditoria.
06795. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em admin e documentar achado no relatório de auditoria.
06796. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em admin e documentar achado no relatório de auditoria.
06797. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em admin e documentar achado no relatório de auditoria.
06798. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em admin e documentar achado no relatório de auditoria.
06799. [REVISÃO_TOTAL] Na área `header`, mapear impacto em admin e documentar achado no relatório de auditoria.
06800. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em admin e documentar achado no relatório de auditoria.
06801. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em admin e documentar achado no relatório de auditoria.
06802. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em admin e documentar achado no relatório de auditoria.
06803. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em admin e documentar achado no relatório de auditoria.
06804. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em admin e documentar achado no relatório de auditoria.
06805. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em admin e documentar achado no relatório de auditoria.
06806. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em admin e documentar achado no relatório de auditoria.
06807. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em admin e documentar achado no relatório de auditoria.
06808. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em admin e documentar achado no relatório de auditoria.
06809. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em admin e documentar achado no relatório de auditoria.
06810. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em admin e documentar achado no relatório de auditoria.
06811. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em admin e documentar achado no relatório de auditoria.
06812. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em admin e documentar achado no relatório de auditoria.
06813. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em admin e documentar achado no relatório de auditoria.
06814. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em admin e documentar achado no relatório de auditoria.
06815. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em admin e documentar achado no relatório de auditoria.
06816. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06817. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06818. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06819. [REVISÃO_TOTAL] Na área `API`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06820. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06821. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06822. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06823. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06824. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06825. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06826. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06827. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06828. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06829. [REVISÃO_TOTAL] Na área `header`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06830. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06831. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06832. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06833. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06834. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06835. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06836. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06837. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06838. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06839. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06840. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06841. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06842. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06843. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06844. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06845. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de nomes e documentar achado no relatório de auditoria.
06846. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de status e documentar achado no relatório de auditoria.
06847. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de status e documentar achado no relatório de auditoria.
06848. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de status e documentar achado no relatório de auditoria.
06849. [REVISÃO_TOTAL] Na área `API`, verificar consistência de status e documentar achado no relatório de auditoria.
06850. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de status e documentar achado no relatório de auditoria.
06851. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de status e documentar achado no relatório de auditoria.
06852. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de status e documentar achado no relatório de auditoria.
06853. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de status e documentar achado no relatório de auditoria.
06854. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de status e documentar achado no relatório de auditoria.
06855. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de status e documentar achado no relatório de auditoria.
06856. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de status e documentar achado no relatório de auditoria.
06857. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de status e documentar achado no relatório de auditoria.
06858. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de status e documentar achado no relatório de auditoria.
06859. [REVISÃO_TOTAL] Na área `header`, verificar consistência de status e documentar achado no relatório de auditoria.
06860. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de status e documentar achado no relatório de auditoria.
06861. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de status e documentar achado no relatório de auditoria.
06862. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de status e documentar achado no relatório de auditoria.
06863. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de status e documentar achado no relatório de auditoria.
06864. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de status e documentar achado no relatório de auditoria.
06865. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de status e documentar achado no relatório de auditoria.
06866. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de status e documentar achado no relatório de auditoria.
06867. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de status e documentar achado no relatório de auditoria.
06868. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de status e documentar achado no relatório de auditoria.
06869. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de status e documentar achado no relatório de auditoria.
06870. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de status e documentar achado no relatório de auditoria.
06871. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de status e documentar achado no relatório de auditoria.
06872. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de status e documentar achado no relatório de auditoria.
06873. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de status e documentar achado no relatório de auditoria.
06874. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de status e documentar achado no relatório de auditoria.
06875. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de status e documentar achado no relatório de auditoria.
06876. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
06877. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
06878. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de ids e documentar achado no relatório de auditoria.
06879. [REVISÃO_TOTAL] Na área `API`, verificar consistência de ids e documentar achado no relatório de auditoria.
06880. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de ids e documentar achado no relatório de auditoria.
06881. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de ids e documentar achado no relatório de auditoria.
06882. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de ids e documentar achado no relatório de auditoria.
06883. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de ids e documentar achado no relatório de auditoria.
06884. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de ids e documentar achado no relatório de auditoria.
06885. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de ids e documentar achado no relatório de auditoria.
06886. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de ids e documentar achado no relatório de auditoria.
06887. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de ids e documentar achado no relatório de auditoria.
06888. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de ids e documentar achado no relatório de auditoria.
06889. [REVISÃO_TOTAL] Na área `header`, verificar consistência de ids e documentar achado no relatório de auditoria.
06890. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de ids e documentar achado no relatório de auditoria.
06891. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de ids e documentar achado no relatório de auditoria.
06892. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de ids e documentar achado no relatório de auditoria.
06893. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de ids e documentar achado no relatório de auditoria.
06894. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de ids e documentar achado no relatório de auditoria.
06895. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de ids e documentar achado no relatório de auditoria.
06896. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de ids e documentar achado no relatório de auditoria.
06897. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de ids e documentar achado no relatório de auditoria.
06898. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de ids e documentar achado no relatório de auditoria.
06899. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de ids e documentar achado no relatório de auditoria.
06900. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de ids e documentar achado no relatório de auditoria.
06901. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de ids e documentar achado no relatório de auditoria.
06902. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de ids e documentar achado no relatório de auditoria.
06903. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de ids e documentar achado no relatório de auditoria.
06904. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de ids e documentar achado no relatório de auditoria.
06905. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de ids e documentar achado no relatório de auditoria.
06906. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
06907. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
06908. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de datas e documentar achado no relatório de auditoria.
06909. [REVISÃO_TOTAL] Na área `API`, verificar consistência de datas e documentar achado no relatório de auditoria.
06910. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de datas e documentar achado no relatório de auditoria.
06911. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de datas e documentar achado no relatório de auditoria.
06912. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de datas e documentar achado no relatório de auditoria.
06913. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de datas e documentar achado no relatório de auditoria.
06914. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de datas e documentar achado no relatório de auditoria.
06915. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de datas e documentar achado no relatório de auditoria.
06916. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de datas e documentar achado no relatório de auditoria.
06917. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de datas e documentar achado no relatório de auditoria.
06918. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de datas e documentar achado no relatório de auditoria.
06919. [REVISÃO_TOTAL] Na área `header`, verificar consistência de datas e documentar achado no relatório de auditoria.
06920. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de datas e documentar achado no relatório de auditoria.
06921. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de datas e documentar achado no relatório de auditoria.
06922. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de datas e documentar achado no relatório de auditoria.
06923. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de datas e documentar achado no relatório de auditoria.
06924. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de datas e documentar achado no relatório de auditoria.
06925. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de datas e documentar achado no relatório de auditoria.
06926. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de datas e documentar achado no relatório de auditoria.
06927. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de datas e documentar achado no relatório de auditoria.
06928. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de datas e documentar achado no relatório de auditoria.
06929. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de datas e documentar achado no relatório de auditoria.
06930. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de datas e documentar achado no relatório de auditoria.
06931. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de datas e documentar achado no relatório de auditoria.
06932. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de datas e documentar achado no relatório de auditoria.
06933. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de datas e documentar achado no relatório de auditoria.
06934. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de datas e documentar achado no relatório de auditoria.
06935. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de datas e documentar achado no relatório de auditoria.
06936. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06937. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06938. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06939. [REVISÃO_TOTAL] Na área `API`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06940. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06941. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06942. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06943. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06944. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06945. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06946. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06947. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06948. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06949. [REVISÃO_TOTAL] Na área `header`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06950. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06951. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06952. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06953. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06954. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06955. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06956. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06957. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06958. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06959. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06960. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06961. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06962. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06963. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06964. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06965. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de imagens e documentar achado no relatório de auditoria.
06966. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06967. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06968. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06969. [REVISÃO_TOTAL] Na área `API`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06970. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06971. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06972. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06973. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06974. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06975. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06976. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06977. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06978. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06979. [REVISÃO_TOTAL] Na área `header`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06980. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06981. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06982. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06983. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06984. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06985. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06986. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06987. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06988. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06989. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06990. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06991. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06992. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06993. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06994. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06995. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de permissões e documentar achado no relatório de auditoria.
06996. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência visual e documentar achado no relatório de auditoria.
06997. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência visual e documentar achado no relatório de auditoria.
06998. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência visual e documentar achado no relatório de auditoria.
06999. [REVISÃO_TOTAL] Na área `API`, verificar consistência visual e documentar achado no relatório de auditoria.
07000. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência visual e documentar achado no relatório de auditoria.
07001. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência visual e documentar achado no relatório de auditoria.
07002. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência visual e documentar achado no relatório de auditoria.
07003. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência visual e documentar achado no relatório de auditoria.
07004. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência visual e documentar achado no relatório de auditoria.
07005. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência visual e documentar achado no relatório de auditoria.
07006. [REVISÃO_TOTAL] Na área `logística`, verificar consistência visual e documentar achado no relatório de auditoria.
07007. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência visual e documentar achado no relatório de auditoria.
07008. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência visual e documentar achado no relatório de auditoria.
07009. [REVISÃO_TOTAL] Na área `header`, verificar consistência visual e documentar achado no relatório de auditoria.
07010. [REVISÃO_TOTAL] Na área `footer`, verificar consistência visual e documentar achado no relatório de auditoria.
07011. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência visual e documentar achado no relatório de auditoria.
07012. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência visual e documentar achado no relatório de auditoria.
07013. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência visual e documentar achado no relatório de auditoria.
07014. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência visual e documentar achado no relatório de auditoria.
07015. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência visual e documentar achado no relatório de auditoria.
07016. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência visual e documentar achado no relatório de auditoria.
07017. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência visual e documentar achado no relatório de auditoria.
07018. [REVISÃO_TOTAL] Na área `modais`, verificar consistência visual e documentar achado no relatório de auditoria.
07019. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência visual e documentar achado no relatório de auditoria.
07020. [REVISÃO_TOTAL] Na área `cards`, verificar consistência visual e documentar achado no relatório de auditoria.
07021. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência visual e documentar achado no relatório de auditoria.
07022. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência visual e documentar achado no relatório de auditoria.
07023. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência visual e documentar achado no relatório de auditoria.
07024. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência visual e documentar achado no relatório de auditoria.
07025. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência visual e documentar achado no relatório de auditoria.
07026. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
07027. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
07028. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de erros e documentar achado no relatório de auditoria.
07029. [REVISÃO_TOTAL] Na área `API`, verificar consistência de erros e documentar achado no relatório de auditoria.
07030. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de erros e documentar achado no relatório de auditoria.
07031. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de erros e documentar achado no relatório de auditoria.
07032. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de erros e documentar achado no relatório de auditoria.
07033. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de erros e documentar achado no relatório de auditoria.
07034. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de erros e documentar achado no relatório de auditoria.
07035. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de erros e documentar achado no relatório de auditoria.
07036. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de erros e documentar achado no relatório de auditoria.
07037. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de erros e documentar achado no relatório de auditoria.
07038. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de erros e documentar achado no relatório de auditoria.
07039. [REVISÃO_TOTAL] Na área `header`, verificar consistência de erros e documentar achado no relatório de auditoria.
07040. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de erros e documentar achado no relatório de auditoria.
07041. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de erros e documentar achado no relatório de auditoria.
07042. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de erros e documentar achado no relatório de auditoria.
07043. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de erros e documentar achado no relatório de auditoria.
07044. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de erros e documentar achado no relatório de auditoria.
07045. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de erros e documentar achado no relatório de auditoria.
07046. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de erros e documentar achado no relatório de auditoria.
07047. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de erros e documentar achado no relatório de auditoria.
07048. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de erros e documentar achado no relatório de auditoria.
07049. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de erros e documentar achado no relatório de auditoria.
07050. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de erros e documentar achado no relatório de auditoria.
07051. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de erros e documentar achado no relatório de auditoria.
07052. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de erros e documentar achado no relatório de auditoria.
07053. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de erros e documentar achado no relatório de auditoria.
07054. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de erros e documentar achado no relatório de auditoria.
07055. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de erros e documentar achado no relatório de auditoria.
07056. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
07057. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
07058. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário feliz e documentar achado no relatório de auditoria.
07059. [REVISÃO_TOTAL] Na área `API`, verificar cenário feliz e documentar achado no relatório de auditoria.
07060. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário feliz e documentar achado no relatório de auditoria.
07061. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário feliz e documentar achado no relatório de auditoria.
07062. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário feliz e documentar achado no relatório de auditoria.
07063. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário feliz e documentar achado no relatório de auditoria.
07064. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário feliz e documentar achado no relatório de auditoria.
07065. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário feliz e documentar achado no relatório de auditoria.
07066. [REVISÃO_TOTAL] Na área `logística`, verificar cenário feliz e documentar achado no relatório de auditoria.
07067. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário feliz e documentar achado no relatório de auditoria.
07068. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário feliz e documentar achado no relatório de auditoria.
07069. [REVISÃO_TOTAL] Na área `header`, verificar cenário feliz e documentar achado no relatório de auditoria.
07070. [REVISÃO_TOTAL] Na área `footer`, verificar cenário feliz e documentar achado no relatório de auditoria.
07071. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário feliz e documentar achado no relatório de auditoria.
07072. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário feliz e documentar achado no relatório de auditoria.
07073. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário feliz e documentar achado no relatório de auditoria.
07074. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário feliz e documentar achado no relatório de auditoria.
07075. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário feliz e documentar achado no relatório de auditoria.
07076. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário feliz e documentar achado no relatório de auditoria.
07077. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário feliz e documentar achado no relatório de auditoria.
07078. [REVISÃO_TOTAL] Na área `modais`, verificar cenário feliz e documentar achado no relatório de auditoria.
07079. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário feliz e documentar achado no relatório de auditoria.
07080. [REVISÃO_TOTAL] Na área `cards`, verificar cenário feliz e documentar achado no relatório de auditoria.
07081. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário feliz e documentar achado no relatório de auditoria.
07082. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário feliz e documentar achado no relatório de auditoria.
07083. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário feliz e documentar achado no relatório de auditoria.
07084. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário feliz e documentar achado no relatório de auditoria.
07085. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário feliz e documentar achado no relatório de auditoria.
07086. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
07087. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
07088. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário extremo e documentar achado no relatório de auditoria.
07089. [REVISÃO_TOTAL] Na área `API`, verificar cenário extremo e documentar achado no relatório de auditoria.
07090. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário extremo e documentar achado no relatório de auditoria.
07091. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário extremo e documentar achado no relatório de auditoria.
07092. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário extremo e documentar achado no relatório de auditoria.
07093. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário extremo e documentar achado no relatório de auditoria.
07094. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário extremo e documentar achado no relatório de auditoria.
07095. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário extremo e documentar achado no relatório de auditoria.
07096. [REVISÃO_TOTAL] Na área `logística`, verificar cenário extremo e documentar achado no relatório de auditoria.
07097. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário extremo e documentar achado no relatório de auditoria.
07098. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário extremo e documentar achado no relatório de auditoria.
07099. [REVISÃO_TOTAL] Na área `header`, verificar cenário extremo e documentar achado no relatório de auditoria.
07100. [REVISÃO_TOTAL] Na área `footer`, verificar cenário extremo e documentar achado no relatório de auditoria.
07101. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário extremo e documentar achado no relatório de auditoria.
07102. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário extremo e documentar achado no relatório de auditoria.
07103. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário extremo e documentar achado no relatório de auditoria.
07104. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário extremo e documentar achado no relatório de auditoria.
07105. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário extremo e documentar achado no relatório de auditoria.
07106. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário extremo e documentar achado no relatório de auditoria.
07107. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário extremo e documentar achado no relatório de auditoria.
07108. [REVISÃO_TOTAL] Na área `modais`, verificar cenário extremo e documentar achado no relatório de auditoria.
07109. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário extremo e documentar achado no relatório de auditoria.
07110. [REVISÃO_TOTAL] Na área `cards`, verificar cenário extremo e documentar achado no relatório de auditoria.
07111. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário extremo e documentar achado no relatório de auditoria.
07112. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário extremo e documentar achado no relatório de auditoria.
07113. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário extremo e documentar achado no relatório de auditoria.
07114. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário extremo e documentar achado no relatório de auditoria.
07115. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário extremo e documentar achado no relatório de auditoria.
07116. [REVISÃO_TOTAL] Na área `front-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07117. [REVISÃO_TOTAL] Na área `back-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07118. [REVISÃO_TOTAL] Na área `banco de dados`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07119. [REVISÃO_TOTAL] Na área `API`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07120. [REVISÃO_TOTAL] Na área `autenticação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07121. [REVISÃO_TOTAL] Na área `autorização`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07122. [REVISÃO_TOTAL] Na área `produtos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07123. [REVISÃO_TOTAL] Na área `pedidos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07124. [REVISÃO_TOTAL] Na área `encomendas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07125. [REVISÃO_TOTAL] Na área `orçamentos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07126. [REVISÃO_TOTAL] Na área `logística`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07127. [REVISÃO_TOTAL] Na área `suporte`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07128. [REVISÃO_TOTAL] Na área `notificações`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07129. [REVISÃO_TOTAL] Na área `header`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07130. [REVISÃO_TOTAL] Na área `footer`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07131. [REVISÃO_TOTAL] Na área `sidebar`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07132. [REVISÃO_TOTAL] Na área `dashboard`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07133. [REVISÃO_TOTAL] Na área `perfil`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07134. [REVISÃO_TOTAL] Na área `uploads`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07135. [REVISÃO_TOTAL] Na área `imagens`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07136. [REVISÃO_TOTAL] Na área `filtros`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07137. [REVISÃO_TOTAL] Na área `paginação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07138. [REVISÃO_TOTAL] Na área `modais`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07139. [REVISÃO_TOTAL] Na área `tabelas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07140. [REVISÃO_TOTAL] Na área `cards`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07141. [REVISÃO_TOTAL] Na área `responsividade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07142. [REVISÃO_TOTAL] Na área `acessibilidade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07143. [REVISÃO_TOTAL] Na área `segurança`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07144. [REVISÃO_TOTAL] Na área `tratamento de erro`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07145. [REVISÃO_TOTAL] Na área `mensagens de usuário`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07146. [REVISÃO_TOTAL] Na área `front-end`, classificar severidade e documentar achado no relatório de auditoria.
07147. [REVISÃO_TOTAL] Na área `back-end`, classificar severidade e documentar achado no relatório de auditoria.
07148. [REVISÃO_TOTAL] Na área `banco de dados`, classificar severidade e documentar achado no relatório de auditoria.
07149. [REVISÃO_TOTAL] Na área `API`, classificar severidade e documentar achado no relatório de auditoria.
07150. [REVISÃO_TOTAL] Na área `autenticação`, classificar severidade e documentar achado no relatório de auditoria.
07151. [REVISÃO_TOTAL] Na área `autorização`, classificar severidade e documentar achado no relatório de auditoria.
07152. [REVISÃO_TOTAL] Na área `produtos`, classificar severidade e documentar achado no relatório de auditoria.
07153. [REVISÃO_TOTAL] Na área `pedidos`, classificar severidade e documentar achado no relatório de auditoria.
07154. [REVISÃO_TOTAL] Na área `encomendas`, classificar severidade e documentar achado no relatório de auditoria.
07155. [REVISÃO_TOTAL] Na área `orçamentos`, classificar severidade e documentar achado no relatório de auditoria.
07156. [REVISÃO_TOTAL] Na área `logística`, classificar severidade e documentar achado no relatório de auditoria.
07157. [REVISÃO_TOTAL] Na área `suporte`, classificar severidade e documentar achado no relatório de auditoria.
07158. [REVISÃO_TOTAL] Na área `notificações`, classificar severidade e documentar achado no relatório de auditoria.
07159. [REVISÃO_TOTAL] Na área `header`, classificar severidade e documentar achado no relatório de auditoria.
07160. [REVISÃO_TOTAL] Na área `footer`, classificar severidade e documentar achado no relatório de auditoria.
07161. [REVISÃO_TOTAL] Na área `sidebar`, classificar severidade e documentar achado no relatório de auditoria.
07162. [REVISÃO_TOTAL] Na área `dashboard`, classificar severidade e documentar achado no relatório de auditoria.
07163. [REVISÃO_TOTAL] Na área `perfil`, classificar severidade e documentar achado no relatório de auditoria.
07164. [REVISÃO_TOTAL] Na área `uploads`, classificar severidade e documentar achado no relatório de auditoria.
07165. [REVISÃO_TOTAL] Na área `imagens`, classificar severidade e documentar achado no relatório de auditoria.
07166. [REVISÃO_TOTAL] Na área `filtros`, classificar severidade e documentar achado no relatório de auditoria.
07167. [REVISÃO_TOTAL] Na área `paginação`, classificar severidade e documentar achado no relatório de auditoria.
07168. [REVISÃO_TOTAL] Na área `modais`, classificar severidade e documentar achado no relatório de auditoria.
07169. [REVISÃO_TOTAL] Na área `tabelas`, classificar severidade e documentar achado no relatório de auditoria.
07170. [REVISÃO_TOTAL] Na área `cards`, classificar severidade e documentar achado no relatório de auditoria.
07171. [REVISÃO_TOTAL] Na área `responsividade`, classificar severidade e documentar achado no relatório de auditoria.
07172. [REVISÃO_TOTAL] Na área `acessibilidade`, classificar severidade e documentar achado no relatório de auditoria.
07173. [REVISÃO_TOTAL] Na área `segurança`, classificar severidade e documentar achado no relatório de auditoria.
07174. [REVISÃO_TOTAL] Na área `tratamento de erro`, classificar severidade e documentar achado no relatório de auditoria.
07175. [REVISÃO_TOTAL] Na área `mensagens de usuário`, classificar severidade e documentar achado no relatório de auditoria.
07176. [REVISÃO_TOTAL] Na área `front-end`, propor correção futura e documentar achado no relatório de auditoria.
07177. [REVISÃO_TOTAL] Na área `back-end`, propor correção futura e documentar achado no relatório de auditoria.
07178. [REVISÃO_TOTAL] Na área `banco de dados`, propor correção futura e documentar achado no relatório de auditoria.
07179. [REVISÃO_TOTAL] Na área `API`, propor correção futura e documentar achado no relatório de auditoria.
07180. [REVISÃO_TOTAL] Na área `autenticação`, propor correção futura e documentar achado no relatório de auditoria.
07181. [REVISÃO_TOTAL] Na área `autorização`, propor correção futura e documentar achado no relatório de auditoria.
07182. [REVISÃO_TOTAL] Na área `produtos`, propor correção futura e documentar achado no relatório de auditoria.
07183. [REVISÃO_TOTAL] Na área `pedidos`, propor correção futura e documentar achado no relatório de auditoria.
07184. [REVISÃO_TOTAL] Na área `encomendas`, propor correção futura e documentar achado no relatório de auditoria.
07185. [REVISÃO_TOTAL] Na área `orçamentos`, propor correção futura e documentar achado no relatório de auditoria.
07186. [REVISÃO_TOTAL] Na área `logística`, propor correção futura e documentar achado no relatório de auditoria.
07187. [REVISÃO_TOTAL] Na área `suporte`, propor correção futura e documentar achado no relatório de auditoria.
07188. [REVISÃO_TOTAL] Na área `notificações`, propor correção futura e documentar achado no relatório de auditoria.
07189. [REVISÃO_TOTAL] Na área `header`, propor correção futura e documentar achado no relatório de auditoria.
07190. [REVISÃO_TOTAL] Na área `footer`, propor correção futura e documentar achado no relatório de auditoria.
07191. [REVISÃO_TOTAL] Na área `sidebar`, propor correção futura e documentar achado no relatório de auditoria.
07192. [REVISÃO_TOTAL] Na área `dashboard`, propor correção futura e documentar achado no relatório de auditoria.
07193. [REVISÃO_TOTAL] Na área `perfil`, propor correção futura e documentar achado no relatório de auditoria.
07194. [REVISÃO_TOTAL] Na área `uploads`, propor correção futura e documentar achado no relatório de auditoria.
07195. [REVISÃO_TOTAL] Na área `imagens`, propor correção futura e documentar achado no relatório de auditoria.
07196. [REVISÃO_TOTAL] Na área `filtros`, propor correção futura e documentar achado no relatório de auditoria.
07197. [REVISÃO_TOTAL] Na área `paginação`, propor correção futura e documentar achado no relatório de auditoria.
07198. [REVISÃO_TOTAL] Na área `modais`, propor correção futura e documentar achado no relatório de auditoria.
07199. [REVISÃO_TOTAL] Na área `tabelas`, propor correção futura e documentar achado no relatório de auditoria.
07200. [REVISÃO_TOTAL] Na área `cards`, propor correção futura e documentar achado no relatório de auditoria.
07201. [REVISÃO_TOTAL] Na área `responsividade`, propor correção futura e documentar achado no relatório de auditoria.
07202. [REVISÃO_TOTAL] Na área `acessibilidade`, propor correção futura e documentar achado no relatório de auditoria.
07203. [REVISÃO_TOTAL] Na área `segurança`, propor correção futura e documentar achado no relatório de auditoria.
07204. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor correção futura e documentar achado no relatório de auditoria.
07205. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor correção futura e documentar achado no relatório de auditoria.
07206. [REVISÃO_TOTAL] Na área `front-end`, propor teste manual e documentar achado no relatório de auditoria.
07207. [REVISÃO_TOTAL] Na área `back-end`, propor teste manual e documentar achado no relatório de auditoria.
07208. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste manual e documentar achado no relatório de auditoria.
07209. [REVISÃO_TOTAL] Na área `API`, propor teste manual e documentar achado no relatório de auditoria.
07210. [REVISÃO_TOTAL] Na área `autenticação`, propor teste manual e documentar achado no relatório de auditoria.
07211. [REVISÃO_TOTAL] Na área `autorização`, propor teste manual e documentar achado no relatório de auditoria.
07212. [REVISÃO_TOTAL] Na área `produtos`, propor teste manual e documentar achado no relatório de auditoria.
07213. [REVISÃO_TOTAL] Na área `pedidos`, propor teste manual e documentar achado no relatório de auditoria.
07214. [REVISÃO_TOTAL] Na área `encomendas`, propor teste manual e documentar achado no relatório de auditoria.
07215. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste manual e documentar achado no relatório de auditoria.
07216. [REVISÃO_TOTAL] Na área `logística`, propor teste manual e documentar achado no relatório de auditoria.
07217. [REVISÃO_TOTAL] Na área `suporte`, propor teste manual e documentar achado no relatório de auditoria.
07218. [REVISÃO_TOTAL] Na área `notificações`, propor teste manual e documentar achado no relatório de auditoria.
07219. [REVISÃO_TOTAL] Na área `header`, propor teste manual e documentar achado no relatório de auditoria.
07220. [REVISÃO_TOTAL] Na área `footer`, propor teste manual e documentar achado no relatório de auditoria.
07221. [REVISÃO_TOTAL] Na área `sidebar`, propor teste manual e documentar achado no relatório de auditoria.
07222. [REVISÃO_TOTAL] Na área `dashboard`, propor teste manual e documentar achado no relatório de auditoria.
07223. [REVISÃO_TOTAL] Na área `perfil`, propor teste manual e documentar achado no relatório de auditoria.
07224. [REVISÃO_TOTAL] Na área `uploads`, propor teste manual e documentar achado no relatório de auditoria.
07225. [REVISÃO_TOTAL] Na área `imagens`, propor teste manual e documentar achado no relatório de auditoria.
07226. [REVISÃO_TOTAL] Na área `filtros`, propor teste manual e documentar achado no relatório de auditoria.
07227. [REVISÃO_TOTAL] Na área `paginação`, propor teste manual e documentar achado no relatório de auditoria.
07228. [REVISÃO_TOTAL] Na área `modais`, propor teste manual e documentar achado no relatório de auditoria.
07229. [REVISÃO_TOTAL] Na área `tabelas`, propor teste manual e documentar achado no relatório de auditoria.
07230. [REVISÃO_TOTAL] Na área `cards`, propor teste manual e documentar achado no relatório de auditoria.
07231. [REVISÃO_TOTAL] Na área `responsividade`, propor teste manual e documentar achado no relatório de auditoria.
07232. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste manual e documentar achado no relatório de auditoria.
07233. [REVISÃO_TOTAL] Na área `segurança`, propor teste manual e documentar achado no relatório de auditoria.
07234. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste manual e documentar achado no relatório de auditoria.
07235. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste manual e documentar achado no relatório de auditoria.
07236. [REVISÃO_TOTAL] Na área `front-end`, propor teste automatizado e documentar achado no relatório de auditoria.
07237. [REVISÃO_TOTAL] Na área `back-end`, propor teste automatizado e documentar achado no relatório de auditoria.
07238. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste automatizado e documentar achado no relatório de auditoria.
07239. [REVISÃO_TOTAL] Na área `API`, propor teste automatizado e documentar achado no relatório de auditoria.
07240. [REVISÃO_TOTAL] Na área `autenticação`, propor teste automatizado e documentar achado no relatório de auditoria.
07241. [REVISÃO_TOTAL] Na área `autorização`, propor teste automatizado e documentar achado no relatório de auditoria.
07242. [REVISÃO_TOTAL] Na área `produtos`, propor teste automatizado e documentar achado no relatório de auditoria.
07243. [REVISÃO_TOTAL] Na área `pedidos`, propor teste automatizado e documentar achado no relatório de auditoria.
07244. [REVISÃO_TOTAL] Na área `encomendas`, propor teste automatizado e documentar achado no relatório de auditoria.
07245. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste automatizado e documentar achado no relatório de auditoria.
07246. [REVISÃO_TOTAL] Na área `logística`, propor teste automatizado e documentar achado no relatório de auditoria.
07247. [REVISÃO_TOTAL] Na área `suporte`, propor teste automatizado e documentar achado no relatório de auditoria.
07248. [REVISÃO_TOTAL] Na área `notificações`, propor teste automatizado e documentar achado no relatório de auditoria.
07249. [REVISÃO_TOTAL] Na área `header`, propor teste automatizado e documentar achado no relatório de auditoria.
07250. [REVISÃO_TOTAL] Na área `footer`, propor teste automatizado e documentar achado no relatório de auditoria.
07251. [REVISÃO_TOTAL] Na área `sidebar`, propor teste automatizado e documentar achado no relatório de auditoria.
07252. [REVISÃO_TOTAL] Na área `dashboard`, propor teste automatizado e documentar achado no relatório de auditoria.
07253. [REVISÃO_TOTAL] Na área `perfil`, propor teste automatizado e documentar achado no relatório de auditoria.
07254. [REVISÃO_TOTAL] Na área `uploads`, propor teste automatizado e documentar achado no relatório de auditoria.
07255. [REVISÃO_TOTAL] Na área `imagens`, propor teste automatizado e documentar achado no relatório de auditoria.
07256. [REVISÃO_TOTAL] Na área `filtros`, propor teste automatizado e documentar achado no relatório de auditoria.
07257. [REVISÃO_TOTAL] Na área `paginação`, propor teste automatizado e documentar achado no relatório de auditoria.
07258. [REVISÃO_TOTAL] Na área `modais`, propor teste automatizado e documentar achado no relatório de auditoria.
07259. [REVISÃO_TOTAL] Na área `tabelas`, propor teste automatizado e documentar achado no relatório de auditoria.
07260. [REVISÃO_TOTAL] Na área `cards`, propor teste automatizado e documentar achado no relatório de auditoria.
07261. [REVISÃO_TOTAL] Na área `responsividade`, propor teste automatizado e documentar achado no relatório de auditoria.
07262. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste automatizado e documentar achado no relatório de auditoria.
07263. [REVISÃO_TOTAL] Na área `segurança`, propor teste automatizado e documentar achado no relatório de auditoria.
07264. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste automatizado e documentar achado no relatório de auditoria.
07265. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste automatizado e documentar achado no relatório de auditoria.
07266. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07267. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07268. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07269. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07270. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07271. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07272. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07273. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07274. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07275. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07276. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07277. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07278. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07279. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07280. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07281. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07282. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07283. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07284. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07285. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07286. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07287. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07288. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07289. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07290. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07291. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07292. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07293. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07294. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07295. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
07296. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07297. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07298. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07299. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07300. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07301. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07302. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07303. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07304. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07305. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07306. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07307. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07308. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07309. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07310. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07311. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07312. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07313. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07314. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07315. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07316. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07317. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07318. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07319. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07320. [REVISÃO_TOTAL] Na área `cards`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07321. [REVISÃO_TOTAL] Na área `responsividade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07322. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07323. [REVISÃO_TOTAL] Na área `segurança`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07324. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07325. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear fluxo de dados e documentar achado no relatório de auditoria.
07326. [REVISÃO_TOTAL] Na área `front-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07327. [REVISÃO_TOTAL] Na área `back-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07328. [REVISÃO_TOTAL] Na área `banco de dados`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07329. [REVISÃO_TOTAL] Na área `API`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07330. [REVISÃO_TOTAL] Na área `autenticação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07331. [REVISÃO_TOTAL] Na área `autorização`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07332. [REVISÃO_TOTAL] Na área `produtos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07333. [REVISÃO_TOTAL] Na área `pedidos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07334. [REVISÃO_TOTAL] Na área `encomendas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07335. [REVISÃO_TOTAL] Na área `orçamentos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07336. [REVISÃO_TOTAL] Na área `logística`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07337. [REVISÃO_TOTAL] Na área `suporte`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07338. [REVISÃO_TOTAL] Na área `notificações`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07339. [REVISÃO_TOTAL] Na área `header`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07340. [REVISÃO_TOTAL] Na área `footer`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07341. [REVISÃO_TOTAL] Na área `sidebar`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07342. [REVISÃO_TOTAL] Na área `dashboard`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07343. [REVISÃO_TOTAL] Na área `perfil`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07344. [REVISÃO_TOTAL] Na área `uploads`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07345. [REVISÃO_TOTAL] Na área `imagens`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07346. [REVISÃO_TOTAL] Na área `filtros`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07347. [REVISÃO_TOTAL] Na área `paginação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07348. [REVISÃO_TOTAL] Na área `modais`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07349. [REVISÃO_TOTAL] Na área `tabelas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07350. [REVISÃO_TOTAL] Na área `cards`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07351. [REVISÃO_TOTAL] Na área `responsividade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07352. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07353. [REVISÃO_TOTAL] Na área `segurança`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07354. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07355. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
07356. [REVISÃO_TOTAL] Na área `front-end`, mapear validações existentes e documentar achado no relatório de auditoria.
07357. [REVISÃO_TOTAL] Na área `back-end`, mapear validações existentes e documentar achado no relatório de auditoria.
07358. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações existentes e documentar achado no relatório de auditoria.
07359. [REVISÃO_TOTAL] Na área `API`, mapear validações existentes e documentar achado no relatório de auditoria.
07360. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações existentes e documentar achado no relatório de auditoria.
07361. [REVISÃO_TOTAL] Na área `autorização`, mapear validações existentes e documentar achado no relatório de auditoria.
07362. [REVISÃO_TOTAL] Na área `produtos`, mapear validações existentes e documentar achado no relatório de auditoria.
07363. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações existentes e documentar achado no relatório de auditoria.
07364. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações existentes e documentar achado no relatório de auditoria.
07365. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações existentes e documentar achado no relatório de auditoria.
07366. [REVISÃO_TOTAL] Na área `logística`, mapear validações existentes e documentar achado no relatório de auditoria.
07367. [REVISÃO_TOTAL] Na área `suporte`, mapear validações existentes e documentar achado no relatório de auditoria.
07368. [REVISÃO_TOTAL] Na área `notificações`, mapear validações existentes e documentar achado no relatório de auditoria.
07369. [REVISÃO_TOTAL] Na área `header`, mapear validações existentes e documentar achado no relatório de auditoria.
07370. [REVISÃO_TOTAL] Na área `footer`, mapear validações existentes e documentar achado no relatório de auditoria.
07371. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações existentes e documentar achado no relatório de auditoria.
07372. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações existentes e documentar achado no relatório de auditoria.
07373. [REVISÃO_TOTAL] Na área `perfil`, mapear validações existentes e documentar achado no relatório de auditoria.
07374. [REVISÃO_TOTAL] Na área `uploads`, mapear validações existentes e documentar achado no relatório de auditoria.
07375. [REVISÃO_TOTAL] Na área `imagens`, mapear validações existentes e documentar achado no relatório de auditoria.
07376. [REVISÃO_TOTAL] Na área `filtros`, mapear validações existentes e documentar achado no relatório de auditoria.
07377. [REVISÃO_TOTAL] Na área `paginação`, mapear validações existentes e documentar achado no relatório de auditoria.
07378. [REVISÃO_TOTAL] Na área `modais`, mapear validações existentes e documentar achado no relatório de auditoria.
07379. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações existentes e documentar achado no relatório de auditoria.
07380. [REVISÃO_TOTAL] Na área `cards`, mapear validações existentes e documentar achado no relatório de auditoria.
07381. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações existentes e documentar achado no relatório de auditoria.
07382. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações existentes e documentar achado no relatório de auditoria.
07383. [REVISÃO_TOTAL] Na área `segurança`, mapear validações existentes e documentar achado no relatório de auditoria.
07384. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações existentes e documentar achado no relatório de auditoria.
07385. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações existentes e documentar achado no relatório de auditoria.
07386. [REVISÃO_TOTAL] Na área `front-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
07387. [REVISÃO_TOTAL] Na área `back-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
07388. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações ausentes e documentar achado no relatório de auditoria.
07389. [REVISÃO_TOTAL] Na área `API`, mapear validações ausentes e documentar achado no relatório de auditoria.
07390. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações ausentes e documentar achado no relatório de auditoria.
07391. [REVISÃO_TOTAL] Na área `autorização`, mapear validações ausentes e documentar achado no relatório de auditoria.
07392. [REVISÃO_TOTAL] Na área `produtos`, mapear validações ausentes e documentar achado no relatório de auditoria.
07393. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações ausentes e documentar achado no relatório de auditoria.
07394. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações ausentes e documentar achado no relatório de auditoria.
07395. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações ausentes e documentar achado no relatório de auditoria.
07396. [REVISÃO_TOTAL] Na área `logística`, mapear validações ausentes e documentar achado no relatório de auditoria.
07397. [REVISÃO_TOTAL] Na área `suporte`, mapear validações ausentes e documentar achado no relatório de auditoria.
07398. [REVISÃO_TOTAL] Na área `notificações`, mapear validações ausentes e documentar achado no relatório de auditoria.
07399. [REVISÃO_TOTAL] Na área `header`, mapear validações ausentes e documentar achado no relatório de auditoria.
07400. [REVISÃO_TOTAL] Na área `footer`, mapear validações ausentes e documentar achado no relatório de auditoria.
07401. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações ausentes e documentar achado no relatório de auditoria.
07402. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações ausentes e documentar achado no relatório de auditoria.
07403. [REVISÃO_TOTAL] Na área `perfil`, mapear validações ausentes e documentar achado no relatório de auditoria.
07404. [REVISÃO_TOTAL] Na área `uploads`, mapear validações ausentes e documentar achado no relatório de auditoria.
07405. [REVISÃO_TOTAL] Na área `imagens`, mapear validações ausentes e documentar achado no relatório de auditoria.
07406. [REVISÃO_TOTAL] Na área `filtros`, mapear validações ausentes e documentar achado no relatório de auditoria.
07407. [REVISÃO_TOTAL] Na área `paginação`, mapear validações ausentes e documentar achado no relatório de auditoria.
07408. [REVISÃO_TOTAL] Na área `modais`, mapear validações ausentes e documentar achado no relatório de auditoria.
07409. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações ausentes e documentar achado no relatório de auditoria.
07410. [REVISÃO_TOTAL] Na área `cards`, mapear validações ausentes e documentar achado no relatório de auditoria.
07411. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações ausentes e documentar achado no relatório de auditoria.
07412. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações ausentes e documentar achado no relatório de auditoria.
07413. [REVISÃO_TOTAL] Na área `segurança`, mapear validações ausentes e documentar achado no relatório de auditoria.
07414. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações ausentes e documentar achado no relatório de auditoria.
07415. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações ausentes e documentar achado no relatório de auditoria.
07416. [REVISÃO_TOTAL] Na área `front-end`, mapear dependências e documentar achado no relatório de auditoria.
07417. [REVISÃO_TOTAL] Na área `back-end`, mapear dependências e documentar achado no relatório de auditoria.
07418. [REVISÃO_TOTAL] Na área `banco de dados`, mapear dependências e documentar achado no relatório de auditoria.
07419. [REVISÃO_TOTAL] Na área `API`, mapear dependências e documentar achado no relatório de auditoria.
07420. [REVISÃO_TOTAL] Na área `autenticação`, mapear dependências e documentar achado no relatório de auditoria.
07421. [REVISÃO_TOTAL] Na área `autorização`, mapear dependências e documentar achado no relatório de auditoria.
07422. [REVISÃO_TOTAL] Na área `produtos`, mapear dependências e documentar achado no relatório de auditoria.
07423. [REVISÃO_TOTAL] Na área `pedidos`, mapear dependências e documentar achado no relatório de auditoria.
07424. [REVISÃO_TOTAL] Na área `encomendas`, mapear dependências e documentar achado no relatório de auditoria.
07425. [REVISÃO_TOTAL] Na área `orçamentos`, mapear dependências e documentar achado no relatório de auditoria.
07426. [REVISÃO_TOTAL] Na área `logística`, mapear dependências e documentar achado no relatório de auditoria.
07427. [REVISÃO_TOTAL] Na área `suporte`, mapear dependências e documentar achado no relatório de auditoria.
07428. [REVISÃO_TOTAL] Na área `notificações`, mapear dependências e documentar achado no relatório de auditoria.
07429. [REVISÃO_TOTAL] Na área `header`, mapear dependências e documentar achado no relatório de auditoria.
07430. [REVISÃO_TOTAL] Na área `footer`, mapear dependências e documentar achado no relatório de auditoria.
07431. [REVISÃO_TOTAL] Na área `sidebar`, mapear dependências e documentar achado no relatório de auditoria.
07432. [REVISÃO_TOTAL] Na área `dashboard`, mapear dependências e documentar achado no relatório de auditoria.
07433. [REVISÃO_TOTAL] Na área `perfil`, mapear dependências e documentar achado no relatório de auditoria.
07434. [REVISÃO_TOTAL] Na área `uploads`, mapear dependências e documentar achado no relatório de auditoria.
07435. [REVISÃO_TOTAL] Na área `imagens`, mapear dependências e documentar achado no relatório de auditoria.
07436. [REVISÃO_TOTAL] Na área `filtros`, mapear dependências e documentar achado no relatório de auditoria.
07437. [REVISÃO_TOTAL] Na área `paginação`, mapear dependências e documentar achado no relatório de auditoria.
07438. [REVISÃO_TOTAL] Na área `modais`, mapear dependências e documentar achado no relatório de auditoria.
07439. [REVISÃO_TOTAL] Na área `tabelas`, mapear dependências e documentar achado no relatório de auditoria.
07440. [REVISÃO_TOTAL] Na área `cards`, mapear dependências e documentar achado no relatório de auditoria.
07441. [REVISÃO_TOTAL] Na área `responsividade`, mapear dependências e documentar achado no relatório de auditoria.
07442. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear dependências e documentar achado no relatório de auditoria.
07443. [REVISÃO_TOTAL] Na área `segurança`, mapear dependências e documentar achado no relatório de auditoria.
07444. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear dependências e documentar achado no relatório de auditoria.
07445. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear dependências e documentar achado no relatório de auditoria.
07446. [REVISÃO_TOTAL] Na área `front-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
07447. [REVISÃO_TOTAL] Na área `back-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
07448. [REVISÃO_TOTAL] Na área `banco de dados`, mapear risco de regressão e documentar achado no relatório de auditoria.
07449. [REVISÃO_TOTAL] Na área `API`, mapear risco de regressão e documentar achado no relatório de auditoria.
07450. [REVISÃO_TOTAL] Na área `autenticação`, mapear risco de regressão e documentar achado no relatório de auditoria.
07451. [REVISÃO_TOTAL] Na área `autorização`, mapear risco de regressão e documentar achado no relatório de auditoria.
07452. [REVISÃO_TOTAL] Na área `produtos`, mapear risco de regressão e documentar achado no relatório de auditoria.
07453. [REVISÃO_TOTAL] Na área `pedidos`, mapear risco de regressão e documentar achado no relatório de auditoria.
07454. [REVISÃO_TOTAL] Na área `encomendas`, mapear risco de regressão e documentar achado no relatório de auditoria.
07455. [REVISÃO_TOTAL] Na área `orçamentos`, mapear risco de regressão e documentar achado no relatório de auditoria.
07456. [REVISÃO_TOTAL] Na área `logística`, mapear risco de regressão e documentar achado no relatório de auditoria.
07457. [REVISÃO_TOTAL] Na área `suporte`, mapear risco de regressão e documentar achado no relatório de auditoria.
07458. [REVISÃO_TOTAL] Na área `notificações`, mapear risco de regressão e documentar achado no relatório de auditoria.
07459. [REVISÃO_TOTAL] Na área `header`, mapear risco de regressão e documentar achado no relatório de auditoria.
07460. [REVISÃO_TOTAL] Na área `footer`, mapear risco de regressão e documentar achado no relatório de auditoria.
07461. [REVISÃO_TOTAL] Na área `sidebar`, mapear risco de regressão e documentar achado no relatório de auditoria.
07462. [REVISÃO_TOTAL] Na área `dashboard`, mapear risco de regressão e documentar achado no relatório de auditoria.
07463. [REVISÃO_TOTAL] Na área `perfil`, mapear risco de regressão e documentar achado no relatório de auditoria.
07464. [REVISÃO_TOTAL] Na área `uploads`, mapear risco de regressão e documentar achado no relatório de auditoria.
07465. [REVISÃO_TOTAL] Na área `imagens`, mapear risco de regressão e documentar achado no relatório de auditoria.
07466. [REVISÃO_TOTAL] Na área `filtros`, mapear risco de regressão e documentar achado no relatório de auditoria.
07467. [REVISÃO_TOTAL] Na área `paginação`, mapear risco de regressão e documentar achado no relatório de auditoria.
07468. [REVISÃO_TOTAL] Na área `modais`, mapear risco de regressão e documentar achado no relatório de auditoria.
07469. [REVISÃO_TOTAL] Na área `tabelas`, mapear risco de regressão e documentar achado no relatório de auditoria.
07470. [REVISÃO_TOTAL] Na área `cards`, mapear risco de regressão e documentar achado no relatório de auditoria.
07471. [REVISÃO_TOTAL] Na área `responsividade`, mapear risco de regressão e documentar achado no relatório de auditoria.
07472. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear risco de regressão e documentar achado no relatório de auditoria.
07473. [REVISÃO_TOTAL] Na área `segurança`, mapear risco de regressão e documentar achado no relatório de auditoria.
07474. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear risco de regressão e documentar achado no relatório de auditoria.
07475. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear risco de regressão e documentar achado no relatório de auditoria.
07476. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07477. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07478. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07479. [REVISÃO_TOTAL] Na área `API`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07480. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07481. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07482. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07483. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07484. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07485. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07486. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07487. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07488. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07489. [REVISÃO_TOTAL] Na área `header`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07490. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07491. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07492. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07493. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07494. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07495. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07496. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07497. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07498. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07499. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07500. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07501. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07502. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07503. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07504. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07505. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
07506. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07507. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07508. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07509. [REVISÃO_TOTAL] Na área `API`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07510. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07511. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07512. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07513. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07514. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07515. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07516. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07517. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07518. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07519. [REVISÃO_TOTAL] Na área `header`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07520. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07521. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07522. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07523. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07524. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07525. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07526. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07527. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07528. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07529. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07530. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07531. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07532. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07533. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07534. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07535. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
07536. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
07537. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
07538. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em admin e documentar achado no relatório de auditoria.
07539. [REVISÃO_TOTAL] Na área `API`, mapear impacto em admin e documentar achado no relatório de auditoria.
07540. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em admin e documentar achado no relatório de auditoria.
07541. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em admin e documentar achado no relatório de auditoria.
07542. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em admin e documentar achado no relatório de auditoria.
07543. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em admin e documentar achado no relatório de auditoria.
07544. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em admin e documentar achado no relatório de auditoria.
07545. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em admin e documentar achado no relatório de auditoria.
07546. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em admin e documentar achado no relatório de auditoria.
07547. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em admin e documentar achado no relatório de auditoria.
07548. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em admin e documentar achado no relatório de auditoria.
07549. [REVISÃO_TOTAL] Na área `header`, mapear impacto em admin e documentar achado no relatório de auditoria.
07550. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em admin e documentar achado no relatório de auditoria.
07551. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em admin e documentar achado no relatório de auditoria.
07552. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em admin e documentar achado no relatório de auditoria.
07553. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em admin e documentar achado no relatório de auditoria.
07554. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em admin e documentar achado no relatório de auditoria.
07555. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em admin e documentar achado no relatório de auditoria.
07556. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em admin e documentar achado no relatório de auditoria.
07557. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em admin e documentar achado no relatório de auditoria.
07558. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em admin e documentar achado no relatório de auditoria.
07559. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em admin e documentar achado no relatório de auditoria.
07560. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em admin e documentar achado no relatório de auditoria.
07561. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em admin e documentar achado no relatório de auditoria.
07562. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em admin e documentar achado no relatório de auditoria.
07563. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em admin e documentar achado no relatório de auditoria.
07564. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em admin e documentar achado no relatório de auditoria.
07565. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em admin e documentar achado no relatório de auditoria.
07566. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07567. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07568. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07569. [REVISÃO_TOTAL] Na área `API`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07570. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07571. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07572. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07573. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07574. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07575. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07576. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07577. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07578. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07579. [REVISÃO_TOTAL] Na área `header`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07580. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07581. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07582. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07583. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07584. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07585. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07586. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07587. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07588. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07589. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07590. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07591. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07592. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07593. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07594. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07595. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de nomes e documentar achado no relatório de auditoria.
07596. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de status e documentar achado no relatório de auditoria.
07597. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de status e documentar achado no relatório de auditoria.
07598. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de status e documentar achado no relatório de auditoria.
07599. [REVISÃO_TOTAL] Na área `API`, verificar consistência de status e documentar achado no relatório de auditoria.
07600. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de status e documentar achado no relatório de auditoria.
07601. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de status e documentar achado no relatório de auditoria.
07602. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de status e documentar achado no relatório de auditoria.
07603. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de status e documentar achado no relatório de auditoria.
07604. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de status e documentar achado no relatório de auditoria.
07605. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de status e documentar achado no relatório de auditoria.
07606. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de status e documentar achado no relatório de auditoria.
07607. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de status e documentar achado no relatório de auditoria.
07608. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de status e documentar achado no relatório de auditoria.
07609. [REVISÃO_TOTAL] Na área `header`, verificar consistência de status e documentar achado no relatório de auditoria.
07610. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de status e documentar achado no relatório de auditoria.
07611. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de status e documentar achado no relatório de auditoria.
07612. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de status e documentar achado no relatório de auditoria.
07613. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de status e documentar achado no relatório de auditoria.
07614. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de status e documentar achado no relatório de auditoria.
07615. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de status e documentar achado no relatório de auditoria.
07616. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de status e documentar achado no relatório de auditoria.
07617. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de status e documentar achado no relatório de auditoria.
07618. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de status e documentar achado no relatório de auditoria.
07619. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de status e documentar achado no relatório de auditoria.
07620. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de status e documentar achado no relatório de auditoria.
07621. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de status e documentar achado no relatório de auditoria.
07622. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de status e documentar achado no relatório de auditoria.
07623. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de status e documentar achado no relatório de auditoria.
07624. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de status e documentar achado no relatório de auditoria.
07625. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de status e documentar achado no relatório de auditoria.
07626. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
07627. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
07628. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de ids e documentar achado no relatório de auditoria.
07629. [REVISÃO_TOTAL] Na área `API`, verificar consistência de ids e documentar achado no relatório de auditoria.
07630. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de ids e documentar achado no relatório de auditoria.
07631. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de ids e documentar achado no relatório de auditoria.
07632. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de ids e documentar achado no relatório de auditoria.
07633. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de ids e documentar achado no relatório de auditoria.
07634. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de ids e documentar achado no relatório de auditoria.
07635. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de ids e documentar achado no relatório de auditoria.
07636. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de ids e documentar achado no relatório de auditoria.
07637. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de ids e documentar achado no relatório de auditoria.
07638. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de ids e documentar achado no relatório de auditoria.
07639. [REVISÃO_TOTAL] Na área `header`, verificar consistência de ids e documentar achado no relatório de auditoria.
07640. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de ids e documentar achado no relatório de auditoria.
07641. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de ids e documentar achado no relatório de auditoria.
07642. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de ids e documentar achado no relatório de auditoria.
07643. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de ids e documentar achado no relatório de auditoria.
07644. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de ids e documentar achado no relatório de auditoria.
07645. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de ids e documentar achado no relatório de auditoria.
07646. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de ids e documentar achado no relatório de auditoria.
07647. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de ids e documentar achado no relatório de auditoria.
07648. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de ids e documentar achado no relatório de auditoria.
07649. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de ids e documentar achado no relatório de auditoria.
07650. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de ids e documentar achado no relatório de auditoria.
07651. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de ids e documentar achado no relatório de auditoria.
07652. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de ids e documentar achado no relatório de auditoria.
07653. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de ids e documentar achado no relatório de auditoria.
07654. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de ids e documentar achado no relatório de auditoria.
07655. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de ids e documentar achado no relatório de auditoria.
07656. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
07657. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
07658. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de datas e documentar achado no relatório de auditoria.
07659. [REVISÃO_TOTAL] Na área `API`, verificar consistência de datas e documentar achado no relatório de auditoria.
07660. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de datas e documentar achado no relatório de auditoria.
07661. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de datas e documentar achado no relatório de auditoria.
07662. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de datas e documentar achado no relatório de auditoria.
07663. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de datas e documentar achado no relatório de auditoria.
07664. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de datas e documentar achado no relatório de auditoria.
07665. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de datas e documentar achado no relatório de auditoria.
07666. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de datas e documentar achado no relatório de auditoria.
07667. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de datas e documentar achado no relatório de auditoria.
07668. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de datas e documentar achado no relatório de auditoria.
07669. [REVISÃO_TOTAL] Na área `header`, verificar consistência de datas e documentar achado no relatório de auditoria.
07670. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de datas e documentar achado no relatório de auditoria.
07671. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de datas e documentar achado no relatório de auditoria.
07672. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de datas e documentar achado no relatório de auditoria.
07673. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de datas e documentar achado no relatório de auditoria.
07674. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de datas e documentar achado no relatório de auditoria.
07675. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de datas e documentar achado no relatório de auditoria.
07676. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de datas e documentar achado no relatório de auditoria.
07677. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de datas e documentar achado no relatório de auditoria.
07678. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de datas e documentar achado no relatório de auditoria.
07679. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de datas e documentar achado no relatório de auditoria.
07680. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de datas e documentar achado no relatório de auditoria.
07681. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de datas e documentar achado no relatório de auditoria.
07682. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de datas e documentar achado no relatório de auditoria.
07683. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de datas e documentar achado no relatório de auditoria.
07684. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de datas e documentar achado no relatório de auditoria.
07685. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de datas e documentar achado no relatório de auditoria.
07686. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07687. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07688. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07689. [REVISÃO_TOTAL] Na área `API`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07690. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07691. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07692. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07693. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07694. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07695. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07696. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07697. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07698. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07699. [REVISÃO_TOTAL] Na área `header`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07700. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07701. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07702. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07703. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07704. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07705. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07706. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07707. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07708. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07709. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07710. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07711. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07712. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07713. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07714. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07715. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de imagens e documentar achado no relatório de auditoria.
07716. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07717. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07718. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07719. [REVISÃO_TOTAL] Na área `API`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07720. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07721. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07722. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07723. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07724. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07725. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07726. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07727. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07728. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07729. [REVISÃO_TOTAL] Na área `header`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07730. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07731. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07732. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07733. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07734. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07735. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07736. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07737. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07738. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07739. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07740. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07741. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07742. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07743. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07744. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07745. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de permissões e documentar achado no relatório de auditoria.
07746. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência visual e documentar achado no relatório de auditoria.
07747. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência visual e documentar achado no relatório de auditoria.
07748. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência visual e documentar achado no relatório de auditoria.
07749. [REVISÃO_TOTAL] Na área `API`, verificar consistência visual e documentar achado no relatório de auditoria.
07750. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência visual e documentar achado no relatório de auditoria.
07751. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência visual e documentar achado no relatório de auditoria.
07752. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência visual e documentar achado no relatório de auditoria.
07753. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência visual e documentar achado no relatório de auditoria.
07754. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência visual e documentar achado no relatório de auditoria.
07755. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência visual e documentar achado no relatório de auditoria.
07756. [REVISÃO_TOTAL] Na área `logística`, verificar consistência visual e documentar achado no relatório de auditoria.
07757. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência visual e documentar achado no relatório de auditoria.
07758. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência visual e documentar achado no relatório de auditoria.
07759. [REVISÃO_TOTAL] Na área `header`, verificar consistência visual e documentar achado no relatório de auditoria.
07760. [REVISÃO_TOTAL] Na área `footer`, verificar consistência visual e documentar achado no relatório de auditoria.
07761. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência visual e documentar achado no relatório de auditoria.
07762. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência visual e documentar achado no relatório de auditoria.
07763. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência visual e documentar achado no relatório de auditoria.
07764. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência visual e documentar achado no relatório de auditoria.
07765. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência visual e documentar achado no relatório de auditoria.
07766. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência visual e documentar achado no relatório de auditoria.
07767. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência visual e documentar achado no relatório de auditoria.
07768. [REVISÃO_TOTAL] Na área `modais`, verificar consistência visual e documentar achado no relatório de auditoria.
07769. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência visual e documentar achado no relatório de auditoria.
07770. [REVISÃO_TOTAL] Na área `cards`, verificar consistência visual e documentar achado no relatório de auditoria.
07771. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência visual e documentar achado no relatório de auditoria.
07772. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência visual e documentar achado no relatório de auditoria.
07773. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência visual e documentar achado no relatório de auditoria.
07774. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência visual e documentar achado no relatório de auditoria.
07775. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência visual e documentar achado no relatório de auditoria.
07776. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
07777. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
07778. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de erros e documentar achado no relatório de auditoria.
07779. [REVISÃO_TOTAL] Na área `API`, verificar consistência de erros e documentar achado no relatório de auditoria.
07780. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de erros e documentar achado no relatório de auditoria.
07781. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de erros e documentar achado no relatório de auditoria.
07782. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de erros e documentar achado no relatório de auditoria.
07783. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de erros e documentar achado no relatório de auditoria.
07784. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de erros e documentar achado no relatório de auditoria.
07785. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de erros e documentar achado no relatório de auditoria.
07786. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de erros e documentar achado no relatório de auditoria.
07787. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de erros e documentar achado no relatório de auditoria.
07788. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de erros e documentar achado no relatório de auditoria.
07789. [REVISÃO_TOTAL] Na área `header`, verificar consistência de erros e documentar achado no relatório de auditoria.
07790. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de erros e documentar achado no relatório de auditoria.
07791. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de erros e documentar achado no relatório de auditoria.
07792. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de erros e documentar achado no relatório de auditoria.
07793. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de erros e documentar achado no relatório de auditoria.
07794. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de erros e documentar achado no relatório de auditoria.
07795. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de erros e documentar achado no relatório de auditoria.
07796. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de erros e documentar achado no relatório de auditoria.
07797. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de erros e documentar achado no relatório de auditoria.
07798. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de erros e documentar achado no relatório de auditoria.
07799. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de erros e documentar achado no relatório de auditoria.
07800. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de erros e documentar achado no relatório de auditoria.
07801. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de erros e documentar achado no relatório de auditoria.
07802. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de erros e documentar achado no relatório de auditoria.
07803. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de erros e documentar achado no relatório de auditoria.
07804. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de erros e documentar achado no relatório de auditoria.
07805. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de erros e documentar achado no relatório de auditoria.
07806. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
07807. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
07808. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário feliz e documentar achado no relatório de auditoria.
07809. [REVISÃO_TOTAL] Na área `API`, verificar cenário feliz e documentar achado no relatório de auditoria.
07810. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário feliz e documentar achado no relatório de auditoria.
07811. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário feliz e documentar achado no relatório de auditoria.
07812. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário feliz e documentar achado no relatório de auditoria.
07813. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário feliz e documentar achado no relatório de auditoria.
07814. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário feliz e documentar achado no relatório de auditoria.
07815. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário feliz e documentar achado no relatório de auditoria.
07816. [REVISÃO_TOTAL] Na área `logística`, verificar cenário feliz e documentar achado no relatório de auditoria.
07817. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário feliz e documentar achado no relatório de auditoria.
07818. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário feliz e documentar achado no relatório de auditoria.
07819. [REVISÃO_TOTAL] Na área `header`, verificar cenário feliz e documentar achado no relatório de auditoria.
07820. [REVISÃO_TOTAL] Na área `footer`, verificar cenário feliz e documentar achado no relatório de auditoria.
07821. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário feliz e documentar achado no relatório de auditoria.
07822. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário feliz e documentar achado no relatório de auditoria.
07823. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário feliz e documentar achado no relatório de auditoria.
07824. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário feliz e documentar achado no relatório de auditoria.
07825. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário feliz e documentar achado no relatório de auditoria.
07826. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário feliz e documentar achado no relatório de auditoria.
07827. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário feliz e documentar achado no relatório de auditoria.
07828. [REVISÃO_TOTAL] Na área `modais`, verificar cenário feliz e documentar achado no relatório de auditoria.
07829. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário feliz e documentar achado no relatório de auditoria.
07830. [REVISÃO_TOTAL] Na área `cards`, verificar cenário feliz e documentar achado no relatório de auditoria.
07831. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário feliz e documentar achado no relatório de auditoria.
07832. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário feliz e documentar achado no relatório de auditoria.
07833. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário feliz e documentar achado no relatório de auditoria.
07834. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário feliz e documentar achado no relatório de auditoria.
07835. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário feliz e documentar achado no relatório de auditoria.
07836. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
07837. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
07838. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário extremo e documentar achado no relatório de auditoria.
07839. [REVISÃO_TOTAL] Na área `API`, verificar cenário extremo e documentar achado no relatório de auditoria.
07840. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário extremo e documentar achado no relatório de auditoria.
07841. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário extremo e documentar achado no relatório de auditoria.
07842. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário extremo e documentar achado no relatório de auditoria.
07843. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário extremo e documentar achado no relatório de auditoria.
07844. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário extremo e documentar achado no relatório de auditoria.
07845. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário extremo e documentar achado no relatório de auditoria.
07846. [REVISÃO_TOTAL] Na área `logística`, verificar cenário extremo e documentar achado no relatório de auditoria.
07847. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário extremo e documentar achado no relatório de auditoria.
07848. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário extremo e documentar achado no relatório de auditoria.
07849. [REVISÃO_TOTAL] Na área `header`, verificar cenário extremo e documentar achado no relatório de auditoria.
07850. [REVISÃO_TOTAL] Na área `footer`, verificar cenário extremo e documentar achado no relatório de auditoria.
07851. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário extremo e documentar achado no relatório de auditoria.
07852. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário extremo e documentar achado no relatório de auditoria.
07853. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário extremo e documentar achado no relatório de auditoria.
07854. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário extremo e documentar achado no relatório de auditoria.
07855. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário extremo e documentar achado no relatório de auditoria.
07856. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário extremo e documentar achado no relatório de auditoria.
07857. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário extremo e documentar achado no relatório de auditoria.
07858. [REVISÃO_TOTAL] Na área `modais`, verificar cenário extremo e documentar achado no relatório de auditoria.
07859. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário extremo e documentar achado no relatório de auditoria.
07860. [REVISÃO_TOTAL] Na área `cards`, verificar cenário extremo e documentar achado no relatório de auditoria.
07861. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário extremo e documentar achado no relatório de auditoria.
07862. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário extremo e documentar achado no relatório de auditoria.
07863. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário extremo e documentar achado no relatório de auditoria.
07864. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário extremo e documentar achado no relatório de auditoria.
07865. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário extremo e documentar achado no relatório de auditoria.
07866. [REVISÃO_TOTAL] Na área `front-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07867. [REVISÃO_TOTAL] Na área `back-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07868. [REVISÃO_TOTAL] Na área `banco de dados`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07869. [REVISÃO_TOTAL] Na área `API`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07870. [REVISÃO_TOTAL] Na área `autenticação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07871. [REVISÃO_TOTAL] Na área `autorização`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07872. [REVISÃO_TOTAL] Na área `produtos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07873. [REVISÃO_TOTAL] Na área `pedidos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07874. [REVISÃO_TOTAL] Na área `encomendas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07875. [REVISÃO_TOTAL] Na área `orçamentos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07876. [REVISÃO_TOTAL] Na área `logística`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07877. [REVISÃO_TOTAL] Na área `suporte`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07878. [REVISÃO_TOTAL] Na área `notificações`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07879. [REVISÃO_TOTAL] Na área `header`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07880. [REVISÃO_TOTAL] Na área `footer`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07881. [REVISÃO_TOTAL] Na área `sidebar`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07882. [REVISÃO_TOTAL] Na área `dashboard`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07883. [REVISÃO_TOTAL] Na área `perfil`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07884. [REVISÃO_TOTAL] Na área `uploads`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07885. [REVISÃO_TOTAL] Na área `imagens`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07886. [REVISÃO_TOTAL] Na área `filtros`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07887. [REVISÃO_TOTAL] Na área `paginação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07888. [REVISÃO_TOTAL] Na área `modais`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07889. [REVISÃO_TOTAL] Na área `tabelas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07890. [REVISÃO_TOTAL] Na área `cards`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07891. [REVISÃO_TOTAL] Na área `responsividade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07892. [REVISÃO_TOTAL] Na área `acessibilidade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07893. [REVISÃO_TOTAL] Na área `segurança`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07894. [REVISÃO_TOTAL] Na área `tratamento de erro`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07895. [REVISÃO_TOTAL] Na área `mensagens de usuário`, registrar evidência encontrada e documentar achado no relatório de auditoria.
07896. [REVISÃO_TOTAL] Na área `front-end`, classificar severidade e documentar achado no relatório de auditoria.
07897. [REVISÃO_TOTAL] Na área `back-end`, classificar severidade e documentar achado no relatório de auditoria.
07898. [REVISÃO_TOTAL] Na área `banco de dados`, classificar severidade e documentar achado no relatório de auditoria.
07899. [REVISÃO_TOTAL] Na área `API`, classificar severidade e documentar achado no relatório de auditoria.
07900. [REVISÃO_TOTAL] Na área `autenticação`, classificar severidade e documentar achado no relatório de auditoria.
07901. [REVISÃO_TOTAL] Na área `autorização`, classificar severidade e documentar achado no relatório de auditoria.
07902. [REVISÃO_TOTAL] Na área `produtos`, classificar severidade e documentar achado no relatório de auditoria.
07903. [REVISÃO_TOTAL] Na área `pedidos`, classificar severidade e documentar achado no relatório de auditoria.
07904. [REVISÃO_TOTAL] Na área `encomendas`, classificar severidade e documentar achado no relatório de auditoria.
07905. [REVISÃO_TOTAL] Na área `orçamentos`, classificar severidade e documentar achado no relatório de auditoria.
07906. [REVISÃO_TOTAL] Na área `logística`, classificar severidade e documentar achado no relatório de auditoria.
07907. [REVISÃO_TOTAL] Na área `suporte`, classificar severidade e documentar achado no relatório de auditoria.
07908. [REVISÃO_TOTAL] Na área `notificações`, classificar severidade e documentar achado no relatório de auditoria.
07909. [REVISÃO_TOTAL] Na área `header`, classificar severidade e documentar achado no relatório de auditoria.
07910. [REVISÃO_TOTAL] Na área `footer`, classificar severidade e documentar achado no relatório de auditoria.
07911. [REVISÃO_TOTAL] Na área `sidebar`, classificar severidade e documentar achado no relatório de auditoria.
07912. [REVISÃO_TOTAL] Na área `dashboard`, classificar severidade e documentar achado no relatório de auditoria.
07913. [REVISÃO_TOTAL] Na área `perfil`, classificar severidade e documentar achado no relatório de auditoria.
07914. [REVISÃO_TOTAL] Na área `uploads`, classificar severidade e documentar achado no relatório de auditoria.
07915. [REVISÃO_TOTAL] Na área `imagens`, classificar severidade e documentar achado no relatório de auditoria.
07916. [REVISÃO_TOTAL] Na área `filtros`, classificar severidade e documentar achado no relatório de auditoria.
07917. [REVISÃO_TOTAL] Na área `paginação`, classificar severidade e documentar achado no relatório de auditoria.
07918. [REVISÃO_TOTAL] Na área `modais`, classificar severidade e documentar achado no relatório de auditoria.
07919. [REVISÃO_TOTAL] Na área `tabelas`, classificar severidade e documentar achado no relatório de auditoria.
07920. [REVISÃO_TOTAL] Na área `cards`, classificar severidade e documentar achado no relatório de auditoria.
07921. [REVISÃO_TOTAL] Na área `responsividade`, classificar severidade e documentar achado no relatório de auditoria.
07922. [REVISÃO_TOTAL] Na área `acessibilidade`, classificar severidade e documentar achado no relatório de auditoria.
07923. [REVISÃO_TOTAL] Na área `segurança`, classificar severidade e documentar achado no relatório de auditoria.
07924. [REVISÃO_TOTAL] Na área `tratamento de erro`, classificar severidade e documentar achado no relatório de auditoria.
07925. [REVISÃO_TOTAL] Na área `mensagens de usuário`, classificar severidade e documentar achado no relatório de auditoria.
07926. [REVISÃO_TOTAL] Na área `front-end`, propor correção futura e documentar achado no relatório de auditoria.
07927. [REVISÃO_TOTAL] Na área `back-end`, propor correção futura e documentar achado no relatório de auditoria.
07928. [REVISÃO_TOTAL] Na área `banco de dados`, propor correção futura e documentar achado no relatório de auditoria.
07929. [REVISÃO_TOTAL] Na área `API`, propor correção futura e documentar achado no relatório de auditoria.
07930. [REVISÃO_TOTAL] Na área `autenticação`, propor correção futura e documentar achado no relatório de auditoria.
07931. [REVISÃO_TOTAL] Na área `autorização`, propor correção futura e documentar achado no relatório de auditoria.
07932. [REVISÃO_TOTAL] Na área `produtos`, propor correção futura e documentar achado no relatório de auditoria.
07933. [REVISÃO_TOTAL] Na área `pedidos`, propor correção futura e documentar achado no relatório de auditoria.
07934. [REVISÃO_TOTAL] Na área `encomendas`, propor correção futura e documentar achado no relatório de auditoria.
07935. [REVISÃO_TOTAL] Na área `orçamentos`, propor correção futura e documentar achado no relatório de auditoria.
07936. [REVISÃO_TOTAL] Na área `logística`, propor correção futura e documentar achado no relatório de auditoria.
07937. [REVISÃO_TOTAL] Na área `suporte`, propor correção futura e documentar achado no relatório de auditoria.
07938. [REVISÃO_TOTAL] Na área `notificações`, propor correção futura e documentar achado no relatório de auditoria.
07939. [REVISÃO_TOTAL] Na área `header`, propor correção futura e documentar achado no relatório de auditoria.
07940. [REVISÃO_TOTAL] Na área `footer`, propor correção futura e documentar achado no relatório de auditoria.
07941. [REVISÃO_TOTAL] Na área `sidebar`, propor correção futura e documentar achado no relatório de auditoria.
07942. [REVISÃO_TOTAL] Na área `dashboard`, propor correção futura e documentar achado no relatório de auditoria.
07943. [REVISÃO_TOTAL] Na área `perfil`, propor correção futura e documentar achado no relatório de auditoria.
07944. [REVISÃO_TOTAL] Na área `uploads`, propor correção futura e documentar achado no relatório de auditoria.
07945. [REVISÃO_TOTAL] Na área `imagens`, propor correção futura e documentar achado no relatório de auditoria.
07946. [REVISÃO_TOTAL] Na área `filtros`, propor correção futura e documentar achado no relatório de auditoria.
07947. [REVISÃO_TOTAL] Na área `paginação`, propor correção futura e documentar achado no relatório de auditoria.
07948. [REVISÃO_TOTAL] Na área `modais`, propor correção futura e documentar achado no relatório de auditoria.
07949. [REVISÃO_TOTAL] Na área `tabelas`, propor correção futura e documentar achado no relatório de auditoria.
07950. [REVISÃO_TOTAL] Na área `cards`, propor correção futura e documentar achado no relatório de auditoria.
07951. [REVISÃO_TOTAL] Na área `responsividade`, propor correção futura e documentar achado no relatório de auditoria.
07952. [REVISÃO_TOTAL] Na área `acessibilidade`, propor correção futura e documentar achado no relatório de auditoria.
07953. [REVISÃO_TOTAL] Na área `segurança`, propor correção futura e documentar achado no relatório de auditoria.
07954. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor correção futura e documentar achado no relatório de auditoria.
07955. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor correção futura e documentar achado no relatório de auditoria.
07956. [REVISÃO_TOTAL] Na área `front-end`, propor teste manual e documentar achado no relatório de auditoria.
07957. [REVISÃO_TOTAL] Na área `back-end`, propor teste manual e documentar achado no relatório de auditoria.
07958. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste manual e documentar achado no relatório de auditoria.
07959. [REVISÃO_TOTAL] Na área `API`, propor teste manual e documentar achado no relatório de auditoria.
07960. [REVISÃO_TOTAL] Na área `autenticação`, propor teste manual e documentar achado no relatório de auditoria.
07961. [REVISÃO_TOTAL] Na área `autorização`, propor teste manual e documentar achado no relatório de auditoria.
07962. [REVISÃO_TOTAL] Na área `produtos`, propor teste manual e documentar achado no relatório de auditoria.
07963. [REVISÃO_TOTAL] Na área `pedidos`, propor teste manual e documentar achado no relatório de auditoria.
07964. [REVISÃO_TOTAL] Na área `encomendas`, propor teste manual e documentar achado no relatório de auditoria.
07965. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste manual e documentar achado no relatório de auditoria.
07966. [REVISÃO_TOTAL] Na área `logística`, propor teste manual e documentar achado no relatório de auditoria.
07967. [REVISÃO_TOTAL] Na área `suporte`, propor teste manual e documentar achado no relatório de auditoria.
07968. [REVISÃO_TOTAL] Na área `notificações`, propor teste manual e documentar achado no relatório de auditoria.
07969. [REVISÃO_TOTAL] Na área `header`, propor teste manual e documentar achado no relatório de auditoria.
07970. [REVISÃO_TOTAL] Na área `footer`, propor teste manual e documentar achado no relatório de auditoria.
07971. [REVISÃO_TOTAL] Na área `sidebar`, propor teste manual e documentar achado no relatório de auditoria.
07972. [REVISÃO_TOTAL] Na área `dashboard`, propor teste manual e documentar achado no relatório de auditoria.
07973. [REVISÃO_TOTAL] Na área `perfil`, propor teste manual e documentar achado no relatório de auditoria.
07974. [REVISÃO_TOTAL] Na área `uploads`, propor teste manual e documentar achado no relatório de auditoria.
07975. [REVISÃO_TOTAL] Na área `imagens`, propor teste manual e documentar achado no relatório de auditoria.
07976. [REVISÃO_TOTAL] Na área `filtros`, propor teste manual e documentar achado no relatório de auditoria.
07977. [REVISÃO_TOTAL] Na área `paginação`, propor teste manual e documentar achado no relatório de auditoria.
07978. [REVISÃO_TOTAL] Na área `modais`, propor teste manual e documentar achado no relatório de auditoria.
07979. [REVISÃO_TOTAL] Na área `tabelas`, propor teste manual e documentar achado no relatório de auditoria.
07980. [REVISÃO_TOTAL] Na área `cards`, propor teste manual e documentar achado no relatório de auditoria.
07981. [REVISÃO_TOTAL] Na área `responsividade`, propor teste manual e documentar achado no relatório de auditoria.
07982. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste manual e documentar achado no relatório de auditoria.
07983. [REVISÃO_TOTAL] Na área `segurança`, propor teste manual e documentar achado no relatório de auditoria.
07984. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste manual e documentar achado no relatório de auditoria.
07985. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste manual e documentar achado no relatório de auditoria.
07986. [REVISÃO_TOTAL] Na área `front-end`, propor teste automatizado e documentar achado no relatório de auditoria.
07987. [REVISÃO_TOTAL] Na área `back-end`, propor teste automatizado e documentar achado no relatório de auditoria.
07988. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste automatizado e documentar achado no relatório de auditoria.
07989. [REVISÃO_TOTAL] Na área `API`, propor teste automatizado e documentar achado no relatório de auditoria.
07990. [REVISÃO_TOTAL] Na área `autenticação`, propor teste automatizado e documentar achado no relatório de auditoria.
07991. [REVISÃO_TOTAL] Na área `autorização`, propor teste automatizado e documentar achado no relatório de auditoria.
07992. [REVISÃO_TOTAL] Na área `produtos`, propor teste automatizado e documentar achado no relatório de auditoria.
07993. [REVISÃO_TOTAL] Na área `pedidos`, propor teste automatizado e documentar achado no relatório de auditoria.
07994. [REVISÃO_TOTAL] Na área `encomendas`, propor teste automatizado e documentar achado no relatório de auditoria.
07995. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste automatizado e documentar achado no relatório de auditoria.
07996. [REVISÃO_TOTAL] Na área `logística`, propor teste automatizado e documentar achado no relatório de auditoria.
07997. [REVISÃO_TOTAL] Na área `suporte`, propor teste automatizado e documentar achado no relatório de auditoria.
07998. [REVISÃO_TOTAL] Na área `notificações`, propor teste automatizado e documentar achado no relatório de auditoria.
07999. [REVISÃO_TOTAL] Na área `header`, propor teste automatizado e documentar achado no relatório de auditoria.
08000. [REVISÃO_TOTAL] Na área `footer`, propor teste automatizado e documentar achado no relatório de auditoria.
08001. [REVISÃO_TOTAL] Na área `sidebar`, propor teste automatizado e documentar achado no relatório de auditoria.
08002. [REVISÃO_TOTAL] Na área `dashboard`, propor teste automatizado e documentar achado no relatório de auditoria.
08003. [REVISÃO_TOTAL] Na área `perfil`, propor teste automatizado e documentar achado no relatório de auditoria.
08004. [REVISÃO_TOTAL] Na área `uploads`, propor teste automatizado e documentar achado no relatório de auditoria.
08005. [REVISÃO_TOTAL] Na área `imagens`, propor teste automatizado e documentar achado no relatório de auditoria.
08006. [REVISÃO_TOTAL] Na área `filtros`, propor teste automatizado e documentar achado no relatório de auditoria.
08007. [REVISÃO_TOTAL] Na área `paginação`, propor teste automatizado e documentar achado no relatório de auditoria.
08008. [REVISÃO_TOTAL] Na área `modais`, propor teste automatizado e documentar achado no relatório de auditoria.
08009. [REVISÃO_TOTAL] Na área `tabelas`, propor teste automatizado e documentar achado no relatório de auditoria.
08010. [REVISÃO_TOTAL] Na área `cards`, propor teste automatizado e documentar achado no relatório de auditoria.
08011. [REVISÃO_TOTAL] Na área `responsividade`, propor teste automatizado e documentar achado no relatório de auditoria.
08012. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste automatizado e documentar achado no relatório de auditoria.
08013. [REVISÃO_TOTAL] Na área `segurança`, propor teste automatizado e documentar achado no relatório de auditoria.
08014. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste automatizado e documentar achado no relatório de auditoria.
08015. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste automatizado e documentar achado no relatório de auditoria.
08016. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08017. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08018. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08019. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08020. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08021. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08022. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08023. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08024. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08025. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08026. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08027. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08028. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08029. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08030. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08031. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08032. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08033. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08034. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08035. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08036. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08037. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08038. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08039. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08040. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08041. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08042. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08043. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08044. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08045. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08046. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08047. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08048. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08049. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08050. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08051. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08052. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08053. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08054. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08055. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08056. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08057. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08058. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08059. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08060. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08061. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08062. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08063. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08064. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08065. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08066. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08067. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08068. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08069. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08070. [REVISÃO_TOTAL] Na área `cards`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08071. [REVISÃO_TOTAL] Na área `responsividade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08072. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08073. [REVISÃO_TOTAL] Na área `segurança`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08074. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08075. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08076. [REVISÃO_TOTAL] Na área `front-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08077. [REVISÃO_TOTAL] Na área `back-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08078. [REVISÃO_TOTAL] Na área `banco de dados`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08079. [REVISÃO_TOTAL] Na área `API`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08080. [REVISÃO_TOTAL] Na área `autenticação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08081. [REVISÃO_TOTAL] Na área `autorização`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08082. [REVISÃO_TOTAL] Na área `produtos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08083. [REVISÃO_TOTAL] Na área `pedidos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08084. [REVISÃO_TOTAL] Na área `encomendas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08085. [REVISÃO_TOTAL] Na área `orçamentos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08086. [REVISÃO_TOTAL] Na área `logística`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08087. [REVISÃO_TOTAL] Na área `suporte`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08088. [REVISÃO_TOTAL] Na área `notificações`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08089. [REVISÃO_TOTAL] Na área `header`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08090. [REVISÃO_TOTAL] Na área `footer`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08091. [REVISÃO_TOTAL] Na área `sidebar`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08092. [REVISÃO_TOTAL] Na área `dashboard`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08093. [REVISÃO_TOTAL] Na área `perfil`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08094. [REVISÃO_TOTAL] Na área `uploads`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08095. [REVISÃO_TOTAL] Na área `imagens`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08096. [REVISÃO_TOTAL] Na área `filtros`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08097. [REVISÃO_TOTAL] Na área `paginação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08098. [REVISÃO_TOTAL] Na área `modais`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08099. [REVISÃO_TOTAL] Na área `tabelas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08100. [REVISÃO_TOTAL] Na área `cards`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08101. [REVISÃO_TOTAL] Na área `responsividade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08102. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08103. [REVISÃO_TOTAL] Na área `segurança`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08104. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08105. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08106. [REVISÃO_TOTAL] Na área `front-end`, mapear validações existentes e documentar achado no relatório de auditoria.
08107. [REVISÃO_TOTAL] Na área `back-end`, mapear validações existentes e documentar achado no relatório de auditoria.
08108. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações existentes e documentar achado no relatório de auditoria.
08109. [REVISÃO_TOTAL] Na área `API`, mapear validações existentes e documentar achado no relatório de auditoria.
08110. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações existentes e documentar achado no relatório de auditoria.
08111. [REVISÃO_TOTAL] Na área `autorização`, mapear validações existentes e documentar achado no relatório de auditoria.
08112. [REVISÃO_TOTAL] Na área `produtos`, mapear validações existentes e documentar achado no relatório de auditoria.
08113. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações existentes e documentar achado no relatório de auditoria.
08114. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações existentes e documentar achado no relatório de auditoria.
08115. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações existentes e documentar achado no relatório de auditoria.
08116. [REVISÃO_TOTAL] Na área `logística`, mapear validações existentes e documentar achado no relatório de auditoria.
08117. [REVISÃO_TOTAL] Na área `suporte`, mapear validações existentes e documentar achado no relatório de auditoria.
08118. [REVISÃO_TOTAL] Na área `notificações`, mapear validações existentes e documentar achado no relatório de auditoria.
08119. [REVISÃO_TOTAL] Na área `header`, mapear validações existentes e documentar achado no relatório de auditoria.
08120. [REVISÃO_TOTAL] Na área `footer`, mapear validações existentes e documentar achado no relatório de auditoria.
08121. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações existentes e documentar achado no relatório de auditoria.
08122. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações existentes e documentar achado no relatório de auditoria.
08123. [REVISÃO_TOTAL] Na área `perfil`, mapear validações existentes e documentar achado no relatório de auditoria.
08124. [REVISÃO_TOTAL] Na área `uploads`, mapear validações existentes e documentar achado no relatório de auditoria.
08125. [REVISÃO_TOTAL] Na área `imagens`, mapear validações existentes e documentar achado no relatório de auditoria.
08126. [REVISÃO_TOTAL] Na área `filtros`, mapear validações existentes e documentar achado no relatório de auditoria.
08127. [REVISÃO_TOTAL] Na área `paginação`, mapear validações existentes e documentar achado no relatório de auditoria.
08128. [REVISÃO_TOTAL] Na área `modais`, mapear validações existentes e documentar achado no relatório de auditoria.
08129. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações existentes e documentar achado no relatório de auditoria.
08130. [REVISÃO_TOTAL] Na área `cards`, mapear validações existentes e documentar achado no relatório de auditoria.
08131. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações existentes e documentar achado no relatório de auditoria.
08132. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações existentes e documentar achado no relatório de auditoria.
08133. [REVISÃO_TOTAL] Na área `segurança`, mapear validações existentes e documentar achado no relatório de auditoria.
08134. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações existentes e documentar achado no relatório de auditoria.
08135. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações existentes e documentar achado no relatório de auditoria.
08136. [REVISÃO_TOTAL] Na área `front-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
08137. [REVISÃO_TOTAL] Na área `back-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
08138. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações ausentes e documentar achado no relatório de auditoria.
08139. [REVISÃO_TOTAL] Na área `API`, mapear validações ausentes e documentar achado no relatório de auditoria.
08140. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações ausentes e documentar achado no relatório de auditoria.
08141. [REVISÃO_TOTAL] Na área `autorização`, mapear validações ausentes e documentar achado no relatório de auditoria.
08142. [REVISÃO_TOTAL] Na área `produtos`, mapear validações ausentes e documentar achado no relatório de auditoria.
08143. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações ausentes e documentar achado no relatório de auditoria.
08144. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações ausentes e documentar achado no relatório de auditoria.
08145. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações ausentes e documentar achado no relatório de auditoria.
08146. [REVISÃO_TOTAL] Na área `logística`, mapear validações ausentes e documentar achado no relatório de auditoria.
08147. [REVISÃO_TOTAL] Na área `suporte`, mapear validações ausentes e documentar achado no relatório de auditoria.
08148. [REVISÃO_TOTAL] Na área `notificações`, mapear validações ausentes e documentar achado no relatório de auditoria.
08149. [REVISÃO_TOTAL] Na área `header`, mapear validações ausentes e documentar achado no relatório de auditoria.
08150. [REVISÃO_TOTAL] Na área `footer`, mapear validações ausentes e documentar achado no relatório de auditoria.
08151. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações ausentes e documentar achado no relatório de auditoria.
08152. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações ausentes e documentar achado no relatório de auditoria.
08153. [REVISÃO_TOTAL] Na área `perfil`, mapear validações ausentes e documentar achado no relatório de auditoria.
08154. [REVISÃO_TOTAL] Na área `uploads`, mapear validações ausentes e documentar achado no relatório de auditoria.
08155. [REVISÃO_TOTAL] Na área `imagens`, mapear validações ausentes e documentar achado no relatório de auditoria.
08156. [REVISÃO_TOTAL] Na área `filtros`, mapear validações ausentes e documentar achado no relatório de auditoria.
08157. [REVISÃO_TOTAL] Na área `paginação`, mapear validações ausentes e documentar achado no relatório de auditoria.
08158. [REVISÃO_TOTAL] Na área `modais`, mapear validações ausentes e documentar achado no relatório de auditoria.
08159. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações ausentes e documentar achado no relatório de auditoria.
08160. [REVISÃO_TOTAL] Na área `cards`, mapear validações ausentes e documentar achado no relatório de auditoria.
08161. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações ausentes e documentar achado no relatório de auditoria.
08162. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações ausentes e documentar achado no relatório de auditoria.
08163. [REVISÃO_TOTAL] Na área `segurança`, mapear validações ausentes e documentar achado no relatório de auditoria.
08164. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações ausentes e documentar achado no relatório de auditoria.
08165. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações ausentes e documentar achado no relatório de auditoria.
08166. [REVISÃO_TOTAL] Na área `front-end`, mapear dependências e documentar achado no relatório de auditoria.
08167. [REVISÃO_TOTAL] Na área `back-end`, mapear dependências e documentar achado no relatório de auditoria.
08168. [REVISÃO_TOTAL] Na área `banco de dados`, mapear dependências e documentar achado no relatório de auditoria.
08169. [REVISÃO_TOTAL] Na área `API`, mapear dependências e documentar achado no relatório de auditoria.
08170. [REVISÃO_TOTAL] Na área `autenticação`, mapear dependências e documentar achado no relatório de auditoria.
08171. [REVISÃO_TOTAL] Na área `autorização`, mapear dependências e documentar achado no relatório de auditoria.
08172. [REVISÃO_TOTAL] Na área `produtos`, mapear dependências e documentar achado no relatório de auditoria.
08173. [REVISÃO_TOTAL] Na área `pedidos`, mapear dependências e documentar achado no relatório de auditoria.
08174. [REVISÃO_TOTAL] Na área `encomendas`, mapear dependências e documentar achado no relatório de auditoria.
08175. [REVISÃO_TOTAL] Na área `orçamentos`, mapear dependências e documentar achado no relatório de auditoria.
08176. [REVISÃO_TOTAL] Na área `logística`, mapear dependências e documentar achado no relatório de auditoria.
08177. [REVISÃO_TOTAL] Na área `suporte`, mapear dependências e documentar achado no relatório de auditoria.
08178. [REVISÃO_TOTAL] Na área `notificações`, mapear dependências e documentar achado no relatório de auditoria.
08179. [REVISÃO_TOTAL] Na área `header`, mapear dependências e documentar achado no relatório de auditoria.
08180. [REVISÃO_TOTAL] Na área `footer`, mapear dependências e documentar achado no relatório de auditoria.
08181. [REVISÃO_TOTAL] Na área `sidebar`, mapear dependências e documentar achado no relatório de auditoria.
08182. [REVISÃO_TOTAL] Na área `dashboard`, mapear dependências e documentar achado no relatório de auditoria.
08183. [REVISÃO_TOTAL] Na área `perfil`, mapear dependências e documentar achado no relatório de auditoria.
08184. [REVISÃO_TOTAL] Na área `uploads`, mapear dependências e documentar achado no relatório de auditoria.
08185. [REVISÃO_TOTAL] Na área `imagens`, mapear dependências e documentar achado no relatório de auditoria.
08186. [REVISÃO_TOTAL] Na área `filtros`, mapear dependências e documentar achado no relatório de auditoria.
08187. [REVISÃO_TOTAL] Na área `paginação`, mapear dependências e documentar achado no relatório de auditoria.
08188. [REVISÃO_TOTAL] Na área `modais`, mapear dependências e documentar achado no relatório de auditoria.
08189. [REVISÃO_TOTAL] Na área `tabelas`, mapear dependências e documentar achado no relatório de auditoria.
08190. [REVISÃO_TOTAL] Na área `cards`, mapear dependências e documentar achado no relatório de auditoria.
08191. [REVISÃO_TOTAL] Na área `responsividade`, mapear dependências e documentar achado no relatório de auditoria.
08192. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear dependências e documentar achado no relatório de auditoria.
08193. [REVISÃO_TOTAL] Na área `segurança`, mapear dependências e documentar achado no relatório de auditoria.
08194. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear dependências e documentar achado no relatório de auditoria.
08195. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear dependências e documentar achado no relatório de auditoria.
08196. [REVISÃO_TOTAL] Na área `front-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
08197. [REVISÃO_TOTAL] Na área `back-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
08198. [REVISÃO_TOTAL] Na área `banco de dados`, mapear risco de regressão e documentar achado no relatório de auditoria.
08199. [REVISÃO_TOTAL] Na área `API`, mapear risco de regressão e documentar achado no relatório de auditoria.
08200. [REVISÃO_TOTAL] Na área `autenticação`, mapear risco de regressão e documentar achado no relatório de auditoria.
08201. [REVISÃO_TOTAL] Na área `autorização`, mapear risco de regressão e documentar achado no relatório de auditoria.
08202. [REVISÃO_TOTAL] Na área `produtos`, mapear risco de regressão e documentar achado no relatório de auditoria.
08203. [REVISÃO_TOTAL] Na área `pedidos`, mapear risco de regressão e documentar achado no relatório de auditoria.
08204. [REVISÃO_TOTAL] Na área `encomendas`, mapear risco de regressão e documentar achado no relatório de auditoria.
08205. [REVISÃO_TOTAL] Na área `orçamentos`, mapear risco de regressão e documentar achado no relatório de auditoria.
08206. [REVISÃO_TOTAL] Na área `logística`, mapear risco de regressão e documentar achado no relatório de auditoria.
08207. [REVISÃO_TOTAL] Na área `suporte`, mapear risco de regressão e documentar achado no relatório de auditoria.
08208. [REVISÃO_TOTAL] Na área `notificações`, mapear risco de regressão e documentar achado no relatório de auditoria.
08209. [REVISÃO_TOTAL] Na área `header`, mapear risco de regressão e documentar achado no relatório de auditoria.
08210. [REVISÃO_TOTAL] Na área `footer`, mapear risco de regressão e documentar achado no relatório de auditoria.
08211. [REVISÃO_TOTAL] Na área `sidebar`, mapear risco de regressão e documentar achado no relatório de auditoria.
08212. [REVISÃO_TOTAL] Na área `dashboard`, mapear risco de regressão e documentar achado no relatório de auditoria.
08213. [REVISÃO_TOTAL] Na área `perfil`, mapear risco de regressão e documentar achado no relatório de auditoria.
08214. [REVISÃO_TOTAL] Na área `uploads`, mapear risco de regressão e documentar achado no relatório de auditoria.
08215. [REVISÃO_TOTAL] Na área `imagens`, mapear risco de regressão e documentar achado no relatório de auditoria.
08216. [REVISÃO_TOTAL] Na área `filtros`, mapear risco de regressão e documentar achado no relatório de auditoria.
08217. [REVISÃO_TOTAL] Na área `paginação`, mapear risco de regressão e documentar achado no relatório de auditoria.
08218. [REVISÃO_TOTAL] Na área `modais`, mapear risco de regressão e documentar achado no relatório de auditoria.
08219. [REVISÃO_TOTAL] Na área `tabelas`, mapear risco de regressão e documentar achado no relatório de auditoria.
08220. [REVISÃO_TOTAL] Na área `cards`, mapear risco de regressão e documentar achado no relatório de auditoria.
08221. [REVISÃO_TOTAL] Na área `responsividade`, mapear risco de regressão e documentar achado no relatório de auditoria.
08222. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear risco de regressão e documentar achado no relatório de auditoria.
08223. [REVISÃO_TOTAL] Na área `segurança`, mapear risco de regressão e documentar achado no relatório de auditoria.
08224. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear risco de regressão e documentar achado no relatório de auditoria.
08225. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear risco de regressão e documentar achado no relatório de auditoria.
08226. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08227. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08228. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08229. [REVISÃO_TOTAL] Na área `API`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08230. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08231. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08232. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08233. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08234. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08235. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08236. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08237. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08238. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08239. [REVISÃO_TOTAL] Na área `header`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08240. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08241. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08242. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08243. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08244. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08245. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08246. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08247. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08248. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08249. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08250. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08251. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08252. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08253. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08254. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08255. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08256. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08257. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08258. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08259. [REVISÃO_TOTAL] Na área `API`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08260. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08261. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08262. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08263. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08264. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08265. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08266. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08267. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08268. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08269. [REVISÃO_TOTAL] Na área `header`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08270. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08271. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08272. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08273. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08274. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08275. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08276. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08277. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08278. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08279. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08280. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08281. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08282. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08283. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08284. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08285. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
08286. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
08287. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
08288. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em admin e documentar achado no relatório de auditoria.
08289. [REVISÃO_TOTAL] Na área `API`, mapear impacto em admin e documentar achado no relatório de auditoria.
08290. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em admin e documentar achado no relatório de auditoria.
08291. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em admin e documentar achado no relatório de auditoria.
08292. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em admin e documentar achado no relatório de auditoria.
08293. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em admin e documentar achado no relatório de auditoria.
08294. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em admin e documentar achado no relatório de auditoria.
08295. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em admin e documentar achado no relatório de auditoria.
08296. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em admin e documentar achado no relatório de auditoria.
08297. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em admin e documentar achado no relatório de auditoria.
08298. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em admin e documentar achado no relatório de auditoria.
08299. [REVISÃO_TOTAL] Na área `header`, mapear impacto em admin e documentar achado no relatório de auditoria.
08300. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em admin e documentar achado no relatório de auditoria.
08301. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em admin e documentar achado no relatório de auditoria.
08302. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em admin e documentar achado no relatório de auditoria.
08303. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em admin e documentar achado no relatório de auditoria.
08304. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em admin e documentar achado no relatório de auditoria.
08305. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em admin e documentar achado no relatório de auditoria.
08306. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em admin e documentar achado no relatório de auditoria.
08307. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em admin e documentar achado no relatório de auditoria.
08308. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em admin e documentar achado no relatório de auditoria.
08309. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em admin e documentar achado no relatório de auditoria.
08310. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em admin e documentar achado no relatório de auditoria.
08311. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em admin e documentar achado no relatório de auditoria.
08312. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em admin e documentar achado no relatório de auditoria.
08313. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em admin e documentar achado no relatório de auditoria.
08314. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em admin e documentar achado no relatório de auditoria.
08315. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em admin e documentar achado no relatório de auditoria.
08316. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08317. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08318. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08319. [REVISÃO_TOTAL] Na área `API`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08320. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08321. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08322. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08323. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08324. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08325. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08326. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08327. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08328. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08329. [REVISÃO_TOTAL] Na área `header`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08330. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08331. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08332. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08333. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08334. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08335. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08336. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08337. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08338. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08339. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08340. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08341. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08342. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08343. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08344. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08345. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de nomes e documentar achado no relatório de auditoria.
08346. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de status e documentar achado no relatório de auditoria.
08347. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de status e documentar achado no relatório de auditoria.
08348. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de status e documentar achado no relatório de auditoria.
08349. [REVISÃO_TOTAL] Na área `API`, verificar consistência de status e documentar achado no relatório de auditoria.
08350. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de status e documentar achado no relatório de auditoria.
08351. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de status e documentar achado no relatório de auditoria.
08352. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de status e documentar achado no relatório de auditoria.
08353. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de status e documentar achado no relatório de auditoria.
08354. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de status e documentar achado no relatório de auditoria.
08355. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de status e documentar achado no relatório de auditoria.
08356. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de status e documentar achado no relatório de auditoria.
08357. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de status e documentar achado no relatório de auditoria.
08358. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de status e documentar achado no relatório de auditoria.
08359. [REVISÃO_TOTAL] Na área `header`, verificar consistência de status e documentar achado no relatório de auditoria.
08360. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de status e documentar achado no relatório de auditoria.
08361. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de status e documentar achado no relatório de auditoria.
08362. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de status e documentar achado no relatório de auditoria.
08363. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de status e documentar achado no relatório de auditoria.
08364. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de status e documentar achado no relatório de auditoria.
08365. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de status e documentar achado no relatório de auditoria.
08366. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de status e documentar achado no relatório de auditoria.
08367. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de status e documentar achado no relatório de auditoria.
08368. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de status e documentar achado no relatório de auditoria.
08369. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de status e documentar achado no relatório de auditoria.
08370. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de status e documentar achado no relatório de auditoria.
08371. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de status e documentar achado no relatório de auditoria.
08372. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de status e documentar achado no relatório de auditoria.
08373. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de status e documentar achado no relatório de auditoria.
08374. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de status e documentar achado no relatório de auditoria.
08375. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de status e documentar achado no relatório de auditoria.
08376. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
08377. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
08378. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de ids e documentar achado no relatório de auditoria.
08379. [REVISÃO_TOTAL] Na área `API`, verificar consistência de ids e documentar achado no relatório de auditoria.
08380. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de ids e documentar achado no relatório de auditoria.
08381. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de ids e documentar achado no relatório de auditoria.
08382. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de ids e documentar achado no relatório de auditoria.
08383. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de ids e documentar achado no relatório de auditoria.
08384. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de ids e documentar achado no relatório de auditoria.
08385. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de ids e documentar achado no relatório de auditoria.
08386. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de ids e documentar achado no relatório de auditoria.
08387. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de ids e documentar achado no relatório de auditoria.
08388. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de ids e documentar achado no relatório de auditoria.
08389. [REVISÃO_TOTAL] Na área `header`, verificar consistência de ids e documentar achado no relatório de auditoria.
08390. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de ids e documentar achado no relatório de auditoria.
08391. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de ids e documentar achado no relatório de auditoria.
08392. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de ids e documentar achado no relatório de auditoria.
08393. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de ids e documentar achado no relatório de auditoria.
08394. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de ids e documentar achado no relatório de auditoria.
08395. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de ids e documentar achado no relatório de auditoria.
08396. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de ids e documentar achado no relatório de auditoria.
08397. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de ids e documentar achado no relatório de auditoria.
08398. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de ids e documentar achado no relatório de auditoria.
08399. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de ids e documentar achado no relatório de auditoria.
08400. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de ids e documentar achado no relatório de auditoria.
08401. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de ids e documentar achado no relatório de auditoria.
08402. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de ids e documentar achado no relatório de auditoria.
08403. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de ids e documentar achado no relatório de auditoria.
08404. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de ids e documentar achado no relatório de auditoria.
08405. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de ids e documentar achado no relatório de auditoria.
08406. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
08407. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
08408. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de datas e documentar achado no relatório de auditoria.
08409. [REVISÃO_TOTAL] Na área `API`, verificar consistência de datas e documentar achado no relatório de auditoria.
08410. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de datas e documentar achado no relatório de auditoria.
08411. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de datas e documentar achado no relatório de auditoria.
08412. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de datas e documentar achado no relatório de auditoria.
08413. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de datas e documentar achado no relatório de auditoria.
08414. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de datas e documentar achado no relatório de auditoria.
08415. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de datas e documentar achado no relatório de auditoria.
08416. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de datas e documentar achado no relatório de auditoria.
08417. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de datas e documentar achado no relatório de auditoria.
08418. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de datas e documentar achado no relatório de auditoria.
08419. [REVISÃO_TOTAL] Na área `header`, verificar consistência de datas e documentar achado no relatório de auditoria.
08420. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de datas e documentar achado no relatório de auditoria.
08421. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de datas e documentar achado no relatório de auditoria.
08422. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de datas e documentar achado no relatório de auditoria.
08423. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de datas e documentar achado no relatório de auditoria.
08424. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de datas e documentar achado no relatório de auditoria.
08425. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de datas e documentar achado no relatório de auditoria.
08426. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de datas e documentar achado no relatório de auditoria.
08427. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de datas e documentar achado no relatório de auditoria.
08428. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de datas e documentar achado no relatório de auditoria.
08429. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de datas e documentar achado no relatório de auditoria.
08430. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de datas e documentar achado no relatório de auditoria.
08431. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de datas e documentar achado no relatório de auditoria.
08432. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de datas e documentar achado no relatório de auditoria.
08433. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de datas e documentar achado no relatório de auditoria.
08434. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de datas e documentar achado no relatório de auditoria.
08435. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de datas e documentar achado no relatório de auditoria.
08436. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08437. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08438. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08439. [REVISÃO_TOTAL] Na área `API`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08440. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08441. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08442. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08443. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08444. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08445. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08446. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08447. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08448. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08449. [REVISÃO_TOTAL] Na área `header`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08450. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08451. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08452. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08453. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08454. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08455. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08456. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08457. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08458. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08459. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08460. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08461. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08462. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08463. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08464. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08465. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de imagens e documentar achado no relatório de auditoria.
08466. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08467. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08468. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08469. [REVISÃO_TOTAL] Na área `API`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08470. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08471. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08472. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08473. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08474. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08475. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08476. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08477. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08478. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08479. [REVISÃO_TOTAL] Na área `header`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08480. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08481. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08482. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08483. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08484. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08485. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08486. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08487. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08488. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08489. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08490. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08491. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08492. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08493. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08494. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08495. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de permissões e documentar achado no relatório de auditoria.
08496. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência visual e documentar achado no relatório de auditoria.
08497. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência visual e documentar achado no relatório de auditoria.
08498. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência visual e documentar achado no relatório de auditoria.
08499. [REVISÃO_TOTAL] Na área `API`, verificar consistência visual e documentar achado no relatório de auditoria.
08500. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência visual e documentar achado no relatório de auditoria.
08501. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência visual e documentar achado no relatório de auditoria.
08502. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência visual e documentar achado no relatório de auditoria.
08503. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência visual e documentar achado no relatório de auditoria.
08504. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência visual e documentar achado no relatório de auditoria.
08505. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência visual e documentar achado no relatório de auditoria.
08506. [REVISÃO_TOTAL] Na área `logística`, verificar consistência visual e documentar achado no relatório de auditoria.
08507. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência visual e documentar achado no relatório de auditoria.
08508. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência visual e documentar achado no relatório de auditoria.
08509. [REVISÃO_TOTAL] Na área `header`, verificar consistência visual e documentar achado no relatório de auditoria.
08510. [REVISÃO_TOTAL] Na área `footer`, verificar consistência visual e documentar achado no relatório de auditoria.
08511. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência visual e documentar achado no relatório de auditoria.
08512. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência visual e documentar achado no relatório de auditoria.
08513. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência visual e documentar achado no relatório de auditoria.
08514. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência visual e documentar achado no relatório de auditoria.
08515. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência visual e documentar achado no relatório de auditoria.
08516. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência visual e documentar achado no relatório de auditoria.
08517. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência visual e documentar achado no relatório de auditoria.
08518. [REVISÃO_TOTAL] Na área `modais`, verificar consistência visual e documentar achado no relatório de auditoria.
08519. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência visual e documentar achado no relatório de auditoria.
08520. [REVISÃO_TOTAL] Na área `cards`, verificar consistência visual e documentar achado no relatório de auditoria.
08521. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência visual e documentar achado no relatório de auditoria.
08522. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência visual e documentar achado no relatório de auditoria.
08523. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência visual e documentar achado no relatório de auditoria.
08524. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência visual e documentar achado no relatório de auditoria.
08525. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência visual e documentar achado no relatório de auditoria.
08526. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
08527. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
08528. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de erros e documentar achado no relatório de auditoria.
08529. [REVISÃO_TOTAL] Na área `API`, verificar consistência de erros e documentar achado no relatório de auditoria.
08530. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de erros e documentar achado no relatório de auditoria.
08531. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de erros e documentar achado no relatório de auditoria.
08532. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de erros e documentar achado no relatório de auditoria.
08533. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de erros e documentar achado no relatório de auditoria.
08534. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de erros e documentar achado no relatório de auditoria.
08535. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de erros e documentar achado no relatório de auditoria.
08536. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de erros e documentar achado no relatório de auditoria.
08537. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de erros e documentar achado no relatório de auditoria.
08538. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de erros e documentar achado no relatório de auditoria.
08539. [REVISÃO_TOTAL] Na área `header`, verificar consistência de erros e documentar achado no relatório de auditoria.
08540. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de erros e documentar achado no relatório de auditoria.
08541. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de erros e documentar achado no relatório de auditoria.
08542. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de erros e documentar achado no relatório de auditoria.
08543. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de erros e documentar achado no relatório de auditoria.
08544. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de erros e documentar achado no relatório de auditoria.
08545. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de erros e documentar achado no relatório de auditoria.
08546. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de erros e documentar achado no relatório de auditoria.
08547. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de erros e documentar achado no relatório de auditoria.
08548. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de erros e documentar achado no relatório de auditoria.
08549. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de erros e documentar achado no relatório de auditoria.
08550. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de erros e documentar achado no relatório de auditoria.
08551. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de erros e documentar achado no relatório de auditoria.
08552. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de erros e documentar achado no relatório de auditoria.
08553. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de erros e documentar achado no relatório de auditoria.
08554. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de erros e documentar achado no relatório de auditoria.
08555. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de erros e documentar achado no relatório de auditoria.
08556. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
08557. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
08558. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário feliz e documentar achado no relatório de auditoria.
08559. [REVISÃO_TOTAL] Na área `API`, verificar cenário feliz e documentar achado no relatório de auditoria.
08560. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário feliz e documentar achado no relatório de auditoria.
08561. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário feliz e documentar achado no relatório de auditoria.
08562. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário feliz e documentar achado no relatório de auditoria.
08563. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário feliz e documentar achado no relatório de auditoria.
08564. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário feliz e documentar achado no relatório de auditoria.
08565. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário feliz e documentar achado no relatório de auditoria.
08566. [REVISÃO_TOTAL] Na área `logística`, verificar cenário feliz e documentar achado no relatório de auditoria.
08567. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário feliz e documentar achado no relatório de auditoria.
08568. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário feliz e documentar achado no relatório de auditoria.
08569. [REVISÃO_TOTAL] Na área `header`, verificar cenário feliz e documentar achado no relatório de auditoria.
08570. [REVISÃO_TOTAL] Na área `footer`, verificar cenário feliz e documentar achado no relatório de auditoria.
08571. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário feliz e documentar achado no relatório de auditoria.
08572. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário feliz e documentar achado no relatório de auditoria.
08573. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário feliz e documentar achado no relatório de auditoria.
08574. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário feliz e documentar achado no relatório de auditoria.
08575. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário feliz e documentar achado no relatório de auditoria.
08576. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário feliz e documentar achado no relatório de auditoria.
08577. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário feliz e documentar achado no relatório de auditoria.
08578. [REVISÃO_TOTAL] Na área `modais`, verificar cenário feliz e documentar achado no relatório de auditoria.
08579. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário feliz e documentar achado no relatório de auditoria.
08580. [REVISÃO_TOTAL] Na área `cards`, verificar cenário feliz e documentar achado no relatório de auditoria.
08581. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário feliz e documentar achado no relatório de auditoria.
08582. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário feliz e documentar achado no relatório de auditoria.
08583. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário feliz e documentar achado no relatório de auditoria.
08584. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário feliz e documentar achado no relatório de auditoria.
08585. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário feliz e documentar achado no relatório de auditoria.
08586. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
08587. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
08588. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário extremo e documentar achado no relatório de auditoria.
08589. [REVISÃO_TOTAL] Na área `API`, verificar cenário extremo e documentar achado no relatório de auditoria.
08590. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário extremo e documentar achado no relatório de auditoria.
08591. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário extremo e documentar achado no relatório de auditoria.
08592. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário extremo e documentar achado no relatório de auditoria.
08593. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário extremo e documentar achado no relatório de auditoria.
08594. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário extremo e documentar achado no relatório de auditoria.
08595. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário extremo e documentar achado no relatório de auditoria.
08596. [REVISÃO_TOTAL] Na área `logística`, verificar cenário extremo e documentar achado no relatório de auditoria.
08597. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário extremo e documentar achado no relatório de auditoria.
08598. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário extremo e documentar achado no relatório de auditoria.
08599. [REVISÃO_TOTAL] Na área `header`, verificar cenário extremo e documentar achado no relatório de auditoria.
08600. [REVISÃO_TOTAL] Na área `footer`, verificar cenário extremo e documentar achado no relatório de auditoria.
08601. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário extremo e documentar achado no relatório de auditoria.
08602. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário extremo e documentar achado no relatório de auditoria.
08603. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário extremo e documentar achado no relatório de auditoria.
08604. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário extremo e documentar achado no relatório de auditoria.
08605. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário extremo e documentar achado no relatório de auditoria.
08606. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário extremo e documentar achado no relatório de auditoria.
08607. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário extremo e documentar achado no relatório de auditoria.
08608. [REVISÃO_TOTAL] Na área `modais`, verificar cenário extremo e documentar achado no relatório de auditoria.
08609. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário extremo e documentar achado no relatório de auditoria.
08610. [REVISÃO_TOTAL] Na área `cards`, verificar cenário extremo e documentar achado no relatório de auditoria.
08611. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário extremo e documentar achado no relatório de auditoria.
08612. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário extremo e documentar achado no relatório de auditoria.
08613. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário extremo e documentar achado no relatório de auditoria.
08614. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário extremo e documentar achado no relatório de auditoria.
08615. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário extremo e documentar achado no relatório de auditoria.
08616. [REVISÃO_TOTAL] Na área `front-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08617. [REVISÃO_TOTAL] Na área `back-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08618. [REVISÃO_TOTAL] Na área `banco de dados`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08619. [REVISÃO_TOTAL] Na área `API`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08620. [REVISÃO_TOTAL] Na área `autenticação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08621. [REVISÃO_TOTAL] Na área `autorização`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08622. [REVISÃO_TOTAL] Na área `produtos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08623. [REVISÃO_TOTAL] Na área `pedidos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08624. [REVISÃO_TOTAL] Na área `encomendas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08625. [REVISÃO_TOTAL] Na área `orçamentos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08626. [REVISÃO_TOTAL] Na área `logística`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08627. [REVISÃO_TOTAL] Na área `suporte`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08628. [REVISÃO_TOTAL] Na área `notificações`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08629. [REVISÃO_TOTAL] Na área `header`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08630. [REVISÃO_TOTAL] Na área `footer`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08631. [REVISÃO_TOTAL] Na área `sidebar`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08632. [REVISÃO_TOTAL] Na área `dashboard`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08633. [REVISÃO_TOTAL] Na área `perfil`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08634. [REVISÃO_TOTAL] Na área `uploads`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08635. [REVISÃO_TOTAL] Na área `imagens`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08636. [REVISÃO_TOTAL] Na área `filtros`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08637. [REVISÃO_TOTAL] Na área `paginação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08638. [REVISÃO_TOTAL] Na área `modais`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08639. [REVISÃO_TOTAL] Na área `tabelas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08640. [REVISÃO_TOTAL] Na área `cards`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08641. [REVISÃO_TOTAL] Na área `responsividade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08642. [REVISÃO_TOTAL] Na área `acessibilidade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08643. [REVISÃO_TOTAL] Na área `segurança`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08644. [REVISÃO_TOTAL] Na área `tratamento de erro`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08645. [REVISÃO_TOTAL] Na área `mensagens de usuário`, registrar evidência encontrada e documentar achado no relatório de auditoria.
08646. [REVISÃO_TOTAL] Na área `front-end`, classificar severidade e documentar achado no relatório de auditoria.
08647. [REVISÃO_TOTAL] Na área `back-end`, classificar severidade e documentar achado no relatório de auditoria.
08648. [REVISÃO_TOTAL] Na área `banco de dados`, classificar severidade e documentar achado no relatório de auditoria.
08649. [REVISÃO_TOTAL] Na área `API`, classificar severidade e documentar achado no relatório de auditoria.
08650. [REVISÃO_TOTAL] Na área `autenticação`, classificar severidade e documentar achado no relatório de auditoria.
08651. [REVISÃO_TOTAL] Na área `autorização`, classificar severidade e documentar achado no relatório de auditoria.
08652. [REVISÃO_TOTAL] Na área `produtos`, classificar severidade e documentar achado no relatório de auditoria.
08653. [REVISÃO_TOTAL] Na área `pedidos`, classificar severidade e documentar achado no relatório de auditoria.
08654. [REVISÃO_TOTAL] Na área `encomendas`, classificar severidade e documentar achado no relatório de auditoria.
08655. [REVISÃO_TOTAL] Na área `orçamentos`, classificar severidade e documentar achado no relatório de auditoria.
08656. [REVISÃO_TOTAL] Na área `logística`, classificar severidade e documentar achado no relatório de auditoria.
08657. [REVISÃO_TOTAL] Na área `suporte`, classificar severidade e documentar achado no relatório de auditoria.
08658. [REVISÃO_TOTAL] Na área `notificações`, classificar severidade e documentar achado no relatório de auditoria.
08659. [REVISÃO_TOTAL] Na área `header`, classificar severidade e documentar achado no relatório de auditoria.
08660. [REVISÃO_TOTAL] Na área `footer`, classificar severidade e documentar achado no relatório de auditoria.
08661. [REVISÃO_TOTAL] Na área `sidebar`, classificar severidade e documentar achado no relatório de auditoria.
08662. [REVISÃO_TOTAL] Na área `dashboard`, classificar severidade e documentar achado no relatório de auditoria.
08663. [REVISÃO_TOTAL] Na área `perfil`, classificar severidade e documentar achado no relatório de auditoria.
08664. [REVISÃO_TOTAL] Na área `uploads`, classificar severidade e documentar achado no relatório de auditoria.
08665. [REVISÃO_TOTAL] Na área `imagens`, classificar severidade e documentar achado no relatório de auditoria.
08666. [REVISÃO_TOTAL] Na área `filtros`, classificar severidade e documentar achado no relatório de auditoria.
08667. [REVISÃO_TOTAL] Na área `paginação`, classificar severidade e documentar achado no relatório de auditoria.
08668. [REVISÃO_TOTAL] Na área `modais`, classificar severidade e documentar achado no relatório de auditoria.
08669. [REVISÃO_TOTAL] Na área `tabelas`, classificar severidade e documentar achado no relatório de auditoria.
08670. [REVISÃO_TOTAL] Na área `cards`, classificar severidade e documentar achado no relatório de auditoria.
08671. [REVISÃO_TOTAL] Na área `responsividade`, classificar severidade e documentar achado no relatório de auditoria.
08672. [REVISÃO_TOTAL] Na área `acessibilidade`, classificar severidade e documentar achado no relatório de auditoria.
08673. [REVISÃO_TOTAL] Na área `segurança`, classificar severidade e documentar achado no relatório de auditoria.
08674. [REVISÃO_TOTAL] Na área `tratamento de erro`, classificar severidade e documentar achado no relatório de auditoria.
08675. [REVISÃO_TOTAL] Na área `mensagens de usuário`, classificar severidade e documentar achado no relatório de auditoria.
08676. [REVISÃO_TOTAL] Na área `front-end`, propor correção futura e documentar achado no relatório de auditoria.
08677. [REVISÃO_TOTAL] Na área `back-end`, propor correção futura e documentar achado no relatório de auditoria.
08678. [REVISÃO_TOTAL] Na área `banco de dados`, propor correção futura e documentar achado no relatório de auditoria.
08679. [REVISÃO_TOTAL] Na área `API`, propor correção futura e documentar achado no relatório de auditoria.
08680. [REVISÃO_TOTAL] Na área `autenticação`, propor correção futura e documentar achado no relatório de auditoria.
08681. [REVISÃO_TOTAL] Na área `autorização`, propor correção futura e documentar achado no relatório de auditoria.
08682. [REVISÃO_TOTAL] Na área `produtos`, propor correção futura e documentar achado no relatório de auditoria.
08683. [REVISÃO_TOTAL] Na área `pedidos`, propor correção futura e documentar achado no relatório de auditoria.
08684. [REVISÃO_TOTAL] Na área `encomendas`, propor correção futura e documentar achado no relatório de auditoria.
08685. [REVISÃO_TOTAL] Na área `orçamentos`, propor correção futura e documentar achado no relatório de auditoria.
08686. [REVISÃO_TOTAL] Na área `logística`, propor correção futura e documentar achado no relatório de auditoria.
08687. [REVISÃO_TOTAL] Na área `suporte`, propor correção futura e documentar achado no relatório de auditoria.
08688. [REVISÃO_TOTAL] Na área `notificações`, propor correção futura e documentar achado no relatório de auditoria.
08689. [REVISÃO_TOTAL] Na área `header`, propor correção futura e documentar achado no relatório de auditoria.
08690. [REVISÃO_TOTAL] Na área `footer`, propor correção futura e documentar achado no relatório de auditoria.
08691. [REVISÃO_TOTAL] Na área `sidebar`, propor correção futura e documentar achado no relatório de auditoria.
08692. [REVISÃO_TOTAL] Na área `dashboard`, propor correção futura e documentar achado no relatório de auditoria.
08693. [REVISÃO_TOTAL] Na área `perfil`, propor correção futura e documentar achado no relatório de auditoria.
08694. [REVISÃO_TOTAL] Na área `uploads`, propor correção futura e documentar achado no relatório de auditoria.
08695. [REVISÃO_TOTAL] Na área `imagens`, propor correção futura e documentar achado no relatório de auditoria.
08696. [REVISÃO_TOTAL] Na área `filtros`, propor correção futura e documentar achado no relatório de auditoria.
08697. [REVISÃO_TOTAL] Na área `paginação`, propor correção futura e documentar achado no relatório de auditoria.
08698. [REVISÃO_TOTAL] Na área `modais`, propor correção futura e documentar achado no relatório de auditoria.
08699. [REVISÃO_TOTAL] Na área `tabelas`, propor correção futura e documentar achado no relatório de auditoria.
08700. [REVISÃO_TOTAL] Na área `cards`, propor correção futura e documentar achado no relatório de auditoria.
08701. [REVISÃO_TOTAL] Na área `responsividade`, propor correção futura e documentar achado no relatório de auditoria.
08702. [REVISÃO_TOTAL] Na área `acessibilidade`, propor correção futura e documentar achado no relatório de auditoria.
08703. [REVISÃO_TOTAL] Na área `segurança`, propor correção futura e documentar achado no relatório de auditoria.
08704. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor correção futura e documentar achado no relatório de auditoria.
08705. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor correção futura e documentar achado no relatório de auditoria.
08706. [REVISÃO_TOTAL] Na área `front-end`, propor teste manual e documentar achado no relatório de auditoria.
08707. [REVISÃO_TOTAL] Na área `back-end`, propor teste manual e documentar achado no relatório de auditoria.
08708. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste manual e documentar achado no relatório de auditoria.
08709. [REVISÃO_TOTAL] Na área `API`, propor teste manual e documentar achado no relatório de auditoria.
08710. [REVISÃO_TOTAL] Na área `autenticação`, propor teste manual e documentar achado no relatório de auditoria.
08711. [REVISÃO_TOTAL] Na área `autorização`, propor teste manual e documentar achado no relatório de auditoria.
08712. [REVISÃO_TOTAL] Na área `produtos`, propor teste manual e documentar achado no relatório de auditoria.
08713. [REVISÃO_TOTAL] Na área `pedidos`, propor teste manual e documentar achado no relatório de auditoria.
08714. [REVISÃO_TOTAL] Na área `encomendas`, propor teste manual e documentar achado no relatório de auditoria.
08715. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste manual e documentar achado no relatório de auditoria.
08716. [REVISÃO_TOTAL] Na área `logística`, propor teste manual e documentar achado no relatório de auditoria.
08717. [REVISÃO_TOTAL] Na área `suporte`, propor teste manual e documentar achado no relatório de auditoria.
08718. [REVISÃO_TOTAL] Na área `notificações`, propor teste manual e documentar achado no relatório de auditoria.
08719. [REVISÃO_TOTAL] Na área `header`, propor teste manual e documentar achado no relatório de auditoria.
08720. [REVISÃO_TOTAL] Na área `footer`, propor teste manual e documentar achado no relatório de auditoria.
08721. [REVISÃO_TOTAL] Na área `sidebar`, propor teste manual e documentar achado no relatório de auditoria.
08722. [REVISÃO_TOTAL] Na área `dashboard`, propor teste manual e documentar achado no relatório de auditoria.
08723. [REVISÃO_TOTAL] Na área `perfil`, propor teste manual e documentar achado no relatório de auditoria.
08724. [REVISÃO_TOTAL] Na área `uploads`, propor teste manual e documentar achado no relatório de auditoria.
08725. [REVISÃO_TOTAL] Na área `imagens`, propor teste manual e documentar achado no relatório de auditoria.
08726. [REVISÃO_TOTAL] Na área `filtros`, propor teste manual e documentar achado no relatório de auditoria.
08727. [REVISÃO_TOTAL] Na área `paginação`, propor teste manual e documentar achado no relatório de auditoria.
08728. [REVISÃO_TOTAL] Na área `modais`, propor teste manual e documentar achado no relatório de auditoria.
08729. [REVISÃO_TOTAL] Na área `tabelas`, propor teste manual e documentar achado no relatório de auditoria.
08730. [REVISÃO_TOTAL] Na área `cards`, propor teste manual e documentar achado no relatório de auditoria.
08731. [REVISÃO_TOTAL] Na área `responsividade`, propor teste manual e documentar achado no relatório de auditoria.
08732. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste manual e documentar achado no relatório de auditoria.
08733. [REVISÃO_TOTAL] Na área `segurança`, propor teste manual e documentar achado no relatório de auditoria.
08734. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste manual e documentar achado no relatório de auditoria.
08735. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste manual e documentar achado no relatório de auditoria.
08736. [REVISÃO_TOTAL] Na área `front-end`, propor teste automatizado e documentar achado no relatório de auditoria.
08737. [REVISÃO_TOTAL] Na área `back-end`, propor teste automatizado e documentar achado no relatório de auditoria.
08738. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste automatizado e documentar achado no relatório de auditoria.
08739. [REVISÃO_TOTAL] Na área `API`, propor teste automatizado e documentar achado no relatório de auditoria.
08740. [REVISÃO_TOTAL] Na área `autenticação`, propor teste automatizado e documentar achado no relatório de auditoria.
08741. [REVISÃO_TOTAL] Na área `autorização`, propor teste automatizado e documentar achado no relatório de auditoria.
08742. [REVISÃO_TOTAL] Na área `produtos`, propor teste automatizado e documentar achado no relatório de auditoria.
08743. [REVISÃO_TOTAL] Na área `pedidos`, propor teste automatizado e documentar achado no relatório de auditoria.
08744. [REVISÃO_TOTAL] Na área `encomendas`, propor teste automatizado e documentar achado no relatório de auditoria.
08745. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste automatizado e documentar achado no relatório de auditoria.
08746. [REVISÃO_TOTAL] Na área `logística`, propor teste automatizado e documentar achado no relatório de auditoria.
08747. [REVISÃO_TOTAL] Na área `suporte`, propor teste automatizado e documentar achado no relatório de auditoria.
08748. [REVISÃO_TOTAL] Na área `notificações`, propor teste automatizado e documentar achado no relatório de auditoria.
08749. [REVISÃO_TOTAL] Na área `header`, propor teste automatizado e documentar achado no relatório de auditoria.
08750. [REVISÃO_TOTAL] Na área `footer`, propor teste automatizado e documentar achado no relatório de auditoria.
08751. [REVISÃO_TOTAL] Na área `sidebar`, propor teste automatizado e documentar achado no relatório de auditoria.
08752. [REVISÃO_TOTAL] Na área `dashboard`, propor teste automatizado e documentar achado no relatório de auditoria.
08753. [REVISÃO_TOTAL] Na área `perfil`, propor teste automatizado e documentar achado no relatório de auditoria.
08754. [REVISÃO_TOTAL] Na área `uploads`, propor teste automatizado e documentar achado no relatório de auditoria.
08755. [REVISÃO_TOTAL] Na área `imagens`, propor teste automatizado e documentar achado no relatório de auditoria.
08756. [REVISÃO_TOTAL] Na área `filtros`, propor teste automatizado e documentar achado no relatório de auditoria.
08757. [REVISÃO_TOTAL] Na área `paginação`, propor teste automatizado e documentar achado no relatório de auditoria.
08758. [REVISÃO_TOTAL] Na área `modais`, propor teste automatizado e documentar achado no relatório de auditoria.
08759. [REVISÃO_TOTAL] Na área `tabelas`, propor teste automatizado e documentar achado no relatório de auditoria.
08760. [REVISÃO_TOTAL] Na área `cards`, propor teste automatizado e documentar achado no relatório de auditoria.
08761. [REVISÃO_TOTAL] Na área `responsividade`, propor teste automatizado e documentar achado no relatório de auditoria.
08762. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste automatizado e documentar achado no relatório de auditoria.
08763. [REVISÃO_TOTAL] Na área `segurança`, propor teste automatizado e documentar achado no relatório de auditoria.
08764. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste automatizado e documentar achado no relatório de auditoria.
08765. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste automatizado e documentar achado no relatório de auditoria.
08766. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08767. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08768. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08769. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08770. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08771. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08772. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08773. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08774. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08775. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08776. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08777. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08778. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08779. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08780. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08781. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08782. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08783. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08784. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08785. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08786. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08787. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08788. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08789. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08790. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08791. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08792. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08793. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08794. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08795. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
08796. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08797. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08798. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08799. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08800. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08801. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08802. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08803. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08804. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08805. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08806. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08807. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08808. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08809. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08810. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08811. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08812. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08813. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08814. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08815. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08816. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08817. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08818. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08819. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08820. [REVISÃO_TOTAL] Na área `cards`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08821. [REVISÃO_TOTAL] Na área `responsividade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08822. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08823. [REVISÃO_TOTAL] Na área `segurança`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08824. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08825. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear fluxo de dados e documentar achado no relatório de auditoria.
08826. [REVISÃO_TOTAL] Na área `front-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08827. [REVISÃO_TOTAL] Na área `back-end`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08828. [REVISÃO_TOTAL] Na área `banco de dados`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08829. [REVISÃO_TOTAL] Na área `API`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08830. [REVISÃO_TOTAL] Na área `autenticação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08831. [REVISÃO_TOTAL] Na área `autorização`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08832. [REVISÃO_TOTAL] Na área `produtos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08833. [REVISÃO_TOTAL] Na área `pedidos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08834. [REVISÃO_TOTAL] Na área `encomendas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08835. [REVISÃO_TOTAL] Na área `orçamentos`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08836. [REVISÃO_TOTAL] Na área `logística`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08837. [REVISÃO_TOTAL] Na área `suporte`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08838. [REVISÃO_TOTAL] Na área `notificações`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08839. [REVISÃO_TOTAL] Na área `header`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08840. [REVISÃO_TOTAL] Na área `footer`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08841. [REVISÃO_TOTAL] Na área `sidebar`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08842. [REVISÃO_TOTAL] Na área `dashboard`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08843. [REVISÃO_TOTAL] Na área `perfil`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08844. [REVISÃO_TOTAL] Na área `uploads`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08845. [REVISÃO_TOTAL] Na área `imagens`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08846. [REVISÃO_TOTAL] Na área `filtros`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08847. [REVISÃO_TOTAL] Na área `paginação`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08848. [REVISÃO_TOTAL] Na área `modais`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08849. [REVISÃO_TOTAL] Na área `tabelas`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08850. [REVISÃO_TOTAL] Na área `cards`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08851. [REVISÃO_TOTAL] Na área `responsividade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08852. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08853. [REVISÃO_TOTAL] Na área `segurança`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08854. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08855. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear chamadas HTTP e documentar achado no relatório de auditoria.
08856. [REVISÃO_TOTAL] Na área `front-end`, mapear validações existentes e documentar achado no relatório de auditoria.
08857. [REVISÃO_TOTAL] Na área `back-end`, mapear validações existentes e documentar achado no relatório de auditoria.
08858. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações existentes e documentar achado no relatório de auditoria.
08859. [REVISÃO_TOTAL] Na área `API`, mapear validações existentes e documentar achado no relatório de auditoria.
08860. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações existentes e documentar achado no relatório de auditoria.
08861. [REVISÃO_TOTAL] Na área `autorização`, mapear validações existentes e documentar achado no relatório de auditoria.
08862. [REVISÃO_TOTAL] Na área `produtos`, mapear validações existentes e documentar achado no relatório de auditoria.
08863. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações existentes e documentar achado no relatório de auditoria.
08864. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações existentes e documentar achado no relatório de auditoria.
08865. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações existentes e documentar achado no relatório de auditoria.
08866. [REVISÃO_TOTAL] Na área `logística`, mapear validações existentes e documentar achado no relatório de auditoria.
08867. [REVISÃO_TOTAL] Na área `suporte`, mapear validações existentes e documentar achado no relatório de auditoria.
08868. [REVISÃO_TOTAL] Na área `notificações`, mapear validações existentes e documentar achado no relatório de auditoria.
08869. [REVISÃO_TOTAL] Na área `header`, mapear validações existentes e documentar achado no relatório de auditoria.
08870. [REVISÃO_TOTAL] Na área `footer`, mapear validações existentes e documentar achado no relatório de auditoria.
08871. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações existentes e documentar achado no relatório de auditoria.
08872. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações existentes e documentar achado no relatório de auditoria.
08873. [REVISÃO_TOTAL] Na área `perfil`, mapear validações existentes e documentar achado no relatório de auditoria.
08874. [REVISÃO_TOTAL] Na área `uploads`, mapear validações existentes e documentar achado no relatório de auditoria.
08875. [REVISÃO_TOTAL] Na área `imagens`, mapear validações existentes e documentar achado no relatório de auditoria.
08876. [REVISÃO_TOTAL] Na área `filtros`, mapear validações existentes e documentar achado no relatório de auditoria.
08877. [REVISÃO_TOTAL] Na área `paginação`, mapear validações existentes e documentar achado no relatório de auditoria.
08878. [REVISÃO_TOTAL] Na área `modais`, mapear validações existentes e documentar achado no relatório de auditoria.
08879. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações existentes e documentar achado no relatório de auditoria.
08880. [REVISÃO_TOTAL] Na área `cards`, mapear validações existentes e documentar achado no relatório de auditoria.
08881. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações existentes e documentar achado no relatório de auditoria.
08882. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações existentes e documentar achado no relatório de auditoria.
08883. [REVISÃO_TOTAL] Na área `segurança`, mapear validações existentes e documentar achado no relatório de auditoria.
08884. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações existentes e documentar achado no relatório de auditoria.
08885. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações existentes e documentar achado no relatório de auditoria.
08886. [REVISÃO_TOTAL] Na área `front-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
08887. [REVISÃO_TOTAL] Na área `back-end`, mapear validações ausentes e documentar achado no relatório de auditoria.
08888. [REVISÃO_TOTAL] Na área `banco de dados`, mapear validações ausentes e documentar achado no relatório de auditoria.
08889. [REVISÃO_TOTAL] Na área `API`, mapear validações ausentes e documentar achado no relatório de auditoria.
08890. [REVISÃO_TOTAL] Na área `autenticação`, mapear validações ausentes e documentar achado no relatório de auditoria.
08891. [REVISÃO_TOTAL] Na área `autorização`, mapear validações ausentes e documentar achado no relatório de auditoria.
08892. [REVISÃO_TOTAL] Na área `produtos`, mapear validações ausentes e documentar achado no relatório de auditoria.
08893. [REVISÃO_TOTAL] Na área `pedidos`, mapear validações ausentes e documentar achado no relatório de auditoria.
08894. [REVISÃO_TOTAL] Na área `encomendas`, mapear validações ausentes e documentar achado no relatório de auditoria.
08895. [REVISÃO_TOTAL] Na área `orçamentos`, mapear validações ausentes e documentar achado no relatório de auditoria.
08896. [REVISÃO_TOTAL] Na área `logística`, mapear validações ausentes e documentar achado no relatório de auditoria.
08897. [REVISÃO_TOTAL] Na área `suporte`, mapear validações ausentes e documentar achado no relatório de auditoria.
08898. [REVISÃO_TOTAL] Na área `notificações`, mapear validações ausentes e documentar achado no relatório de auditoria.
08899. [REVISÃO_TOTAL] Na área `header`, mapear validações ausentes e documentar achado no relatório de auditoria.
08900. [REVISÃO_TOTAL] Na área `footer`, mapear validações ausentes e documentar achado no relatório de auditoria.
08901. [REVISÃO_TOTAL] Na área `sidebar`, mapear validações ausentes e documentar achado no relatório de auditoria.
08902. [REVISÃO_TOTAL] Na área `dashboard`, mapear validações ausentes e documentar achado no relatório de auditoria.
08903. [REVISÃO_TOTAL] Na área `perfil`, mapear validações ausentes e documentar achado no relatório de auditoria.
08904. [REVISÃO_TOTAL] Na área `uploads`, mapear validações ausentes e documentar achado no relatório de auditoria.
08905. [REVISÃO_TOTAL] Na área `imagens`, mapear validações ausentes e documentar achado no relatório de auditoria.
08906. [REVISÃO_TOTAL] Na área `filtros`, mapear validações ausentes e documentar achado no relatório de auditoria.
08907. [REVISÃO_TOTAL] Na área `paginação`, mapear validações ausentes e documentar achado no relatório de auditoria.
08908. [REVISÃO_TOTAL] Na área `modais`, mapear validações ausentes e documentar achado no relatório de auditoria.
08909. [REVISÃO_TOTAL] Na área `tabelas`, mapear validações ausentes e documentar achado no relatório de auditoria.
08910. [REVISÃO_TOTAL] Na área `cards`, mapear validações ausentes e documentar achado no relatório de auditoria.
08911. [REVISÃO_TOTAL] Na área `responsividade`, mapear validações ausentes e documentar achado no relatório de auditoria.
08912. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear validações ausentes e documentar achado no relatório de auditoria.
08913. [REVISÃO_TOTAL] Na área `segurança`, mapear validações ausentes e documentar achado no relatório de auditoria.
08914. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear validações ausentes e documentar achado no relatório de auditoria.
08915. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear validações ausentes e documentar achado no relatório de auditoria.
08916. [REVISÃO_TOTAL] Na área `front-end`, mapear dependências e documentar achado no relatório de auditoria.
08917. [REVISÃO_TOTAL] Na área `back-end`, mapear dependências e documentar achado no relatório de auditoria.
08918. [REVISÃO_TOTAL] Na área `banco de dados`, mapear dependências e documentar achado no relatório de auditoria.
08919. [REVISÃO_TOTAL] Na área `API`, mapear dependências e documentar achado no relatório de auditoria.
08920. [REVISÃO_TOTAL] Na área `autenticação`, mapear dependências e documentar achado no relatório de auditoria.
08921. [REVISÃO_TOTAL] Na área `autorização`, mapear dependências e documentar achado no relatório de auditoria.
08922. [REVISÃO_TOTAL] Na área `produtos`, mapear dependências e documentar achado no relatório de auditoria.
08923. [REVISÃO_TOTAL] Na área `pedidos`, mapear dependências e documentar achado no relatório de auditoria.
08924. [REVISÃO_TOTAL] Na área `encomendas`, mapear dependências e documentar achado no relatório de auditoria.
08925. [REVISÃO_TOTAL] Na área `orçamentos`, mapear dependências e documentar achado no relatório de auditoria.
08926. [REVISÃO_TOTAL] Na área `logística`, mapear dependências e documentar achado no relatório de auditoria.
08927. [REVISÃO_TOTAL] Na área `suporte`, mapear dependências e documentar achado no relatório de auditoria.
08928. [REVISÃO_TOTAL] Na área `notificações`, mapear dependências e documentar achado no relatório de auditoria.
08929. [REVISÃO_TOTAL] Na área `header`, mapear dependências e documentar achado no relatório de auditoria.
08930. [REVISÃO_TOTAL] Na área `footer`, mapear dependências e documentar achado no relatório de auditoria.
08931. [REVISÃO_TOTAL] Na área `sidebar`, mapear dependências e documentar achado no relatório de auditoria.
08932. [REVISÃO_TOTAL] Na área `dashboard`, mapear dependências e documentar achado no relatório de auditoria.
08933. [REVISÃO_TOTAL] Na área `perfil`, mapear dependências e documentar achado no relatório de auditoria.
08934. [REVISÃO_TOTAL] Na área `uploads`, mapear dependências e documentar achado no relatório de auditoria.
08935. [REVISÃO_TOTAL] Na área `imagens`, mapear dependências e documentar achado no relatório de auditoria.
08936. [REVISÃO_TOTAL] Na área `filtros`, mapear dependências e documentar achado no relatório de auditoria.
08937. [REVISÃO_TOTAL] Na área `paginação`, mapear dependências e documentar achado no relatório de auditoria.
08938. [REVISÃO_TOTAL] Na área `modais`, mapear dependências e documentar achado no relatório de auditoria.
08939. [REVISÃO_TOTAL] Na área `tabelas`, mapear dependências e documentar achado no relatório de auditoria.
08940. [REVISÃO_TOTAL] Na área `cards`, mapear dependências e documentar achado no relatório de auditoria.
08941. [REVISÃO_TOTAL] Na área `responsividade`, mapear dependências e documentar achado no relatório de auditoria.
08942. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear dependências e documentar achado no relatório de auditoria.
08943. [REVISÃO_TOTAL] Na área `segurança`, mapear dependências e documentar achado no relatório de auditoria.
08944. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear dependências e documentar achado no relatório de auditoria.
08945. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear dependências e documentar achado no relatório de auditoria.
08946. [REVISÃO_TOTAL] Na área `front-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
08947. [REVISÃO_TOTAL] Na área `back-end`, mapear risco de regressão e documentar achado no relatório de auditoria.
08948. [REVISÃO_TOTAL] Na área `banco de dados`, mapear risco de regressão e documentar achado no relatório de auditoria.
08949. [REVISÃO_TOTAL] Na área `API`, mapear risco de regressão e documentar achado no relatório de auditoria.
08950. [REVISÃO_TOTAL] Na área `autenticação`, mapear risco de regressão e documentar achado no relatório de auditoria.
08951. [REVISÃO_TOTAL] Na área `autorização`, mapear risco de regressão e documentar achado no relatório de auditoria.
08952. [REVISÃO_TOTAL] Na área `produtos`, mapear risco de regressão e documentar achado no relatório de auditoria.
08953. [REVISÃO_TOTAL] Na área `pedidos`, mapear risco de regressão e documentar achado no relatório de auditoria.
08954. [REVISÃO_TOTAL] Na área `encomendas`, mapear risco de regressão e documentar achado no relatório de auditoria.
08955. [REVISÃO_TOTAL] Na área `orçamentos`, mapear risco de regressão e documentar achado no relatório de auditoria.
08956. [REVISÃO_TOTAL] Na área `logística`, mapear risco de regressão e documentar achado no relatório de auditoria.
08957. [REVISÃO_TOTAL] Na área `suporte`, mapear risco de regressão e documentar achado no relatório de auditoria.
08958. [REVISÃO_TOTAL] Na área `notificações`, mapear risco de regressão e documentar achado no relatório de auditoria.
08959. [REVISÃO_TOTAL] Na área `header`, mapear risco de regressão e documentar achado no relatório de auditoria.
08960. [REVISÃO_TOTAL] Na área `footer`, mapear risco de regressão e documentar achado no relatório de auditoria.
08961. [REVISÃO_TOTAL] Na área `sidebar`, mapear risco de regressão e documentar achado no relatório de auditoria.
08962. [REVISÃO_TOTAL] Na área `dashboard`, mapear risco de regressão e documentar achado no relatório de auditoria.
08963. [REVISÃO_TOTAL] Na área `perfil`, mapear risco de regressão e documentar achado no relatório de auditoria.
08964. [REVISÃO_TOTAL] Na área `uploads`, mapear risco de regressão e documentar achado no relatório de auditoria.
08965. [REVISÃO_TOTAL] Na área `imagens`, mapear risco de regressão e documentar achado no relatório de auditoria.
08966. [REVISÃO_TOTAL] Na área `filtros`, mapear risco de regressão e documentar achado no relatório de auditoria.
08967. [REVISÃO_TOTAL] Na área `paginação`, mapear risco de regressão e documentar achado no relatório de auditoria.
08968. [REVISÃO_TOTAL] Na área `modais`, mapear risco de regressão e documentar achado no relatório de auditoria.
08969. [REVISÃO_TOTAL] Na área `tabelas`, mapear risco de regressão e documentar achado no relatório de auditoria.
08970. [REVISÃO_TOTAL] Na área `cards`, mapear risco de regressão e documentar achado no relatório de auditoria.
08971. [REVISÃO_TOTAL] Na área `responsividade`, mapear risco de regressão e documentar achado no relatório de auditoria.
08972. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear risco de regressão e documentar achado no relatório de auditoria.
08973. [REVISÃO_TOTAL] Na área `segurança`, mapear risco de regressão e documentar achado no relatório de auditoria.
08974. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear risco de regressão e documentar achado no relatório de auditoria.
08975. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear risco de regressão e documentar achado no relatório de auditoria.
08976. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08977. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08978. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08979. [REVISÃO_TOTAL] Na área `API`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08980. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08981. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08982. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08983. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08984. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08985. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08986. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08987. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08988. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08989. [REVISÃO_TOTAL] Na área `header`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08990. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08991. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08992. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08993. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08994. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08995. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08996. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08997. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08998. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
08999. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09000. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09001. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09002. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09003. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09004. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09005. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em usuário comum e documentar achado no relatório de auditoria.
09006. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09007. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09008. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09009. [REVISÃO_TOTAL] Na área `API`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09010. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09011. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09012. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09013. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09014. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09015. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09016. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09017. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09018. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09019. [REVISÃO_TOTAL] Na área `header`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09020. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09021. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09022. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09023. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09024. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09025. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09026. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09027. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09028. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09029. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09030. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09031. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09032. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09033. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09034. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09035. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em fornecedor e documentar achado no relatório de auditoria.
09036. [REVISÃO_TOTAL] Na área `front-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
09037. [REVISÃO_TOTAL] Na área `back-end`, mapear impacto em admin e documentar achado no relatório de auditoria.
09038. [REVISÃO_TOTAL] Na área `banco de dados`, mapear impacto em admin e documentar achado no relatório de auditoria.
09039. [REVISÃO_TOTAL] Na área `API`, mapear impacto em admin e documentar achado no relatório de auditoria.
09040. [REVISÃO_TOTAL] Na área `autenticação`, mapear impacto em admin e documentar achado no relatório de auditoria.
09041. [REVISÃO_TOTAL] Na área `autorização`, mapear impacto em admin e documentar achado no relatório de auditoria.
09042. [REVISÃO_TOTAL] Na área `produtos`, mapear impacto em admin e documentar achado no relatório de auditoria.
09043. [REVISÃO_TOTAL] Na área `pedidos`, mapear impacto em admin e documentar achado no relatório de auditoria.
09044. [REVISÃO_TOTAL] Na área `encomendas`, mapear impacto em admin e documentar achado no relatório de auditoria.
09045. [REVISÃO_TOTAL] Na área `orçamentos`, mapear impacto em admin e documentar achado no relatório de auditoria.
09046. [REVISÃO_TOTAL] Na área `logística`, mapear impacto em admin e documentar achado no relatório de auditoria.
09047. [REVISÃO_TOTAL] Na área `suporte`, mapear impacto em admin e documentar achado no relatório de auditoria.
09048. [REVISÃO_TOTAL] Na área `notificações`, mapear impacto em admin e documentar achado no relatório de auditoria.
09049. [REVISÃO_TOTAL] Na área `header`, mapear impacto em admin e documentar achado no relatório de auditoria.
09050. [REVISÃO_TOTAL] Na área `footer`, mapear impacto em admin e documentar achado no relatório de auditoria.
09051. [REVISÃO_TOTAL] Na área `sidebar`, mapear impacto em admin e documentar achado no relatório de auditoria.
09052. [REVISÃO_TOTAL] Na área `dashboard`, mapear impacto em admin e documentar achado no relatório de auditoria.
09053. [REVISÃO_TOTAL] Na área `perfil`, mapear impacto em admin e documentar achado no relatório de auditoria.
09054. [REVISÃO_TOTAL] Na área `uploads`, mapear impacto em admin e documentar achado no relatório de auditoria.
09055. [REVISÃO_TOTAL] Na área `imagens`, mapear impacto em admin e documentar achado no relatório de auditoria.
09056. [REVISÃO_TOTAL] Na área `filtros`, mapear impacto em admin e documentar achado no relatório de auditoria.
09057. [REVISÃO_TOTAL] Na área `paginação`, mapear impacto em admin e documentar achado no relatório de auditoria.
09058. [REVISÃO_TOTAL] Na área `modais`, mapear impacto em admin e documentar achado no relatório de auditoria.
09059. [REVISÃO_TOTAL] Na área `tabelas`, mapear impacto em admin e documentar achado no relatório de auditoria.
09060. [REVISÃO_TOTAL] Na área `cards`, mapear impacto em admin e documentar achado no relatório de auditoria.
09061. [REVISÃO_TOTAL] Na área `responsividade`, mapear impacto em admin e documentar achado no relatório de auditoria.
09062. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear impacto em admin e documentar achado no relatório de auditoria.
09063. [REVISÃO_TOTAL] Na área `segurança`, mapear impacto em admin e documentar achado no relatório de auditoria.
09064. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear impacto em admin e documentar achado no relatório de auditoria.
09065. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear impacto em admin e documentar achado no relatório de auditoria.
09066. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09067. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09068. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09069. [REVISÃO_TOTAL] Na área `API`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09070. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09071. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09072. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09073. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09074. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09075. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09076. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09077. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09078. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09079. [REVISÃO_TOTAL] Na área `header`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09080. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09081. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09082. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09083. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09084. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09085. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09086. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09087. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09088. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09089. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09090. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09091. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09092. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09093. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09094. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09095. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de nomes e documentar achado no relatório de auditoria.
09096. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de status e documentar achado no relatório de auditoria.
09097. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de status e documentar achado no relatório de auditoria.
09098. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de status e documentar achado no relatório de auditoria.
09099. [REVISÃO_TOTAL] Na área `API`, verificar consistência de status e documentar achado no relatório de auditoria.
09100. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de status e documentar achado no relatório de auditoria.
09101. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de status e documentar achado no relatório de auditoria.
09102. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de status e documentar achado no relatório de auditoria.
09103. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de status e documentar achado no relatório de auditoria.
09104. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de status e documentar achado no relatório de auditoria.
09105. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de status e documentar achado no relatório de auditoria.
09106. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de status e documentar achado no relatório de auditoria.
09107. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de status e documentar achado no relatório de auditoria.
09108. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de status e documentar achado no relatório de auditoria.
09109. [REVISÃO_TOTAL] Na área `header`, verificar consistência de status e documentar achado no relatório de auditoria.
09110. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de status e documentar achado no relatório de auditoria.
09111. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de status e documentar achado no relatório de auditoria.
09112. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de status e documentar achado no relatório de auditoria.
09113. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de status e documentar achado no relatório de auditoria.
09114. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de status e documentar achado no relatório de auditoria.
09115. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de status e documentar achado no relatório de auditoria.
09116. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de status e documentar achado no relatório de auditoria.
09117. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de status e documentar achado no relatório de auditoria.
09118. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de status e documentar achado no relatório de auditoria.
09119. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de status e documentar achado no relatório de auditoria.
09120. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de status e documentar achado no relatório de auditoria.
09121. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de status e documentar achado no relatório de auditoria.
09122. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de status e documentar achado no relatório de auditoria.
09123. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de status e documentar achado no relatório de auditoria.
09124. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de status e documentar achado no relatório de auditoria.
09125. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de status e documentar achado no relatório de auditoria.
09126. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
09127. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de ids e documentar achado no relatório de auditoria.
09128. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de ids e documentar achado no relatório de auditoria.
09129. [REVISÃO_TOTAL] Na área `API`, verificar consistência de ids e documentar achado no relatório de auditoria.
09130. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de ids e documentar achado no relatório de auditoria.
09131. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de ids e documentar achado no relatório de auditoria.
09132. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de ids e documentar achado no relatório de auditoria.
09133. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de ids e documentar achado no relatório de auditoria.
09134. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de ids e documentar achado no relatório de auditoria.
09135. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de ids e documentar achado no relatório de auditoria.
09136. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de ids e documentar achado no relatório de auditoria.
09137. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de ids e documentar achado no relatório de auditoria.
09138. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de ids e documentar achado no relatório de auditoria.
09139. [REVISÃO_TOTAL] Na área `header`, verificar consistência de ids e documentar achado no relatório de auditoria.
09140. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de ids e documentar achado no relatório de auditoria.
09141. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de ids e documentar achado no relatório de auditoria.
09142. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de ids e documentar achado no relatório de auditoria.
09143. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de ids e documentar achado no relatório de auditoria.
09144. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de ids e documentar achado no relatório de auditoria.
09145. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de ids e documentar achado no relatório de auditoria.
09146. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de ids e documentar achado no relatório de auditoria.
09147. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de ids e documentar achado no relatório de auditoria.
09148. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de ids e documentar achado no relatório de auditoria.
09149. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de ids e documentar achado no relatório de auditoria.
09150. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de ids e documentar achado no relatório de auditoria.
09151. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de ids e documentar achado no relatório de auditoria.
09152. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de ids e documentar achado no relatório de auditoria.
09153. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de ids e documentar achado no relatório de auditoria.
09154. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de ids e documentar achado no relatório de auditoria.
09155. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de ids e documentar achado no relatório de auditoria.
09156. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
09157. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de datas e documentar achado no relatório de auditoria.
09158. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de datas e documentar achado no relatório de auditoria.
09159. [REVISÃO_TOTAL] Na área `API`, verificar consistência de datas e documentar achado no relatório de auditoria.
09160. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de datas e documentar achado no relatório de auditoria.
09161. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de datas e documentar achado no relatório de auditoria.
09162. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de datas e documentar achado no relatório de auditoria.
09163. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de datas e documentar achado no relatório de auditoria.
09164. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de datas e documentar achado no relatório de auditoria.
09165. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de datas e documentar achado no relatório de auditoria.
09166. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de datas e documentar achado no relatório de auditoria.
09167. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de datas e documentar achado no relatório de auditoria.
09168. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de datas e documentar achado no relatório de auditoria.
09169. [REVISÃO_TOTAL] Na área `header`, verificar consistência de datas e documentar achado no relatório de auditoria.
09170. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de datas e documentar achado no relatório de auditoria.
09171. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de datas e documentar achado no relatório de auditoria.
09172. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de datas e documentar achado no relatório de auditoria.
09173. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de datas e documentar achado no relatório de auditoria.
09174. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de datas e documentar achado no relatório de auditoria.
09175. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de datas e documentar achado no relatório de auditoria.
09176. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de datas e documentar achado no relatório de auditoria.
09177. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de datas e documentar achado no relatório de auditoria.
09178. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de datas e documentar achado no relatório de auditoria.
09179. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de datas e documentar achado no relatório de auditoria.
09180. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de datas e documentar achado no relatório de auditoria.
09181. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de datas e documentar achado no relatório de auditoria.
09182. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de datas e documentar achado no relatório de auditoria.
09183. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de datas e documentar achado no relatório de auditoria.
09184. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de datas e documentar achado no relatório de auditoria.
09185. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de datas e documentar achado no relatório de auditoria.
09186. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09187. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09188. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09189. [REVISÃO_TOTAL] Na área `API`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09190. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09191. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09192. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09193. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09194. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09195. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09196. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09197. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09198. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09199. [REVISÃO_TOTAL] Na área `header`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09200. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09201. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09202. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09203. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09204. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09205. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09206. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09207. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09208. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09209. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09210. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09211. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09212. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09213. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09214. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09215. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de imagens e documentar achado no relatório de auditoria.
09216. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09217. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09218. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09219. [REVISÃO_TOTAL] Na área `API`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09220. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09221. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09222. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09223. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09224. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09225. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09226. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09227. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09228. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09229. [REVISÃO_TOTAL] Na área `header`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09230. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09231. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09232. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09233. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09234. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09235. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09236. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09237. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09238. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09239. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09240. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09241. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09242. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09243. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09244. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09245. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de permissões e documentar achado no relatório de auditoria.
09246. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência visual e documentar achado no relatório de auditoria.
09247. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência visual e documentar achado no relatório de auditoria.
09248. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência visual e documentar achado no relatório de auditoria.
09249. [REVISÃO_TOTAL] Na área `API`, verificar consistência visual e documentar achado no relatório de auditoria.
09250. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência visual e documentar achado no relatório de auditoria.
09251. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência visual e documentar achado no relatório de auditoria.
09252. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência visual e documentar achado no relatório de auditoria.
09253. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência visual e documentar achado no relatório de auditoria.
09254. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência visual e documentar achado no relatório de auditoria.
09255. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência visual e documentar achado no relatório de auditoria.
09256. [REVISÃO_TOTAL] Na área `logística`, verificar consistência visual e documentar achado no relatório de auditoria.
09257. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência visual e documentar achado no relatório de auditoria.
09258. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência visual e documentar achado no relatório de auditoria.
09259. [REVISÃO_TOTAL] Na área `header`, verificar consistência visual e documentar achado no relatório de auditoria.
09260. [REVISÃO_TOTAL] Na área `footer`, verificar consistência visual e documentar achado no relatório de auditoria.
09261. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência visual e documentar achado no relatório de auditoria.
09262. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência visual e documentar achado no relatório de auditoria.
09263. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência visual e documentar achado no relatório de auditoria.
09264. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência visual e documentar achado no relatório de auditoria.
09265. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência visual e documentar achado no relatório de auditoria.
09266. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência visual e documentar achado no relatório de auditoria.
09267. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência visual e documentar achado no relatório de auditoria.
09268. [REVISÃO_TOTAL] Na área `modais`, verificar consistência visual e documentar achado no relatório de auditoria.
09269. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência visual e documentar achado no relatório de auditoria.
09270. [REVISÃO_TOTAL] Na área `cards`, verificar consistência visual e documentar achado no relatório de auditoria.
09271. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência visual e documentar achado no relatório de auditoria.
09272. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência visual e documentar achado no relatório de auditoria.
09273. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência visual e documentar achado no relatório de auditoria.
09274. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência visual e documentar achado no relatório de auditoria.
09275. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência visual e documentar achado no relatório de auditoria.
09276. [REVISÃO_TOTAL] Na área `front-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
09277. [REVISÃO_TOTAL] Na área `back-end`, verificar consistência de erros e documentar achado no relatório de auditoria.
09278. [REVISÃO_TOTAL] Na área `banco de dados`, verificar consistência de erros e documentar achado no relatório de auditoria.
09279. [REVISÃO_TOTAL] Na área `API`, verificar consistência de erros e documentar achado no relatório de auditoria.
09280. [REVISÃO_TOTAL] Na área `autenticação`, verificar consistência de erros e documentar achado no relatório de auditoria.
09281. [REVISÃO_TOTAL] Na área `autorização`, verificar consistência de erros e documentar achado no relatório de auditoria.
09282. [REVISÃO_TOTAL] Na área `produtos`, verificar consistência de erros e documentar achado no relatório de auditoria.
09283. [REVISÃO_TOTAL] Na área `pedidos`, verificar consistência de erros e documentar achado no relatório de auditoria.
09284. [REVISÃO_TOTAL] Na área `encomendas`, verificar consistência de erros e documentar achado no relatório de auditoria.
09285. [REVISÃO_TOTAL] Na área `orçamentos`, verificar consistência de erros e documentar achado no relatório de auditoria.
09286. [REVISÃO_TOTAL] Na área `logística`, verificar consistência de erros e documentar achado no relatório de auditoria.
09287. [REVISÃO_TOTAL] Na área `suporte`, verificar consistência de erros e documentar achado no relatório de auditoria.
09288. [REVISÃO_TOTAL] Na área `notificações`, verificar consistência de erros e documentar achado no relatório de auditoria.
09289. [REVISÃO_TOTAL] Na área `header`, verificar consistência de erros e documentar achado no relatório de auditoria.
09290. [REVISÃO_TOTAL] Na área `footer`, verificar consistência de erros e documentar achado no relatório de auditoria.
09291. [REVISÃO_TOTAL] Na área `sidebar`, verificar consistência de erros e documentar achado no relatório de auditoria.
09292. [REVISÃO_TOTAL] Na área `dashboard`, verificar consistência de erros e documentar achado no relatório de auditoria.
09293. [REVISÃO_TOTAL] Na área `perfil`, verificar consistência de erros e documentar achado no relatório de auditoria.
09294. [REVISÃO_TOTAL] Na área `uploads`, verificar consistência de erros e documentar achado no relatório de auditoria.
09295. [REVISÃO_TOTAL] Na área `imagens`, verificar consistência de erros e documentar achado no relatório de auditoria.
09296. [REVISÃO_TOTAL] Na área `filtros`, verificar consistência de erros e documentar achado no relatório de auditoria.
09297. [REVISÃO_TOTAL] Na área `paginação`, verificar consistência de erros e documentar achado no relatório de auditoria.
09298. [REVISÃO_TOTAL] Na área `modais`, verificar consistência de erros e documentar achado no relatório de auditoria.
09299. [REVISÃO_TOTAL] Na área `tabelas`, verificar consistência de erros e documentar achado no relatório de auditoria.
09300. [REVISÃO_TOTAL] Na área `cards`, verificar consistência de erros e documentar achado no relatório de auditoria.
09301. [REVISÃO_TOTAL] Na área `responsividade`, verificar consistência de erros e documentar achado no relatório de auditoria.
09302. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar consistência de erros e documentar achado no relatório de auditoria.
09303. [REVISÃO_TOTAL] Na área `segurança`, verificar consistência de erros e documentar achado no relatório de auditoria.
09304. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar consistência de erros e documentar achado no relatório de auditoria.
09305. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar consistência de erros e documentar achado no relatório de auditoria.
09306. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
09307. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário feliz e documentar achado no relatório de auditoria.
09308. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário feliz e documentar achado no relatório de auditoria.
09309. [REVISÃO_TOTAL] Na área `API`, verificar cenário feliz e documentar achado no relatório de auditoria.
09310. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário feliz e documentar achado no relatório de auditoria.
09311. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário feliz e documentar achado no relatório de auditoria.
09312. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário feliz e documentar achado no relatório de auditoria.
09313. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário feliz e documentar achado no relatório de auditoria.
09314. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário feliz e documentar achado no relatório de auditoria.
09315. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário feliz e documentar achado no relatório de auditoria.
09316. [REVISÃO_TOTAL] Na área `logística`, verificar cenário feliz e documentar achado no relatório de auditoria.
09317. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário feliz e documentar achado no relatório de auditoria.
09318. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário feliz e documentar achado no relatório de auditoria.
09319. [REVISÃO_TOTAL] Na área `header`, verificar cenário feliz e documentar achado no relatório de auditoria.
09320. [REVISÃO_TOTAL] Na área `footer`, verificar cenário feliz e documentar achado no relatório de auditoria.
09321. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário feliz e documentar achado no relatório de auditoria.
09322. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário feliz e documentar achado no relatório de auditoria.
09323. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário feliz e documentar achado no relatório de auditoria.
09324. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário feliz e documentar achado no relatório de auditoria.
09325. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário feliz e documentar achado no relatório de auditoria.
09326. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário feliz e documentar achado no relatório de auditoria.
09327. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário feliz e documentar achado no relatório de auditoria.
09328. [REVISÃO_TOTAL] Na área `modais`, verificar cenário feliz e documentar achado no relatório de auditoria.
09329. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário feliz e documentar achado no relatório de auditoria.
09330. [REVISÃO_TOTAL] Na área `cards`, verificar cenário feliz e documentar achado no relatório de auditoria.
09331. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário feliz e documentar achado no relatório de auditoria.
09332. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário feliz e documentar achado no relatório de auditoria.
09333. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário feliz e documentar achado no relatório de auditoria.
09334. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário feliz e documentar achado no relatório de auditoria.
09335. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário feliz e documentar achado no relatório de auditoria.
09336. [REVISÃO_TOTAL] Na área `front-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
09337. [REVISÃO_TOTAL] Na área `back-end`, verificar cenário extremo e documentar achado no relatório de auditoria.
09338. [REVISÃO_TOTAL] Na área `banco de dados`, verificar cenário extremo e documentar achado no relatório de auditoria.
09339. [REVISÃO_TOTAL] Na área `API`, verificar cenário extremo e documentar achado no relatório de auditoria.
09340. [REVISÃO_TOTAL] Na área `autenticação`, verificar cenário extremo e documentar achado no relatório de auditoria.
09341. [REVISÃO_TOTAL] Na área `autorização`, verificar cenário extremo e documentar achado no relatório de auditoria.
09342. [REVISÃO_TOTAL] Na área `produtos`, verificar cenário extremo e documentar achado no relatório de auditoria.
09343. [REVISÃO_TOTAL] Na área `pedidos`, verificar cenário extremo e documentar achado no relatório de auditoria.
09344. [REVISÃO_TOTAL] Na área `encomendas`, verificar cenário extremo e documentar achado no relatório de auditoria.
09345. [REVISÃO_TOTAL] Na área `orçamentos`, verificar cenário extremo e documentar achado no relatório de auditoria.
09346. [REVISÃO_TOTAL] Na área `logística`, verificar cenário extremo e documentar achado no relatório de auditoria.
09347. [REVISÃO_TOTAL] Na área `suporte`, verificar cenário extremo e documentar achado no relatório de auditoria.
09348. [REVISÃO_TOTAL] Na área `notificações`, verificar cenário extremo e documentar achado no relatório de auditoria.
09349. [REVISÃO_TOTAL] Na área `header`, verificar cenário extremo e documentar achado no relatório de auditoria.
09350. [REVISÃO_TOTAL] Na área `footer`, verificar cenário extremo e documentar achado no relatório de auditoria.
09351. [REVISÃO_TOTAL] Na área `sidebar`, verificar cenário extremo e documentar achado no relatório de auditoria.
09352. [REVISÃO_TOTAL] Na área `dashboard`, verificar cenário extremo e documentar achado no relatório de auditoria.
09353. [REVISÃO_TOTAL] Na área `perfil`, verificar cenário extremo e documentar achado no relatório de auditoria.
09354. [REVISÃO_TOTAL] Na área `uploads`, verificar cenário extremo e documentar achado no relatório de auditoria.
09355. [REVISÃO_TOTAL] Na área `imagens`, verificar cenário extremo e documentar achado no relatório de auditoria.
09356. [REVISÃO_TOTAL] Na área `filtros`, verificar cenário extremo e documentar achado no relatório de auditoria.
09357. [REVISÃO_TOTAL] Na área `paginação`, verificar cenário extremo e documentar achado no relatório de auditoria.
09358. [REVISÃO_TOTAL] Na área `modais`, verificar cenário extremo e documentar achado no relatório de auditoria.
09359. [REVISÃO_TOTAL] Na área `tabelas`, verificar cenário extremo e documentar achado no relatório de auditoria.
09360. [REVISÃO_TOTAL] Na área `cards`, verificar cenário extremo e documentar achado no relatório de auditoria.
09361. [REVISÃO_TOTAL] Na área `responsividade`, verificar cenário extremo e documentar achado no relatório de auditoria.
09362. [REVISÃO_TOTAL] Na área `acessibilidade`, verificar cenário extremo e documentar achado no relatório de auditoria.
09363. [REVISÃO_TOTAL] Na área `segurança`, verificar cenário extremo e documentar achado no relatório de auditoria.
09364. [REVISÃO_TOTAL] Na área `tratamento de erro`, verificar cenário extremo e documentar achado no relatório de auditoria.
09365. [REVISÃO_TOTAL] Na área `mensagens de usuário`, verificar cenário extremo e documentar achado no relatório de auditoria.
09366. [REVISÃO_TOTAL] Na área `front-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09367. [REVISÃO_TOTAL] Na área `back-end`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09368. [REVISÃO_TOTAL] Na área `banco de dados`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09369. [REVISÃO_TOTAL] Na área `API`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09370. [REVISÃO_TOTAL] Na área `autenticação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09371. [REVISÃO_TOTAL] Na área `autorização`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09372. [REVISÃO_TOTAL] Na área `produtos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09373. [REVISÃO_TOTAL] Na área `pedidos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09374. [REVISÃO_TOTAL] Na área `encomendas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09375. [REVISÃO_TOTAL] Na área `orçamentos`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09376. [REVISÃO_TOTAL] Na área `logística`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09377. [REVISÃO_TOTAL] Na área `suporte`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09378. [REVISÃO_TOTAL] Na área `notificações`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09379. [REVISÃO_TOTAL] Na área `header`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09380. [REVISÃO_TOTAL] Na área `footer`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09381. [REVISÃO_TOTAL] Na área `sidebar`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09382. [REVISÃO_TOTAL] Na área `dashboard`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09383. [REVISÃO_TOTAL] Na área `perfil`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09384. [REVISÃO_TOTAL] Na área `uploads`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09385. [REVISÃO_TOTAL] Na área `imagens`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09386. [REVISÃO_TOTAL] Na área `filtros`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09387. [REVISÃO_TOTAL] Na área `paginação`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09388. [REVISÃO_TOTAL] Na área `modais`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09389. [REVISÃO_TOTAL] Na área `tabelas`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09390. [REVISÃO_TOTAL] Na área `cards`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09391. [REVISÃO_TOTAL] Na área `responsividade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09392. [REVISÃO_TOTAL] Na área `acessibilidade`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09393. [REVISÃO_TOTAL] Na área `segurança`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09394. [REVISÃO_TOTAL] Na área `tratamento de erro`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09395. [REVISÃO_TOTAL] Na área `mensagens de usuário`, registrar evidência encontrada e documentar achado no relatório de auditoria.
09396. [REVISÃO_TOTAL] Na área `front-end`, classificar severidade e documentar achado no relatório de auditoria.
09397. [REVISÃO_TOTAL] Na área `back-end`, classificar severidade e documentar achado no relatório de auditoria.
09398. [REVISÃO_TOTAL] Na área `banco de dados`, classificar severidade e documentar achado no relatório de auditoria.
09399. [REVISÃO_TOTAL] Na área `API`, classificar severidade e documentar achado no relatório de auditoria.
09400. [REVISÃO_TOTAL] Na área `autenticação`, classificar severidade e documentar achado no relatório de auditoria.
09401. [REVISÃO_TOTAL] Na área `autorização`, classificar severidade e documentar achado no relatório de auditoria.
09402. [REVISÃO_TOTAL] Na área `produtos`, classificar severidade e documentar achado no relatório de auditoria.
09403. [REVISÃO_TOTAL] Na área `pedidos`, classificar severidade e documentar achado no relatório de auditoria.
09404. [REVISÃO_TOTAL] Na área `encomendas`, classificar severidade e documentar achado no relatório de auditoria.
09405. [REVISÃO_TOTAL] Na área `orçamentos`, classificar severidade e documentar achado no relatório de auditoria.
09406. [REVISÃO_TOTAL] Na área `logística`, classificar severidade e documentar achado no relatório de auditoria.
09407. [REVISÃO_TOTAL] Na área `suporte`, classificar severidade e documentar achado no relatório de auditoria.
09408. [REVISÃO_TOTAL] Na área `notificações`, classificar severidade e documentar achado no relatório de auditoria.
09409. [REVISÃO_TOTAL] Na área `header`, classificar severidade e documentar achado no relatório de auditoria.
09410. [REVISÃO_TOTAL] Na área `footer`, classificar severidade e documentar achado no relatório de auditoria.
09411. [REVISÃO_TOTAL] Na área `sidebar`, classificar severidade e documentar achado no relatório de auditoria.
09412. [REVISÃO_TOTAL] Na área `dashboard`, classificar severidade e documentar achado no relatório de auditoria.
09413. [REVISÃO_TOTAL] Na área `perfil`, classificar severidade e documentar achado no relatório de auditoria.
09414. [REVISÃO_TOTAL] Na área `uploads`, classificar severidade e documentar achado no relatório de auditoria.
09415. [REVISÃO_TOTAL] Na área `imagens`, classificar severidade e documentar achado no relatório de auditoria.
09416. [REVISÃO_TOTAL] Na área `filtros`, classificar severidade e documentar achado no relatório de auditoria.
09417. [REVISÃO_TOTAL] Na área `paginação`, classificar severidade e documentar achado no relatório de auditoria.
09418. [REVISÃO_TOTAL] Na área `modais`, classificar severidade e documentar achado no relatório de auditoria.
09419. [REVISÃO_TOTAL] Na área `tabelas`, classificar severidade e documentar achado no relatório de auditoria.
09420. [REVISÃO_TOTAL] Na área `cards`, classificar severidade e documentar achado no relatório de auditoria.
09421. [REVISÃO_TOTAL] Na área `responsividade`, classificar severidade e documentar achado no relatório de auditoria.
09422. [REVISÃO_TOTAL] Na área `acessibilidade`, classificar severidade e documentar achado no relatório de auditoria.
09423. [REVISÃO_TOTAL] Na área `segurança`, classificar severidade e documentar achado no relatório de auditoria.
09424. [REVISÃO_TOTAL] Na área `tratamento de erro`, classificar severidade e documentar achado no relatório de auditoria.
09425. [REVISÃO_TOTAL] Na área `mensagens de usuário`, classificar severidade e documentar achado no relatório de auditoria.
09426. [REVISÃO_TOTAL] Na área `front-end`, propor correção futura e documentar achado no relatório de auditoria.
09427. [REVISÃO_TOTAL] Na área `back-end`, propor correção futura e documentar achado no relatório de auditoria.
09428. [REVISÃO_TOTAL] Na área `banco de dados`, propor correção futura e documentar achado no relatório de auditoria.
09429. [REVISÃO_TOTAL] Na área `API`, propor correção futura e documentar achado no relatório de auditoria.
09430. [REVISÃO_TOTAL] Na área `autenticação`, propor correção futura e documentar achado no relatório de auditoria.
09431. [REVISÃO_TOTAL] Na área `autorização`, propor correção futura e documentar achado no relatório de auditoria.
09432. [REVISÃO_TOTAL] Na área `produtos`, propor correção futura e documentar achado no relatório de auditoria.
09433. [REVISÃO_TOTAL] Na área `pedidos`, propor correção futura e documentar achado no relatório de auditoria.
09434. [REVISÃO_TOTAL] Na área `encomendas`, propor correção futura e documentar achado no relatório de auditoria.
09435. [REVISÃO_TOTAL] Na área `orçamentos`, propor correção futura e documentar achado no relatório de auditoria.
09436. [REVISÃO_TOTAL] Na área `logística`, propor correção futura e documentar achado no relatório de auditoria.
09437. [REVISÃO_TOTAL] Na área `suporte`, propor correção futura e documentar achado no relatório de auditoria.
09438. [REVISÃO_TOTAL] Na área `notificações`, propor correção futura e documentar achado no relatório de auditoria.
09439. [REVISÃO_TOTAL] Na área `header`, propor correção futura e documentar achado no relatório de auditoria.
09440. [REVISÃO_TOTAL] Na área `footer`, propor correção futura e documentar achado no relatório de auditoria.
09441. [REVISÃO_TOTAL] Na área `sidebar`, propor correção futura e documentar achado no relatório de auditoria.
09442. [REVISÃO_TOTAL] Na área `dashboard`, propor correção futura e documentar achado no relatório de auditoria.
09443. [REVISÃO_TOTAL] Na área `perfil`, propor correção futura e documentar achado no relatório de auditoria.
09444. [REVISÃO_TOTAL] Na área `uploads`, propor correção futura e documentar achado no relatório de auditoria.
09445. [REVISÃO_TOTAL] Na área `imagens`, propor correção futura e documentar achado no relatório de auditoria.
09446. [REVISÃO_TOTAL] Na área `filtros`, propor correção futura e documentar achado no relatório de auditoria.
09447. [REVISÃO_TOTAL] Na área `paginação`, propor correção futura e documentar achado no relatório de auditoria.
09448. [REVISÃO_TOTAL] Na área `modais`, propor correção futura e documentar achado no relatório de auditoria.
09449. [REVISÃO_TOTAL] Na área `tabelas`, propor correção futura e documentar achado no relatório de auditoria.
09450. [REVISÃO_TOTAL] Na área `cards`, propor correção futura e documentar achado no relatório de auditoria.
09451. [REVISÃO_TOTAL] Na área `responsividade`, propor correção futura e documentar achado no relatório de auditoria.
09452. [REVISÃO_TOTAL] Na área `acessibilidade`, propor correção futura e documentar achado no relatório de auditoria.
09453. [REVISÃO_TOTAL] Na área `segurança`, propor correção futura e documentar achado no relatório de auditoria.
09454. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor correção futura e documentar achado no relatório de auditoria.
09455. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor correção futura e documentar achado no relatório de auditoria.
09456. [REVISÃO_TOTAL] Na área `front-end`, propor teste manual e documentar achado no relatório de auditoria.
09457. [REVISÃO_TOTAL] Na área `back-end`, propor teste manual e documentar achado no relatório de auditoria.
09458. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste manual e documentar achado no relatório de auditoria.
09459. [REVISÃO_TOTAL] Na área `API`, propor teste manual e documentar achado no relatório de auditoria.
09460. [REVISÃO_TOTAL] Na área `autenticação`, propor teste manual e documentar achado no relatório de auditoria.
09461. [REVISÃO_TOTAL] Na área `autorização`, propor teste manual e documentar achado no relatório de auditoria.
09462. [REVISÃO_TOTAL] Na área `produtos`, propor teste manual e documentar achado no relatório de auditoria.
09463. [REVISÃO_TOTAL] Na área `pedidos`, propor teste manual e documentar achado no relatório de auditoria.
09464. [REVISÃO_TOTAL] Na área `encomendas`, propor teste manual e documentar achado no relatório de auditoria.
09465. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste manual e documentar achado no relatório de auditoria.
09466. [REVISÃO_TOTAL] Na área `logística`, propor teste manual e documentar achado no relatório de auditoria.
09467. [REVISÃO_TOTAL] Na área `suporte`, propor teste manual e documentar achado no relatório de auditoria.
09468. [REVISÃO_TOTAL] Na área `notificações`, propor teste manual e documentar achado no relatório de auditoria.
09469. [REVISÃO_TOTAL] Na área `header`, propor teste manual e documentar achado no relatório de auditoria.
09470. [REVISÃO_TOTAL] Na área `footer`, propor teste manual e documentar achado no relatório de auditoria.
09471. [REVISÃO_TOTAL] Na área `sidebar`, propor teste manual e documentar achado no relatório de auditoria.
09472. [REVISÃO_TOTAL] Na área `dashboard`, propor teste manual e documentar achado no relatório de auditoria.
09473. [REVISÃO_TOTAL] Na área `perfil`, propor teste manual e documentar achado no relatório de auditoria.
09474. [REVISÃO_TOTAL] Na área `uploads`, propor teste manual e documentar achado no relatório de auditoria.
09475. [REVISÃO_TOTAL] Na área `imagens`, propor teste manual e documentar achado no relatório de auditoria.
09476. [REVISÃO_TOTAL] Na área `filtros`, propor teste manual e documentar achado no relatório de auditoria.
09477. [REVISÃO_TOTAL] Na área `paginação`, propor teste manual e documentar achado no relatório de auditoria.
09478. [REVISÃO_TOTAL] Na área `modais`, propor teste manual e documentar achado no relatório de auditoria.
09479. [REVISÃO_TOTAL] Na área `tabelas`, propor teste manual e documentar achado no relatório de auditoria.
09480. [REVISÃO_TOTAL] Na área `cards`, propor teste manual e documentar achado no relatório de auditoria.
09481. [REVISÃO_TOTAL] Na área `responsividade`, propor teste manual e documentar achado no relatório de auditoria.
09482. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste manual e documentar achado no relatório de auditoria.
09483. [REVISÃO_TOTAL] Na área `segurança`, propor teste manual e documentar achado no relatório de auditoria.
09484. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste manual e documentar achado no relatório de auditoria.
09485. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste manual e documentar achado no relatório de auditoria.
09486. [REVISÃO_TOTAL] Na área `front-end`, propor teste automatizado e documentar achado no relatório de auditoria.
09487. [REVISÃO_TOTAL] Na área `back-end`, propor teste automatizado e documentar achado no relatório de auditoria.
09488. [REVISÃO_TOTAL] Na área `banco de dados`, propor teste automatizado e documentar achado no relatório de auditoria.
09489. [REVISÃO_TOTAL] Na área `API`, propor teste automatizado e documentar achado no relatório de auditoria.
09490. [REVISÃO_TOTAL] Na área `autenticação`, propor teste automatizado e documentar achado no relatório de auditoria.
09491. [REVISÃO_TOTAL] Na área `autorização`, propor teste automatizado e documentar achado no relatório de auditoria.
09492. [REVISÃO_TOTAL] Na área `produtos`, propor teste automatizado e documentar achado no relatório de auditoria.
09493. [REVISÃO_TOTAL] Na área `pedidos`, propor teste automatizado e documentar achado no relatório de auditoria.
09494. [REVISÃO_TOTAL] Na área `encomendas`, propor teste automatizado e documentar achado no relatório de auditoria.
09495. [REVISÃO_TOTAL] Na área `orçamentos`, propor teste automatizado e documentar achado no relatório de auditoria.
09496. [REVISÃO_TOTAL] Na área `logística`, propor teste automatizado e documentar achado no relatório de auditoria.
09497. [REVISÃO_TOTAL] Na área `suporte`, propor teste automatizado e documentar achado no relatório de auditoria.
09498. [REVISÃO_TOTAL] Na área `notificações`, propor teste automatizado e documentar achado no relatório de auditoria.
09499. [REVISÃO_TOTAL] Na área `header`, propor teste automatizado e documentar achado no relatório de auditoria.
09500. [REVISÃO_TOTAL] Na área `footer`, propor teste automatizado e documentar achado no relatório de auditoria.
09501. [REVISÃO_TOTAL] Na área `sidebar`, propor teste automatizado e documentar achado no relatório de auditoria.
09502. [REVISÃO_TOTAL] Na área `dashboard`, propor teste automatizado e documentar achado no relatório de auditoria.
09503. [REVISÃO_TOTAL] Na área `perfil`, propor teste automatizado e documentar achado no relatório de auditoria.
09504. [REVISÃO_TOTAL] Na área `uploads`, propor teste automatizado e documentar achado no relatório de auditoria.
09505. [REVISÃO_TOTAL] Na área `imagens`, propor teste automatizado e documentar achado no relatório de auditoria.
09506. [REVISÃO_TOTAL] Na área `filtros`, propor teste automatizado e documentar achado no relatório de auditoria.
09507. [REVISÃO_TOTAL] Na área `paginação`, propor teste automatizado e documentar achado no relatório de auditoria.
09508. [REVISÃO_TOTAL] Na área `modais`, propor teste automatizado e documentar achado no relatório de auditoria.
09509. [REVISÃO_TOTAL] Na área `tabelas`, propor teste automatizado e documentar achado no relatório de auditoria.
09510. [REVISÃO_TOTAL] Na área `cards`, propor teste automatizado e documentar achado no relatório de auditoria.
09511. [REVISÃO_TOTAL] Na área `responsividade`, propor teste automatizado e documentar achado no relatório de auditoria.
09512. [REVISÃO_TOTAL] Na área `acessibilidade`, propor teste automatizado e documentar achado no relatório de auditoria.
09513. [REVISÃO_TOTAL] Na área `segurança`, propor teste automatizado e documentar achado no relatório de auditoria.
09514. [REVISÃO_TOTAL] Na área `tratamento de erro`, propor teste automatizado e documentar achado no relatório de auditoria.
09515. [REVISÃO_TOTAL] Na área `mensagens de usuário`, propor teste automatizado e documentar achado no relatório de auditoria.
09516. [REVISÃO_TOTAL] Na área `front-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09517. [REVISÃO_TOTAL] Na área `back-end`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09518. [REVISÃO_TOTAL] Na área `banco de dados`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09519. [REVISÃO_TOTAL] Na área `API`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09520. [REVISÃO_TOTAL] Na área `autenticação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09521. [REVISÃO_TOTAL] Na área `autorização`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09522. [REVISÃO_TOTAL] Na área `produtos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09523. [REVISÃO_TOTAL] Na área `pedidos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09524. [REVISÃO_TOTAL] Na área `encomendas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09525. [REVISÃO_TOTAL] Na área `orçamentos`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09526. [REVISÃO_TOTAL] Na área `logística`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09527. [REVISÃO_TOTAL] Na área `suporte`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09528. [REVISÃO_TOTAL] Na área `notificações`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09529. [REVISÃO_TOTAL] Na área `header`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09530. [REVISÃO_TOTAL] Na área `footer`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09531. [REVISÃO_TOTAL] Na área `sidebar`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09532. [REVISÃO_TOTAL] Na área `dashboard`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09533. [REVISÃO_TOTAL] Na área `perfil`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09534. [REVISÃO_TOTAL] Na área `uploads`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09535. [REVISÃO_TOTAL] Na área `imagens`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09536. [REVISÃO_TOTAL] Na área `filtros`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09537. [REVISÃO_TOTAL] Na área `paginação`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09538. [REVISÃO_TOTAL] Na área `modais`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09539. [REVISÃO_TOTAL] Na área `tabelas`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09540. [REVISÃO_TOTAL] Na área `cards`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09541. [REVISÃO_TOTAL] Na área `responsividade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09542. [REVISÃO_TOTAL] Na área `acessibilidade`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09543. [REVISÃO_TOTAL] Na área `segurança`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09544. [REVISÃO_TOTAL] Na área `tratamento de erro`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09545. [REVISÃO_TOTAL] Na área `mensagens de usuário`, mapear arquivos envolvidos e documentar achado no relatório de auditoria.
09546. [REVISÃO_TOTAL] Na área `front-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09547. [REVISÃO_TOTAL] Na área `back-end`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09548. [REVISÃO_TOTAL] Na área `banco de dados`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09549. [REVISÃO_TOTAL] Na área `API`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09550. [REVISÃO_TOTAL] Na área `autenticação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09551. [REVISÃO_TOTAL] Na área `autorização`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09552. [REVISÃO_TOTAL] Na área `produtos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09553. [REVISÃO_TOTAL] Na área `pedidos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09554. [REVISÃO_TOTAL] Na área `encomendas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09555. [REVISÃO_TOTAL] Na área `orçamentos`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09556. [REVISÃO_TOTAL] Na área `logística`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09557. [REVISÃO_TOTAL] Na área `suporte`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09558. [REVISÃO_TOTAL] Na área `notificações`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09559. [REVISÃO_TOTAL] Na área `header`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09560. [REVISÃO_TOTAL] Na área `footer`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09561. [REVISÃO_TOTAL] Na área `sidebar`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09562. [REVISÃO_TOTAL] Na área `dashboard`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09563. [REVISÃO_TOTAL] Na área `perfil`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09564. [REVISÃO_TOTAL] Na área `uploads`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09565. [REVISÃO_TOTAL] Na área `imagens`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09566. [REVISÃO_TOTAL] Na área `filtros`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09567. [REVISÃO_TOTAL] Na área `paginação`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09568. [REVISÃO_TOTAL] Na área `modais`, mapear fluxo de dados e documentar achado no relatório de auditoria.
09569. [REVISÃO_TOTAL] Na área `tabelas`, mapear fluxo de dados e documentar achado no relatório de auditoria.
