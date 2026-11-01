/**
 * BASE DE DADOS OFICIAL // ORDO VERITATIS
 * ARQUIVO: REGISTRO DE CULTOS E SEITAS PARANORMAIS
 * Classificação: DOCUMENTO RESTRITO // NÍVEL IV
 */

const DEFAULT_CULTS = [
  {
    id: "familia-montclair",
    name: "Família Montclair",
    codename: "LINHAGEM CARMESIM",
    element: "Sangue",
    secondaryElement: "Morte",
    threatLevel: "Crítico",
    threatScore: 88,
    status: "Ativo // Isolamento Aristocrático",
    membraneDegradation: "Severa (Localizada)",
    location: "Mansões isoladas, cemitérios particulares e cadeia de frigoríficos/açougues",
    summary: "Antiga linhagem nobre que acredita carregar nas veias o sangue de algo divino. Seita hermética devota à pureza sanguínea, consanguinidade e sacrifícios familiares.",
    behavior: "Vivem isolados em mansões decadentes e cemitérios de propriedade privada. Evitam o contato com o público, mas mantêm aparências sociais impecáveis perante a alta sociedade, possuindo inúmeros açougues e frigoríficos em seu nome (utilizados para descarte biológico e manipulação de tecidos). Cada reunião familiar é, na verdade, um ritual de renovação e redistribuição sanguínea.",
    characteristics: "Os Montclair são extremamente pálidos, sempre trajando roupas luxuosas de alfaiataria clássica manchadas discretamente de vermelho carmesim. Costumam portar anéis de sinete ou medalhões heráldicos e sempre carregam consigo cartões de visita de sua linhagem ancestral.",
    occultBelief: "Acreditam que o sangue humano é uma ponte sagrada e que a cada gota derramada de um Montclair legítimo, outro membro da família é 'iluminado' pelo legado ancestral sobrenatural.",
    relations: [
      {
        targetId: "transtornados",
        targetName: "Transtornados",
        type: "Manipulação / Relação Parasitária",
        notes: "Os Montclair enxergam os Transtornados como ferramentas caóticas e cobaias inferiores para descarte de vísceras e testes de pureza, enquanto os Transtornados são atraídos pelo rastro de sangue dos açougues da família."
      },
      {
        targetId: "ordem-do-veu-rubro",
        targetName: "Ordem do Véu Rubro",
        type: "Braço Armado / Fachada Tática",
        notes: "Acolhidos após uma operação paranormal na década de 1980, atuam sob pacto de lealdade como executores violentos e cortina de fumaça para proteger as verdadeiras operações dos Montclair."
      }
    ],
    quotes: [
      "O sangue é herança. E a herança deve ser cultivada."
    ],
    knownMembers: [
      { name: "Lucien Montclair ('Fléau')", role: "Membro de Linhagem / Transgressor", status: "Sob Investigação", attachment: "images/lucien-montclair.jpeg" },
      { name: "Patriarca sob vigilância", role: "Líder de Linhagem", status: "Desconhecido" },
      { name: "Registros de batismo corrompidos", role: "Herdeiros", status: "Não catalogado" }
    ],
    investigationNotes: "Investigar as notas fiscais dos três maiores açougues do centro histórico. Relatos de desaparecimentos frequentes de funcionários noturnos coincidem com as datas de solstício da família."
  },
  {
    id: "transtornados",
    name: "Transtornados",
    codename: "FLAGELO DA CARNE",
    element: "Sangue",
    secondaryElement: "Caos",
    threatLevel: "Extremo",
    threatScore: 94,
    status: "Ativo // Histeria Esporádica",
    membraneDegradation: "Crítica / Rupturas Espontâneas",
    location: "Galpões abandonados, esgotos, matadouros clandestinos e ruínas urbanas",
    summary: "Facção caótica formada por indivíduos que pactuaram com a Entidade de Sangue. Buscam desesperadamente reviver a dor e o êxtase do pacto original por meio de carnificina.",
    behavior: "Geralmente os integrantes desse grupo se encontram ao acaso por diversos lugares afora e se juntam numa espécie de histeria coletiva, agindo quase como uma matilha de feras. Eles invadem lugares abandonados, onde praticam atos repugnantes, incluindo mutilação sistemática, canibalismo ritualístico e tortura prolongada, em uma tentativa desesperada de se mostrarem dignos de receber um novo 'presente' ou renovar seu pacto com o Diabo.",
    characteristics: "Apresentam fisionomia profundamente mutilada, com roupas civis rasgadas, apodrecidas e empapadas de sangue seco e fresco. Seus corpos são cobertos de cortes purulentos, hematomas severos e membros costurados rudimentarmente com linhas grossas ou perfurados por ferros oxidados. É constante a presença de arame farpado enrolado na carne viva. Carregam a 'Marca do Pacto' gravada ou tatuada a fogo na derme.",
    occultBelief: "A dor física extrema e o derramamento incondicional de sangue são a única linguagem que a Entidade escuta. Para eles, o sofrimento não é martírio, mas adoração fervorosa.",
    relations: [
      {
        targetId: "familia-montclair",
        targetName: "Família Montclair",
        type: "Convergência de Sangue",
        notes: "São atraídos magneticamente pela opulência sanguínea dos Montclair. Há indícios de que os nobres alimentam a histeria dos Transtornados para criar cortinas de fumaça e desviar o foco da Ordem."
      }
    ],
    quotes: [
      "Canibalismo, tortura e até mutilação, tudo que envolva a dor e Sangue faz parte do dia a dia dentro do inferno dos Transtornados."
    ],
    knownMembers: [
      { name: "O Açougueiro", role: "Líder Presumido / Transgressor de Sangue", status: "Ativo / Perigo Extremo", attachment: "images/o-acougueiro.jpeg" },
      { name: "Sujeito 0-Alfa ('O Costurado')", role: "Vetor de Histeria", status: "Perambulação Ativa" }
    ],
    investigationNotes: "NUNCA tentar contenção individual. Os Transtornados ignoram dor incapacitante devido à saturação de Sangue. Priorizar neutralização à distância e contenção de arame farpado contaminado."
  },
  {
    id: "ordem-do-veu-rubro",
    name: "Ordem do Véu Rubro",
    codename: "MILÍCIA DO PACTO",
    element: "Sangue",
    secondaryElement: "Morte",
    threatLevel: "Crítico",
    threatScore: 86,
    status: "Ativo // Operações Táticas Clandestinas",
    membraneDegradation: "Severa (Contenção e Rompimentos Táticos)",
    location: "Instalações militares desativadas, postos avançados e perímetros sob influência dos Montclair",
    summary: "Organização paramilitar clandestina originada de um antigo destacamento dissolvido no início dos anos 80. Atuam sob juramento de sangue a serviço da família Montclair como braço armado e cobertura.",
    behavior: "Extremamente disciplinados, silenciosos e violentos. Operam em pequenos grupos, seguindo uma rígida hierarquia militar. Frequentemente assumem a responsabilidade aparente por acontecimentos paranormais, desviando investigações e suspeitas da família Montclair.",
    characteristics: "Utilizam máscaras claras com espinhos, olhos escuros e marcas vermelhas, acompanhadas de roupas acinzentadas, lenços negros e equipamentos militares. Suas máscaras simbolizam o abandono da identidade individual em favor da Ordem.",
    occultBelief: "Acreditam que o juramento selado em sangue com a família Montclair transcende lealdades civis ou estatais, vendo na disciplina marcial e na violência ritual a única forma de quitar sua dívida de sobrevivência.",
    relations: [
      {
        targetId: "familia-montclair",
        targetName: "Família Montclair",
        type: "Subordinação / Pacto de Lealdade",
        notes: "Subordinados indiretamente à família Montclair, mantendo uma relação de dívida e obediência. Funcionam como seu braço armado e uma fachada para ocultar suas verdadeiras atividades."
      }
    ],
    quotes: [
      "Não servimos a uma bandeira. Nosso juramento foi feito em sangue, e somente o sangue poderá encerrá-lo."
    ],
    knownMembers: [
      { name: "O Primeiro Vigia", role: "Comandante Operacional / Fundador", status: "Identidade Desconhecida", attachment: "images/primeiro-vigia.jpeg" }
    ],
    investigationNotes: "Extrema cautela: agentes de campo altamente treinados com armamento tático e modificações paranormais de Sangue. Desconfiar de incidentes violentos atribuídos a eles, pois frequentemente agem para encobrir rituais dos Montclair."
  },
  {
    id: "circulo-das-sombras",
    name: "Círculo das Sombras",
    codename: "PRESENÇA OCULTA",
    element: "Morte",
    secondaryElement: "Conhecimento",
    threatLevel: "Severo",
    threatScore: 82,
    status: "Ativo // Infiltração Espacial",
    membraneDegradation: "Anômala (Distorção Temporal/Visual)",
    location: "Zonas de penumbra total, arquivos subterrâneos, vãos arquitetônicos esquecidos",
    summary: "Mais que um culto tradicional, uma rede coletiva de consciências transitórias que habitam e trocam de corpos. Afirmam que 'toda sombra deseja viver'.",
    behavior: "Não seguem hierarquia ou estrutura convencional. Manifestam-se em locais onde a luminosidade é naturalmente tênue. Realizam reuniões inteiramente mudas, sem fogo, sem tochas e sem identidades pronunciadas. Câmeras digitais e analógicas sofrem pane estática instantânea diante de seus encontros. Testemunhas relatam ouvir vozes sem origem espacial e perceber sombras descolando-se das paredes.",
    characteristics: "Trajes cerimoniais negros de tecido pesado que absorve reflexos, encimados por capuzes profundos. Sob o capuz, usam uma máscara preta completamente lisa e polida, desprovida de quaisquer orifícios para olhos, nariz ou boca. As vestes são ornamentadas com elos de correntes escuras e inscrições arcaicas gravadas nos ombros. Nenhum membro jamais foi visto desprovido do manto.",
    occultBelief: "Defendem que a matéria viva projeta sombra como um fardo involuntário, e que a verdadeira imortalidade reside em transferir a consciência para a escuridão absoluta que reside além da luz.",
    relations: [
      {
        targetId: "codice-ocular",
        targetName: "O Códice Ocular",
        type: "Antítese Filosófica",
        notes: "Enquanto o Códice busca ver tudo através da luz e da visão hipertrofiada, o Círculo extingue a luz e oculta as feições sob máscaras cegas. Conflitos velados já foram registrados em arquivos históricos."
      }
    ],
    quotes: [
      "Eles apenas esperam o momento em que a luz se apague.",
      "Eles não falam. Não respiram pesado. Nem mesmo o som dos passos deles ecoa. Às vezes eu acho que o que vi não estava realmente ali."
    ],
    knownMembers: [
      { name: "A Sombra Coletiva", role: "Consciência Não-Local", status: "Não Humano / Fluido", attachment: "images/dossie-circulo-das-sombras.jpeg" }
    ],
    investigationNotes: "Operações contra o Círculo exigem lanternas UV de alta potência e sinalizadores de magnésio. Microfones direcionais captam frequências infra-sônicas momentos antes da manifestação.",
    dossiers: [
      {
        id: "dossie-circulo-das-sombras-0427c",
        arquivoNum: "0427-C",
        nivelAcesso: "RESTRITO",
        data: "22/05/2025",
        titulo: "DOSSIÊ: CÍRCULO DAS SOMBRAS",
        subtitulo: "CULTO · RITUAL · MANIFESTAÇÕES · EVENTO DE VALTHROS",
        informacoesGerais: {
          tipo: "Culto ocultista",
          origem: "Desconhecida",
          estrutura: "Não hierárquica",
          areaAtuacao: "Global (aparições esporádicas)",
          statusAtual: "Inativo (sem registros desde 2025)",
          ameaca: "Extrema",
          associacoes: "Desconhecidas"
        },
        descricao: "Pouco se sabe sobre o Círculo das Sombras. A própria Ordo Veritatis possui registros contraditórios sobre sua origem, seus rituais e até mesmo seus líderes. Há quem afirme que o Círculo não é um culto, mas uma presença coletiva, um agrupamento de consciências que se movem entre corpos e épocas diferentes. O que os une é apenas uma ideia: \"tudo que vive projeta sombra, e toda sombra deseja viver.\"",
        comportamento: "Não seguem uma estrutura clara. Aparecem em lugares onde a luz é fraca, e realizam encontros sem som, sem fogo, sem nomes. Nenhum registro visual direto existe: câmeras simplesmente falham, e gravações terminam em estática. Quando alguém é encontrado após um contato com o Círculo, descreve \"vozes que não vêm de frente\", ou vultos que se movem quando ninguém está se mexendo.",
        caracteristicas: "Os membros do Círculo das Sombras são reconhecidos por seus trajes cerimoniais negros e pesados, sempre acompanhados de um capuz que cobre completamente o rosto. Por baixo, usam uma máscara preta lisa, sem qualquer abertura aparente. Suas roupas, adornadas por pequenos detalhes metálicos e correntes escuras, parecem ter significado ritualístico, com símbolos gravados nos ombros e costuras que lembram inscrições antigas. Nunca se observou um deles sem o manto.",
        eventoValthros: {
          titulo: "EVENTO: INVOCAÇÃO DE VALTHROS",
          descricao: "Em data não especificada, o Círculo das Sombras realizou um ritual de grande escala que resultou na invocação de Valthros, uma entidade de morte de natureza extremamente perigosa. O evento é classificado como um dos mais críticos já enfrentados pela Ordo Veritatis.",
          implicacoes: "Valthros representa apenas o início de algo maior. Indícios sugerem que o culto planejava uma série de manifestações, utilizando a entidade como primeiro marco de um processo mais amplo.",
          resolucao: "A Ordo Veritatis interveio. Após intensos confrontos e inúmeras baixas de ambos os lados, a entidade foi derrotada. O Círculo das Sombras foi desmantelado durante a operação e, desde então, não há registros de novas aparições."
        },
        agentesEnvolvidos: [
          { nome: "Oliver Bartolomeu", papel: "Agente de Campo" },
          { nome: "Guilherme Daflon", papel: "Agente de Campo" },
          { nome: "Richard Thompson", papel: "Agente de Campo" },
          { nome: "Giuseppe Cadura", papel: "Agente de Campo" }
        ],
        conclusao: "O Círculo das Sombras representa uma ameaça de nível extremo, com potencial para invocações e manifestações de grande escala. Apesar da aparente inatividade desde o evento de Valthros, a falta de informações concretas sobre sua origem e estrutura impede que sua extinção seja considerada definitiva. Recomenda-se a manutenção do monitoramento global e a atualização de protocolos de resposta, caso novos indícios sejam identificados.",
        simbolosRegistrados: "Símbolo encontrado em locais vinculados ao culto (variações observadas).",
        citacaoFinal: "\"ALGUMAS SOMBRAS AINDA CAMINHAM, MESMO QUANDO O MUNDO ESQUECE.\""
      }
    ]
  },
  {
    id: "os-ossarios",
    name: "Os Ossários",
    codename: "ESCULTORES DA MORTE",
    element: "Morte",
    secondaryElement: "Medo",
    threatLevel: "Alto",
    threatScore: 78,
    status: "Ativo // Operações Cirúrgicas Clandestinas",
    membraneDegradation: "Moderada / Entrópica",
    location: "Catacumbas, ossários centenários, necrotérios de faculdades e funerárias",
    summary: "Ordem nascida da fusão profana entre necroarqueologia e medicina forense. Encaram o esqueleto como a única verdade eterna da alma após a mentira da carne.",
    behavior: "Atuam com rigor científico e obsessão catalográfica. Extraem ossos humanos de sepulturas, necrotérios e cenas de assassinatos ocultistas. Consideram cada fragmento ósseo uma relíquia viva de memórias. Reúnem-se em pequenas células noturnas para remontar esqueletos e quimeras osteológicas através de ritos de junção paranormal.",
    characteristics: "Vestem-se inteiramente de preto com mantos esvoaçantes e capuzes cirúrgicos escuros. A marca indefectível é a máscara esculpida artesanalmente a partir de crânios humanos autênticos, entalhadas com presas ou glifos de transição. Análises periciais comprovaram tecido celular fossilizado aderido às máscaras. Peças de membros veteranos emanam aura paranormal e concedem resistência física inumana.",
    occultBelief: "A carne é efêmera, corruptível e enganosa; o osso é a estrutura perene onde a alma grava sua verdadeira identidade eterna.",
    relations: [
      {
        targetId: "familia-montclair",
        targetName: "Família Montclair",
        type: "Interesse Necrológico",
        notes: "Suspeita-se que os Ossários cobiçam as ossadas seculares depositadas nos mausoléus privados dos Montclair, gerando atritos diplomáticos velados entre as seitas."
      }
    ],
    quotes: [
      "O osso é o que sobra. E o que sobra é eterno."
    ],
    knownMembers: [
      { name: "O Ostearca", role: "Líder dos Ossários / Escultor-Mor", status: "Ativo / Perigo Extremo", attachment: "images/o-ostearca.jpeg" },
      { name: "Dr. L. Vane (Desaparecido)", role: "Ex-Cirurgião Chefe / Escultor", status: "Foragido" },
      { name: "O Arquivista de Vértebras", role: "Catalogador de Relíquias", status: "Em Investigação" }
    ],
    investigationNotes: "Recolher qualquer fragmento de máscara óssea com pinças revestidas de chumbo. O contato com a derme nua induz dormência óssea progressiva e perda de sensibilidade tátil."
  },
  {
    id: "producao-do-anfitriao",
    name: "Produção do Anfitrião",
    codename: "CAOS TRANSMITIDO",
    element: "Energia",
    secondaryElement: "Caos",
    threatLevel: "Extremo",
    threatScore: 96,
    status: "Ativo // Transmissão Clandestina Global",
    membraneDegradation: "Crítica / Vórtice Elétrico",
    location: "Estúdios subterrâneos, arenas industriais, complexos desativados e servidores Deep Web",
    summary: "Seita tecnocrata devota ao Anfitrião, a entidade máxima do Caos. Projetam armadilhas engenhosas e arenas de enigmas mortais transmitidas ao vivo como forma sádica de entretenimento.",
    behavior: "Divididos em células autônomas e competitivas por todo o globo. Usam técnicas de engenharia social e tecnologia de ponta para atrair vítimas carismáticas ou intelectuais para suas 'Salas do Anfitrião' — instalações futuristas repletas de quebra-cabeças letais e aparatos ocultistas. Todo o sofrimento e entropia gerados são transmitidos em canais ultra-protegidos da deep web para bajular a entidade e convidá-la a apresentar o espetáculo.",
    characteristics: "Usam trajes extravagantes com luzes estroboscópicas, cabeamento exposto, telas LCD embutidas nas lapelas e dispositivos que alimentam rituais com voltagem pesada. A liderança de cada célula adota o título de 'Diretor', enquanto os iniciados e técnicos atendem indistintamente por 'Produção'.",
    occultBelief: "O universo não possui sentido lógico além do puro Caos estético. O entretenimento violento e a quebra da razão são o altar supremo para agradar o Anfitrião.",
    relations: [
      {
        targetId: "herdeiros-da-chama",
        targetName: "Herdeiros da Chama",
        type: "Afinidade Térmico-Energética",
        notes: "Mantêm alianças circunstanciais: a Produção fornece sistemas de ignição eletrônica e arenas para gravações pirotécnicas em troca de rituais de queima bruta de combustível."
      }
    ],
    quotes: [
      "O palco é o altar. E o público, o sacrifício.",
      "Não existe conformidade quando se venera o Caos."
    ],
    knownMembers: [
      { name: "O Diretor", role: "Diretor de Cena / Sr. Replay", status: "Ativo / Perigo Extremo", attachment: "images/o-diretor.jpeg" },
      { name: "Equipe de Sombras & Cabos", role: "Cenógrafos Ocultistas", status: "Foragidos" }
    ],
    investigationNotes: "NÃO conectar dispositivos da Ordem a redes locais encontradas em bases da Produção. Todas as rotas possuem malware paranormal de sobrecarga eletromagnética."
  },
  {
    id: "herdeiros-da-chama",
    name: "Herdeiros da Chama",
    codename: "DEVOTOS DO FOGO PRIMORDIAL",
    element: "Energia",
    secondaryElement: "Sangue",
    threatLevel: "Crítico",
    threatScore: 89,
    status: "Ativo // Piro-Fanatismo",
    membraneDegradation: "Severa / Calor Anômalo",
    location: "Refinarias abandonadas, tanques de armazenamento de combustíveis, ruínas fabris",
    summary: "Fanáticos convictos de que o fogo é a respiração primordial do cosmos. Praticam autoimolação controlada e queima ritualística para libertar a centelha pura da matéria.",
    behavior: "Reúnem-se em ruínas industriais e desertos urbanos portando galões de acelerantes, tochas e lâmpadas de óleo. Praticam autoimolações parciais e queimam artefatos considerados mundanos ou impuros. Acreditam firmemente que a morte pelas chamas não é destruição, mas a única purificação cabível da alma.",
    characteristics: "Corpos profundamente marcados por cicatrizes queloides e queimaduras de segundo e terceiro graus. Tatuagens rituais desenhadas com pasta de cinzas humanas. Escleras oculares irritadas e avermelhadas pela fumaça contínua. Exalam cheiro persistente de querosene queimado e fuligem. Vestem mantos esfarrapados com bordas carbonizadas; a pele frequentemente se encontra calcinada e enegrecida.",
    occultBelief: "A combustão é a oração mais pura da existência: destruir a concha material para libertar a força bruta da energia contida.",
    relations: [
      {
        targetId: "producao-do-anfitriao",
        targetName: "Produção do Anfitrião",
        type: "Simbiose de Combustão",
        notes: "Participam por vezes como 'efeitos práticos vivos' nas produções cinematográficas doentias do Anfitrião, vendo nos holofotes e faíscas da produção faixas sagradas de chamas."
      }
    ],
    quotes: [
      "A chama não ilumina, ela revela.",
      "Toda luz é uma ferida. E nós somos os filhos do fogo que arde sem apagar."
    ],
    knownMembers: [
      { name: "O Estopim", role: "Arauto do Fogo / Pai da Chama", status: "Ativo / Perigo Extremo", attachment: "images/o-estopim.jpeg" },
      { name: "Voz de Cinzas", role: "Profeta da Pira", status: "Avistado em Refinaria Desativada" }
    ],
    investigationNotes: "Equipes de contenção devem trajar macacões antichama de nível militar com suprimento autônomo de ar. Ambientes ocupados pelos Herdeiros costumam estar saturados de vapores voláteis de hidrocarbonetos."
  },
  {
    id: "portadores-da-chave",
    name: "Portadores da Chave",
    codename: "GUARDIÕES DO UMBRAL",
    element: "Conhecimento",
    secondaryElement: "Morte",
    threatLevel: "Alto",
    threatScore: 79,
    status: "Ativo // Cripto-Infiltração Acadêmica",
    membraneDegradation: "Constante / Fissuras Seladas",
    location: "Arquivos históricos, bibliotecas raras, coleções particulares e cofres bancários antigos",
    summary: "Seita de ocultistas eruditos que encaram o saber proibido como portas trancadas. Dedicam-se a catalogar, selar e reter textos e símbolos até que alguém se mostre digno de destrancá-los.",
    behavior: "Extremamente discretos e metodológicos. Infiltram-se em círculos acadêmicos, hemerotecas e repositórios de pergaminhos antigos. Comunicam-se por meio de cifras esteganográficas e vocabulário codificado, agindo como se cada frase dita fosse uma chave criptográfica. Evitam contato físico a todo custo, temendo abrir involuntariamente brechas na Membrana.",
    characteristics: "Carregam consigo molhos pesados de chaves arcaicas de ferro forjado, livros selados por tiras de couro e cadeados rituais. Exibem tatuagens de fechaduras intrincadas sobre o peito e palmas das mãos. Durante rituais, cobrem-se com mantos cinzentos e vedam os olhos com faixas de linho, sustentando que a visão desprotegida pode abrir frestas indesejadas.",
    occultBelief: "O conhecimento bruto é uma força perigosa que destrói a mente despreparada. Apenas portas trancadas preservam a ordem das coisas.",
    relations: [
      {
        targetId: "codice-ocular",
        targetName: "O Códice Ocular",
        type: "Rivalidade Dogmática",
        notes: "Consideram o Códice Ocular 'hereges inconsequentes' por tentar expor a visão do Outro Lado sem a devida contenção e proteção de trancas e cifras."
      }
    ],
    quotes: [
      "Nem todo portão deve ser aberto, mas toda chave existe por um motivo."
    ],
    knownMembers: [
      { name: "O Arconte", role: "Líder dos Portadores da Chave / Custódio-Mor", status: "Ativo / Perigo Extremo", attachment: "images/o-arconte.jpeg" },
      { name: "O Curador Silencioso", role: "Arquivista Chefe", status: "Não Identificado" },
      { name: "Dra. H. Vasconcelos", role: "Paleógrafa Infiltrada", status: "Sob Monitoramento da Ordem" }
    ],
    investigationNotes: "Apreensão de grimórios dos Portadores exige caixas de contenção de aço escuro com trancas desmagnetizadas. Tentar forçar fechos sem o código ritual costuma acionar ritos de autodesintegração do manuscrito."
  },
  {
    id: "codice-ocular",
    name: "O Códice Ocular",
    codename: "OS OLHARES DO ABISMO",
    element: "Conhecimento",
    secondaryElement: "Medo",
    threatLevel: "Crítico",
    threatScore: 86,
    status: "Ativo // Transe Coletivo Contínuo",
    membraneDegradation: "Grave / Distorção Perceptiva",
    location: "Observatórios abandonados, sótãos espelhados e salas circulares forradas de símbolos",
    summary: "Cultistas obcecados pela contemplação pura do invisível. Acreditam que enxergar o Proibido aproxima o mortal da divindade, aceitando a cegueira humana como preço inevitável.",
    behavior: "Silenciosos e hiperfocados. Agrupam-se em pequenas células chamadas de 'Olhares', onde permanecem em transe absoluto por dias a fio, fitando sigilos, reflexos de espelhos escuros e geometrias não-euclidianas desenhadas em paredes até desmaiarem ou perderem a sanidade comum.",
    characteristics: "Apresentam alterações oculares drásticas: escleras cortadas por bisturi ritual, lentes de aumento e prismas cravados cirurgicamente nos tecidos ao redor das órbitas. Suas pupilas apresentam brilho retrorreflexivo como olhos de predadores na escuridão. Vestem mantos de linho branco adornados com centenas de ilustrações manuais de globos oculares. Membros de alta graduação removem cirurgicamente as próprias pálpebras.",
    occultBelief: "A visão é o primeiro e último sentido sagrado. Quanto mais se vê, menos humano se resta; mas aquele que vê tudo contempla a própria essência do Outro Lado.",
    relations: [
      {
        targetId: "portadores-da-chave",
        targetName: "Portadores da Chave",
        type: "Rivalidade Ideológica",
        notes: "Os Portadores mantêm os olhos vendados para não abrir portas erradas; o Códice arranca as pálpebras para forçar a contemplação eterna de todas as portas simultaneamente."
      }
    ],
    quotes: [
      "Todos parecem loucos, apenas repetindo que 'viram algo'."
    ],
    knownMembers: [
      { name: "O Argos", role: "Líder do Códice Ocular / O Centésimo Olho", status: "Ativo / Perigo Extremo", attachment: "images/o-argos.jpeg" },
      { name: "Irmão da Pupila Aberta", role: "Vigília Perpétua", status: "Internado em Asilo Sob Custódia" },
      { name: "A Observadora do Espelho", role: "Guia dos Olhares", status: "Desconhecido" }
    ],
    investigationNotes: "Nunca estabelecer contato visual direto prolongado com veteranos do Códice que tenham as pálpebras removidas. O reflexo em suas pupilas costuma induzir vertigem súbita e alucinações visuais paralisantes."
  }
];
