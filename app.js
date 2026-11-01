/**
 * ORDO VERITATIS // TERMINAL DE INVESTIGAÇÃO PARANORMAL
 * MOTOR DE APLICAÇÃO & INTERATIVIDADE
 */

// Estado da Aplicação
const AppState = {
  cults: [],
  selectedElement: 'Todos',
  searchQuery: '',
  currentView: 'grid', // 'grid' | 'table' | 'graph'
  activeModalCultId: null,
  soundEnabled: true,
  ambientAudioPlaying: false,
  crtActive: false,
  declassified: false
};

// ==========================================================================
// SÍNTESE DE ÁUDIO WEB (SEM DEPENDÊNCIAS EXTERNAS)
// ==========================================================================
class ParanormalAudioEngine {
  constructor() {
    this.ctx = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!AppState.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio unavailable", e);
    }
  }

  playStamp() {
    if (!AppState.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.warn("Stamp audio error", e);
    }
  }

  toggleAmbientDrone() {
    this.initContext();
    if (!this.ctx) return;

    if (this.droneOsc1) {
      // Desligar drone
      try {
        this.droneOsc1.stop();
        this.droneOsc2.stop();
        this.droneOsc1.disconnect();
        this.droneOsc2.disconnect();
      } catch (e) {}
      this.droneOsc1 = null;
      this.droneOsc2 = null;
      AppState.ambientAudioPlaying = false;
      return false;
    } else {
      // Ligar drone paranormal sutil
      try {
        this.droneGain = this.ctx.createGain();
        this.droneGain.gain.setValueAtTime(0.035, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, this.ctx.currentTime);

        this.droneOsc1 = this.ctx.createOscillator();
        this.droneOsc2 = this.ctx.createOscillator();

        this.droneOsc1.type = 'sawtooth';
        this.droneOsc1.frequency.setValueAtTime(54, this.ctx.currentTime); // Frequência baixa

        this.droneOsc2.type = 'sine';
        this.droneOsc2.frequency.setValueAtTime(57.5, this.ctx.currentTime); // Batimento binaural sutil

        this.droneOsc1.connect(filter);
        this.droneOsc2.connect(filter);
        filter.connect(this.droneGain);
        this.droneGain.connect(this.ctx.destination);

        this.droneOsc1.start();
        this.droneOsc2.start();
        AppState.ambientAudioPlaying = true;
        return true;
      } catch (e) {
        console.warn("Drone audio error", e);
        return false;
      }
    }
  }
}

const AudioEngine = new ParanormalAudioEngine();

// ==========================================================================
// INICIALIZAÇÃO & ARMAZENAMENTO LOCAL
// ==========================================================================
function initData() {
  const stored = localStorage.getItem('ordo_veritatis_cults_v1');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const existingIds = new Set(parsed.map(c => c.id));
        const missingDefaults = DEFAULT_CULTS.filter(c => !existingIds.has(c.id));

        // Sincronizar relação da Família Montclair com a Ordem do Véu Rubro caso ainda não exista
        parsed.forEach(c => {
          if (c.id === 'familia-montclair' && c.relations) {
            const hasVeuRubro = c.relations.some(r => r.targetId === 'ordem-do-veu-rubro');
            if (!hasVeuRubro) {
              c.relations.push({
                targetId: "ordem-do-veu-rubro",
                targetName: "Ordem do Véu Rubro",
                type: "Braço Armado / Fachada Tática",
                notes: "Acolhidos após uma operação paranormal na década de 1980, atuam sob pacto de lealdade como executores violentos e cortina de fumaça para proteger as verdadeiras operações dos Montclair."
              });
            }
          }
          if (c.id === 'os-ossarios') {
            const defaultOssarios = DEFAULT_CULTS.find(d => d.id === 'os-ossarios');
            if (defaultOssarios && (!c.knownMembers || !c.knownMembers.some(m => m.name === 'O Ostearca'))) {
              c.knownMembers = defaultOssarios.knownMembers;
            }
          }
          if (c.id === 'transtornados') {
            const defaultTranstornados = DEFAULT_CULTS.find(d => d.id === 'transtornados');
            if (defaultTranstornados && (!c.knownMembers || !c.knownMembers.some(m => m.name === 'O Açougueiro'))) {
              c.knownMembers = defaultTranstornados.knownMembers;
            }
          }
          if (c.id === 'producao-do-anfitriao') {
            const defaultProducao = DEFAULT_CULTS.find(d => d.id === 'producao-do-anfitriao');
            if (defaultProducao && (!c.knownMembers || !c.knownMembers.some(m => m.name === 'O Diretor'))) {
              c.knownMembers = defaultProducao.knownMembers;
            }
          }
          if (c.id === 'herdeiros-da-chama') {
            const defaultHerdeiros = DEFAULT_CULTS.find(d => d.id === 'herdeiros-da-chama');
            if (defaultHerdeiros && (!c.knownMembers || !c.knownMembers.some(m => m.name === 'O Estopim'))) {
              c.knownMembers = defaultHerdeiros.knownMembers;
            }
          }
          if (c.id === 'portadores-da-chave') {
            const defaultPortadores = DEFAULT_CULTS.find(d => d.id === 'portadores-da-chave');
            if (defaultPortadores && (!c.knownMembers || !c.knownMembers.some(m => m.name === 'O Arconte'))) {
              c.knownMembers = defaultPortadores.knownMembers;
            }
          }
          if (c.id === 'codice-ocular') {
            const defaultCodice = DEFAULT_CULTS.find(d => d.id === 'codice-ocular');
            if (defaultCodice && (!c.knownMembers || !c.knownMembers.some(m => m.name === 'O Argos'))) {
              c.knownMembers = defaultCodice.knownMembers;
            }
          }
          // Sincronizar dossiês internos do Círculo das Sombras
          if (c.id === 'circulo-das-sombras') {
            const defaultCirculo = DEFAULT_CULTS.find(d => d.id === 'circulo-das-sombras');
            if (defaultCirculo && (!c.dossiers || c.dossiers.length === 0)) {
              c.dossiers = defaultCirculo.dossiers;
            }
          }
        });

        AppState.cults = [...parsed, ...missingDefaults];
        if (missingDefaults.length > 0) {
          saveToStorage();
        }
      } else {
        AppState.cults = [...DEFAULT_CULTS];
        saveToStorage();
      }
    } catch (e) {
      console.error("Falha ao carregar localStorage, usando dados padrão", e);
      AppState.cults = [...DEFAULT_CULTS];
    }
  } else {
    AppState.cults = [...DEFAULT_CULTS];
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem('ordo_veritatis_cults_v1', JSON.stringify(AppState.cults));
}

// Helpers de Elemento
function getElementVariables(elementName) {
  switch (elementName) {
    case 'Sangue':
      return {
        color: 'var(--element-sangue)',
        glow: 'var(--element-sangue-glow)',
        bg: 'var(--element-sangue-dark)',
        border: 'var(--element-sangue-border)'
      };
    case 'Morte':
      return {
        color: 'var(--element-morte)',
        glow: 'var(--element-morte-glow)',
        bg: 'var(--element-morte-dark)',
        border: 'var(--element-morte-border)'
      };
    case 'Energia':
      return {
        color: 'var(--element-energia)',
        glow: 'var(--element-energia-glow)',
        bg: 'var(--element-energia-dark)',
        border: 'var(--element-energia-border)'
      };
    case 'Conhecimento':
      return {
        color: 'var(--element-conhecimento)',
        glow: 'var(--element-conhecimento-glow)',
        bg: 'var(--element-conhecimento-dark)',
        border: 'var(--element-conhecimento-border)'
      };
    case 'Medo':
    default:
      return {
        color: 'var(--element-medo)',
        glow: 'var(--element-medo-glow)',
        bg: 'var(--element-medo-dark)',
        border: 'var(--element-medo-border)'
      };
  }
}

function getThreatClass(threat) {
  const t = (threat || '').toLowerCase();
  if (t.includes('extremo')) return 'extremo';
  if (t.includes('crítico') || t.includes('critico')) return 'critico';
  if (t.includes('severo')) return 'severo';
  return 'alto';
}

// ==========================================================================
// RENDERIZAÇÃO DOS CULTOS
// ==========================================================================
function getFilteredCults() {
  return AppState.cults.filter(cult => {
    // Filtro por elemento
    if (AppState.selectedElement !== 'Todos' && cult.element !== AppState.selectedElement) {
      return false;
    }
    // Filtro por busca
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase();
      const matchName = cult.name.toLowerCase().includes(q);
      const matchCode = (cult.codename || '').toLowerCase().includes(q);
      const matchSummary = (cult.summary || '').toLowerCase().includes(q);
      const matchBehavior = (cult.behavior || '').toLowerCase().includes(q);
      const matchCharacteristics = (cult.characteristics || '').toLowerCase().includes(q);
      const matchQuotes = (cult.quotes || []).some(quote => quote.toLowerCase().includes(q));
      const matchElement = (cult.element || '').toLowerCase().includes(q);
      const matchRelations = (cult.relations || []).some(rel => rel.targetName.toLowerCase().includes(q));
      return matchName || matchCode || matchSummary || matchBehavior || matchCharacteristics || matchQuotes || matchElement || matchRelations;
    }
    return true;
  });
}

function renderContent() {
  const container = document.getElementById('viewContainer');
  const filtered = getFilteredCults();

  // Atualizar contadores
  const totalCountEl = document.getElementById('totalCountBadge');
  const filteredCountEl = document.getElementById('filteredCountBadge');
  if (totalCountEl) totalCountEl.textContent = AppState.cults.length;
  if (filteredCountEl) filteredCountEl.textContent = filtered.length;

  if (AppState.currentView === 'grid') {
    renderGridView(container, filtered);
  } else if (AppState.currentView === 'table') {
    renderTableView(container, filtered);
  } else if (AppState.currentView === 'graph') {
    renderGraphView(container, filtered);
  }
}

// 1. Grid de Dossiês
function renderGridView(container, cults) {
  if (cults.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted); font-family: var(--font-mono);">
        <p style="font-size: 1.1rem; color: var(--danger-red); margin-bottom: 0.5rem;">[NENHUM REGISTRO PARANORMAL LOCALIZADO]</p>
        <p style="font-size: 0.85rem;">Revise os termos de busca ou ajuste os filtros elementais da Ordo Veritatis.</p>
      </div>
    `;
    return;
  }

  const cardsHtml = cults.map((cult, idx) => {
    const vars = getElementVariables(cult.element);
    const threatClass = getThreatClass(cult.threatLevel);
    const firstQuote = cult.quotes && cult.quotes.length > 0 ? cult.quotes[0] : null;
    const relationCount = cult.relations ? cult.relations.length : 0;
    const relationName = relationCount > 0 ? cult.relations[0].targetName : 'Nenhuma catalogada';

    return `
      <article class="dossier-card" 
        style="--card-element-color: ${vars.color}; --card-element-glow: ${vars.glow}; --card-element-bg: ${vars.bg}; --card-element-border: ${vars.border};"
        onclick="openCultModal('${cult.id}')">
        
        <div class="card-top-meta">
          <span class="file-number">#OV-${cult.id.toUpperCase().substring(0, 8)}</span>
          <span class="threat-tag ${threatClass}">Ameaça: ${cult.threatLevel}</span>
        </div>

        <div class="card-header">
          <div class="card-codename">${cult.codename || 'CLASSIFICADO'}</div>
          <h3 class="card-cult-name">${cult.name}</h3>
          <div class="card-element-row">
            <span class="element-pill-badge primary">
              <span>●</span> ${cult.element}
            </span>
            ${cult.secondaryElement ? `
              <span class="element-pill-badge">
                <span>✦</span> ${cult.secondaryElement}
              </span>
            ` : ''}
          </div>
        </div>

        <p class="card-summary">${cult.summary || cult.behavior}</p>

        ${firstQuote ? `
          <div class="card-quote-box">
            "${firstQuote}"
          </div>
        ` : ''}

        <div class="card-relations-footer">
          <span class="relation-chip">
            <span>Relação:</span>
            <strong>${relationName}</strong>
          </span>
          <button class="card-inspect-btn" onclick="event.stopPropagation(); openCultModal('${cult.id}')">
            <span>Examinar Dossiê</span> ➔
          </button>
        </div>
      </article>
    `;
  }).join('');

  container.className = 'cults-grid';
  container.innerHTML = cardsHtml;
}

// 2. Tabela Tática de Investigação
function renderTableView(container, cults) {
  if (cults.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted); font-family: var(--font-mono);">Nenhum culto atende aos critérios táticos atuais.</div>`;
    return;
  }

  const rowsHtml = cults.map(cult => {
    const threatClass = getThreatClass(cult.threatLevel);
    const relSummary = cult.relations && cult.relations.length > 0
      ? cult.relations.map(r => r.targetName).join(', ')
      : 'Isolado / Em Análise';

    return `
      <tr onclick="openCultModal('${cult.id}')">
        <td>
          <span class="table-cult-name">${cult.name}</span>
          <span class="table-cult-code">${cult.codename || 'SEM REGISTRO'}</span>
        </td>
        <td>
          <span class="element-pill-badge primary">
            ● ${cult.element}
          </span>
        </td>
        <td>
          <span class="threat-tag ${threatClass}">${cult.threatLevel}</span>
        </td>
        <td style="max-width: 260px; font-size: 0.8rem;" class="text-truncate">
          ${relSummary}
        </td>
        <td style="font-family: var(--font-mono); font-size: 0.78rem;">
          ${cult.membraneDegradation || 'Estável'}
        </td>
        <td style="text-align: right;">
          <button class="action-btn" style="padding: 0.3rem 0.6rem; font-size: 0.72rem;" onclick="event.stopPropagation(); openCultModal('${cult.id}')">
            Abrir Arquivo
          </button>
        </td>
      </tr>
    `;
  }).join('');

  container.className = '';
  container.innerHTML = `
    <div class="tactical-table-wrapper">
      <table class="tactical-table">
        <thead>
          <tr>
            <th>Denominação Ocultista</th>
            <th>Elemento Primário</th>
            <th>Grau de Ameaça</th>
            <th>Relações Registradas</th>
            <th>Impacto na Membrana</th>
            <th style="text-align: right;">Ações de Campo</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

// 3. Grafo Interativo de Conexões (Canvas)
let graphAnimationId = null;
let graphNodes = [];
let hoveredNode = null;

function renderGraphView(container, cults) {
  container.className = '';
  container.innerHTML = `
    <div class="graph-container-card">
      <div class="graph-header-bar">
        <div class="graph-title-group">
          <h3>TEIA DE RELAÇÕES PARANORMAIS // ORDO VERITATIS</h3>
          <p>Mapeamento de alianças, parasitismos e conflitos entre cultos catalogados.</p>
        </div>
        <span class="hud-badge gold">NÓS VISUALIZADOS: ${cults.length}</span>
      </div>

      <div class="canvas-viewport" id="canvasViewport">
        <canvas id="relationGraphCanvas"></canvas>
      </div>

      <div class="graph-instruction-legend">
        <span>💡 Clique em qualquer nó para abrir o dossiê detalhado. Passe o mouse para destacar relações.</span>
        <span>Cores representam os Elementos: Sangue (Vermelho), Morte (Roxo), Energia (Ciano), Conhecimento (Dourado).</span>
      </div>
    </div>
  `;

  initGraphCanvas(cults);
}

function initGraphCanvas(cults) {
  const canvas = document.getElementById('relationGraphCanvas');
  const viewport = document.getElementById('canvasViewport');
  if (!canvas || !viewport) return;

  const width = Math.max(viewport.clientWidth, 640);
  const height = Math.max(viewport.clientHeight, 480);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  // Inicializar nós em círculo ou distribuição equilibrada
  const total = cults.length;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.36;

  graphNodes = cults.map((cult, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const elementColor = cult.element === 'Sangue' ? '#e63946' :
                         cult.element === 'Morte' ? '#9d4edd' :
                         cult.element === 'Energia' ? '#00f5d4' :
                         cult.element === 'Conhecimento' ? '#f4a261' : '#ffffff';

    return {
      cult,
      x,
      y,
      vx: 0,
      vy: 0,
      baseRadius: 26,
      currentRadius: 26,
      color: elementColor
    };
  });

  if (graphAnimationId) cancelAnimationFrame(graphAnimationId);

  let pulseAngle = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    pulseAngle += 0.03;

    // 1. Desenhar Linhas de Relações
    graphNodes.forEach(sourceNode => {
      const relations = sourceNode.cult.relations || [];
      relations.forEach(rel => {
        const targetNode = graphNodes.find(n => n.cult.id === rel.targetId);
        if (targetNode) {
          const isHighlighted = (hoveredNode && (hoveredNode.cult.id === sourceNode.cult.id || hoveredNode.cult.id === targetNode.cult.id));
          
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);

          if (isHighlighted) {
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 3.5;
            ctx.shadowColor = '#d4af37';
            ctx.shadowBlur = 15;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();

          // Desenhar pulso que percorre a linha
          if (isHighlighted || true) {
            const progress = (Math.sin(pulseAngle + sourceNode.x) + 1) / 2;
            const px = sourceNode.x + (targetNode.x - sourceNode.x) * progress;
            const py = sourceNode.y + (targetNode.y - sourceNode.y) * progress;

            ctx.beginPath();
            ctx.arc(px, py, isHighlighted ? 4 : 2.5, 0, Math.PI * 2);
            ctx.fillStyle = isHighlighted ? '#ffffff' : sourceNode.color;
            ctx.shadowColor = sourceNode.color;
            ctx.shadowBlur = 8;
            ctx.fill();
          }
        }
      });
    });

    // 2. Desenhar Nós
    graphNodes.forEach(node => {
      const isHovered = hoveredNode && hoveredNode.cult.id === node.cult.id;
      const targetRadius = isHovered ? 32 : 24;
      node.currentRadius += (targetRadius - node.currentRadius) * 0.15;

      // Anel externo pulsante
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.currentRadius + 4 + Math.sin(pulseAngle) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isHovered ? 18 : 6;
      ctx.stroke();

      // Fundo do nó
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0a0d14';
      ctx.fill();

      // Borda interna
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isHovered ? '#ffffff' : node.color;
      ctx.stroke();

      // Inicial ou Sigla
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${isHovered ? 13 : 11}px 'Cinzel', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initials = node.cult.name.split(' ').map(w => w[0]).slice(0, 2).join('');
      ctx.fillText(initials, node.x, node.y);

      // Nome do Culto abaixo
      ctx.font = `${isHovered ? 'bold 12px' : '11px'} 'JetBrains Mono', monospace`;
      ctx.fillStyle = isHovered ? '#ffffff' : '#9da7b8';
      ctx.fillText(node.cult.name, node.x, node.y + node.currentRadius + 16);
    });

    graphAnimationId = requestAnimationFrame(draw);
  }

  draw();

  // Interações de mouse
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found = null;
    for (const node of graphNodes) {
      const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
      if (dist <= node.currentRadius + 8) {
        found = node;
        break;
      }
    }

    if (found !== hoveredNode) {
      hoveredNode = found;
      canvas.style.cursor = found ? 'pointer' : 'default';
      if (found) AudioEngine.playClick();
    }
  };

  canvas.onclick = (e) => {
    if (hoveredNode) {
      AudioEngine.playStamp();
      openCultModal(hoveredNode.cult.id);
    }
  };
}

// ==========================================================================
// MODAL DE DOSSIÊ COMPLETO
// ==========================================================================
function openCultModal(cultId) {
  const cult = AppState.cults.find(c => c.id === cultId);
  if (!cult) return;

  AppState.activeModalCultId = cultId;
  AudioEngine.playStamp();

  const vars = getElementVariables(cult.element);
  const threatClass = getThreatClass(cult.threatLevel);

  const modalBackdrop = document.getElementById('dossierModalBackdrop');
  const modalEl = document.getElementById('dossierModalContent');

  modalEl.style.setProperty('--modal-element-color', vars.color);
  modalEl.style.setProperty('--modal-border-color', vars.border);
  modalEl.style.setProperty('--modal-glow-color', vars.glow);

  // Relações em HTML
  const relationsHtml = cult.relations && cult.relations.length > 0
    ? cult.relations.map(rel => `
        <div class="relation-link-card" onclick="openCultModal('${rel.targetId}')">
          <div class="relation-link-info">
            <strong>${rel.targetName}</strong>
            <p style="color: var(--gold-accent); font-family: var(--font-mono); font-size: 0.75rem; margin-top: 0.15rem;">[${rel.type || 'Conexão Oculta'}]</p>
            <p style="margin-top: 0.3rem;">${rel.notes || 'Sem detalhes adicionais catalogados pela Ordem.'}</p>
          </div>
          <button class="action-btn" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;">Examinar Arquivo ➔</button>
        </div>
      `).join('')
    : `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Nenhuma correlação direta documentada com outras facções até o momento.</p>`;

  // Citações / Relatos de Campo
  const quotesHtml = cult.quotes && cult.quotes.length > 0
    ? cult.quotes.map((q, idx) => `
        <div class="quote-tape-item">
          <div class="tape-meta-bar">
            <span class="tape-rec-indicator"><span class="tape-rec-dot"></span> REGISTRO RECONSTITUÍDO // FITA #${(idx + 1).toString().padStart(2, '0')}</span>
            <span style="letter-spacing: 0.08em;">ORDO VERITATIS // INTERCEPTAÇÃO</span>
          </div>
          <p class="tape-quote-text">"${q}"</p>
        </div>
      `).join('')
    : `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Nenhum relato verbal registrado em arquivos de áudio.</p>`;

  // Membros Conhecidos
  const membersHtml = cult.knownMembers && cult.knownMembers.length > 0
    ? cult.knownMembers.map(m => `
        <div class="member-card-tag">
          <span class="member-name">${m.name}</span>
          <span class="member-role">${m.role} • ${m.status || 'Ativo'}</span>
          ${m.attachment ? `
            <div style="margin-top: 0.35rem;">
              <a href="${m.attachment}" target="_blank" rel="noopener" style="color: #c9a227; font-size: 0.75rem; text-decoration: underline;">
                [ Ver Registro Visual ]
              </a>
            </div>
          ` : ''}
        </div>
      `).join('')
    : `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Identidades físicas protegidas ou desconhecidas.</p>`;

  modalEl.innerHTML = `
    <div class="modal-watermark" style="background-image: url('images/seal.jpeg');"></div>

    <div class="modal-top-tab">
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span class="hud-badge danger">CLASSIFICADO // NÍVEL IV</span>
        <span>REGISTRO: #OV-${cult.id.toUpperCase()}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.8rem;">
        <span style="color: var(--text-muted); font-size: 0.7rem;">ORDO VERITATIS ARCHIVE</span>
        <button class="modal-close-btn" onclick="closeCultModal()" title="Fechar Dossiê">✕</button>
      </div>
    </div>

    <div class="modal-scrollable-body">
      <!-- Cabeçalho do Dossiê -->
      <div class="modal-header-section">
        <div>
          <div class="modal-cult-code">${cult.codename || 'REGISTRO CONFIDENCIAL'}</div>
          <h2 class="modal-cult-title">${cult.name}</h2>
          <div class="card-element-row" style="margin-top: 0.4rem;">
            <span class="element-pill-badge primary" style="background: ${vars.bg}; border-color: ${vars.border}; color: ${vars.color}; font-size: 0.78rem;">
              ● Elemento: ${cult.element}
            </span>
            ${cult.secondaryElement ? `
              <span class="element-pill-badge" style="font-size: 0.78rem;">
                ✦ Afinidade Secundária: ${cult.secondaryElement}
              </span>
            ` : ''}
          </div>
        </div>

        <div class="modal-badge-cluster">
          <span class="classified-stamp">CONFIDENCIAL</span>
          <span class="threat-tag ${threatClass}" style="font-size: 0.82rem; padding: 0.35rem 0.8rem;">AMEAÇA: ${cult.threatLevel}</span>
        </div>
      </div>

      <!-- Métricas Táticas -->
      <div class="dossier-grid-stats">
        <div class="stat-item">
          <span class="stat-label">Estado Operacional</span>
          <span class="stat-value" style="color: var(--success-green);">${cult.status || 'Ativo'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Impacto na Membrana</span>
          <span class="stat-value" style="color: var(--element-sangue);">${cult.membraneDegradation || 'Grave'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Locais Catalogados</span>
          <span class="stat-value" style="font-size: 0.8rem;">${cult.location || 'Ambientes Ocultos'}</span>
        </div>
      </div>

      <!-- Sumário Executivo / Filosofia -->
      <div class="dossier-section">
        <h4 class="section-title">Resumo do Arquivo & Crença Ocultista</h4>
        <p class="section-text">${cult.summary || 'Informações em fase de compilação pelos agentes de campo.'}</p>
        ${cult.occultBelief ? `<p class="section-text" style="color: #f7b267; margin-top: 0.5rem; font-style: italic;"><strong>Doutrina:</strong> ${cult.occultBelief}</p>` : ''}
      </div>

      <!-- Comportamento & Modus Operandi -->
      <div class="dossier-section">
        <h4 class="section-title">Comportamento Operacional & Modus Operandi</h4>
        <p class="section-text">${cult.behavior || 'Comportamento não catalogado.'}</p>
      </div>

      <!-- Características Visuais & Rituais -->
      <div class="dossier-section">
        <h4 class="section-title">Características Físicas, Indumentária & Rituais</h4>
        <p class="section-text">${cult.characteristics || 'Características sob investigação.'}</p>
      </div>

      <!-- Relatos de Campo & Citações -->
      <div class="dossier-section">
        <h4 class="section-title">Relatos de Testemunhas & Interceptações de Áudio</h4>
        <div class="quote-tapes">
          ${quotesHtml}
        </div>
      </div>

      <!-- Relações com Outros Cultos -->
      <div class="dossier-section">
        <h4 class="section-title">Teia de Relações Paranormais</h4>
        <div class="relation-links-box">
          ${relationsHtml}
        </div>
      </div>

      <!-- Dossiês Internos (exclusivo por culto) -->
      ${cult.dossiers && cult.dossiers.length > 0 ? `
        <div class="dossier-section">
          <h4 class="section-title" style="color: var(--danger-red); border-color: var(--danger-red);">
            ⚠ DOSSIÊS INTERNOS // CATEGORIA RESTRITA
          </h4>
          <div class="internal-dossiers-list">
            ${cult.dossiers.map((dos, di) => `
              <div class="internal-dossier-card" id="internaldos-${di}">
                <div class="internal-dossier-header" onclick="toggleInternalDossier('internaldos-${di}')">
                  <div style="display:flex; flex-direction:column; gap:0.15rem;">
                    <span class="internal-dos-file">ARQUIVO Nº ${dos.arquivoNum} &nbsp;|&nbsp; NÍVEL DE ACESSO: <span style="color:var(--danger-red);">${dos.nivelAcesso}</span> &nbsp;|&nbsp; DATA: ${dos.data}</span>
                    <span class="internal-dos-title">${dos.titulo}</span>
                    <span class="internal-dos-subtitle">${dos.subtitulo || ''}</span>
                  </div>
                  <span class="internal-dos-toggle-icon">▼</span>
                </div>
                <div class="internal-dossier-body">

                  <div class="internal-dos-grid">
                    <div class="internal-dos-info-table">
                      <h5 class="internal-dos-section-label">INFORMAÇÕES GERAIS</h5>
                      <table class="dos-info-table">
                        <tbody>
                          <tr><td>TIPO</td><td>${dos.informacoesGerais.tipo}</td></tr>
                          <tr><td>ORIGEM</td><td>${dos.informacoesGerais.origem}</td></tr>
                          <tr><td>ESTRUTURA</td><td>${dos.informacoesGerais.estrutura}</td></tr>
                          <tr><td>ÁREA DE ATUAÇÃO</td><td>${dos.informacoesGerais.areaAtuacao}</td></tr>
                          <tr><td>STATUS ATUAL</td><td>${dos.informacoesGerais.statusAtual}</td></tr>
                          <tr><td>AMEAÇA</td><td style="color:var(--danger-red); font-weight:bold;">${dos.informacoesGerais.ameaca}</td></tr>
                          <tr><td>ASSOCIAÇÕES</td><td>${dos.informacoesGerais.associacoes}</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="internal-dos-caracteristicas-col">
                      <h5 class="internal-dos-section-label">CARACTERÍSTICAS</h5>
                      <p class="internal-dos-text">${dos.caracteristicas}</p>
                      <div class="internal-dos-simbolo-box">
                        <span class="internal-dos-simbolo-text">${dos.simbolosRegistrados}</span>
                      </div>
                    </div>
                  </div>

                  <div class="internal-dos-section">
                    <h5 class="internal-dos-section-label">DESCRIÇÃO</h5>
                    <p class="internal-dos-text">${dos.descricao}</p>
                  </div>

                  <div class="internal-dos-section">
                    <h5 class="internal-dos-section-label">COMPORTAMENTO</h5>
                    <p class="internal-dos-text">${dos.comportamento}</p>
                  </div>

                  ${dos.eventoValthros ? `
                  <div class="internal-dos-section internal-dos-evento">
                    <h5 class="internal-dos-section-label" style="color: var(--danger-red);">${dos.eventoValthros.titulo}</h5>
                    <p class="internal-dos-text">${dos.eventoValthros.descricao}</p>
                    <p class="internal-dos-text" style="margin-top:0.5rem;">${dos.eventoValthros.implicacoes}</p>
                    <p class="internal-dos-text" style="margin-top:0.5rem;">${dos.eventoValthros.resolucao}</p>
                  </div>
                  ` : ''}

                  ${dos.agentesEnvolvidos && dos.agentesEnvolvidos.length > 0 ? `
                  <div class="internal-dos-section">
                    <h5 class="internal-dos-section-label">AGENTES ENVOLVIDOS (OPERAÇÃO SÃO PAULO)</h5>
                    <div class="dos-agents-grid">
                      ${dos.agentesEnvolvidos.map(ag => `
                        <div class="dos-agent-tag">
                          <span class="dos-agent-name">${ag.nome}</span>
                          <span class="dos-agent-role">${ag.papel}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                  ` : ''}

                  <div class="internal-dos-section internal-dos-conclusao">
                    <h5 class="internal-dos-section-label">CONCLUSÃO</h5>
                    <p class="internal-dos-text">${dos.conclusao}</p>
                  </div>

                  <div class="internal-dos-footer">
                    <span class="internal-dos-org">ORDO VERITATIS &nbsp;·&nbsp; D.C.E.P.</span>
                    <span class="internal-dos-quote">${dos.citacaoFinal || ''}</span>
                  </div>

                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Membros Conhecidos & Gestão de Pessoal -->
      <div class="dossier-section">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 class="section-title" style="border: none; padding: 0;">Membros Catalogados</h4>
          <button class="action-btn secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" onclick="promptAddMember('${cult.id}')">
            + Adicionar Suspeito
          </button>
        </div>
        <div class="members-tag-list" id="modalMembersList">
          ${membersHtml}
        </div>
      </div>

      <!-- Bloco de Notas do Agente / Mestre -->
      <div class="dossier-section">
        <h4 class="section-title">Notas Confidenciais do Agente (Auto-Salvas)</h4>
        <textarea class="investigator-notes-area" id="cultNotesInput" placeholder="Insira aqui observações de investigação, pistas descobertas pelos agentes na sessão de RPG, fraquezas ou nomes de NPCs..." oninput="saveCurrentCultNotes('${cult.id}', this.value)">${cult.investigationNotes || ''}</textarea>
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); align-self: flex-end;">Alterações são gravadas automaticamente no terminal local.</span>
      </div>
    </div>

    <!-- Rodapé de Ações do Dossiê -->
    <div class="modal-footer-actions">
      <div style="display: flex; gap: 0.6rem;">
        <button class="action-btn" onclick="window.print()">
          🖨️ Imprimir Dossiê
        </button>
        <button class="action-btn secondary" onclick="exportSingleCult('${cult.id}')">
          💾 Baixar Ficha (JSON)
        </button>
      </div>
      <button class="action-btn secondary" onclick="closeCultModal()">
        Fechar Arquivo
      </button>
    </div>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function toggleInternalDossier(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const body = card.querySelector('.internal-dossier-body');
  const icon = card.querySelector('.internal-dos-toggle-icon');
  const isOpen = card.classList.contains('expanded');
  if (isOpen) {
    card.classList.remove('expanded');
    if (body) body.style.display = 'none';
    if (icon) icon.textContent = '▼';
  } else {
    card.classList.add('expanded');
    if (body) body.style.display = 'block';
    if (icon) icon.textContent = '▲';
  }
  AudioEngine.playClick();
}

function closeCultModal() {
  const modalBackdrop = document.getElementById('dossierModalBackdrop');
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
  AppState.activeModalCultId = null;
  AudioEngine.playClick();
}

function saveCurrentCultNotes(cultId, newNotes) {
  const cult = AppState.cults.find(c => c.id === cultId);
  if (cult) {
    cult.investigationNotes = newNotes;
    saveToStorage();
  }
}

function promptAddMember(cultId) {
  const name = prompt("Nome ou codinome do suspeito/membro a registrar:");
  if (!name || name.trim() === '') return;

  const role = prompt("Função ou papel no culto (ex: 'Líder', 'Iniciado', 'Sacrifício'):", "Membro Ativo");

  const cult = AppState.cults.find(c => c.id === cultId);
  if (cult) {
    if (!cult.knownMembers) cult.knownMembers = [];
    cult.knownMembers.push({
      name: name.trim(),
      role: role ? role.trim() : 'Membro Ativo',
      status: 'Sob Investigação'
    });
    saveToStorage();
    openCultModal(cultId); // Atualiza modal
  }
}

function exportSingleCult(cultId) {
  const cult = AppState.cults.find(c => c.id === cultId);
  if (!cult) return;

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cult, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `dossie_${cult.id}.json`);
  dlAnchorElem.click();
}

// ==========================================================================
// MODAL: REGISTRAR NOVO CULTO (FERRAMENTA DO MESTRE)
// ==========================================================================
function openNewCultModal() {
  AudioEngine.playClick();
  document.getElementById('newCultModalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNewCultModal() {
  document.getElementById('newCultModalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  AudioEngine.playClick();
}

function handleNewCultSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const name = form.name.value.trim();
  const codename = form.codename.value.trim();
  const element = form.element.value;
  const secondaryElement = form.secondaryElement.value;
  const threatLevel = form.threatLevel.value;
  const summary = form.summary.value.trim();
  const behavior = form.behavior.value.trim();
  const characteristics = form.characteristics.value.trim();
  const quotesRaw = form.quotes.value.trim();
  const quotes = quotesRaw ? quotesRaw.split('\n').filter(q => q.trim() !== '') : [];
  const location = form.location.value.trim();
  const relationTarget = form.relationTarget.value.trim();

  const id = name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const newCult = {
    id: id || `culto-${Date.now()}`,
    name,
    codename: codename || 'SEITA NÃO REGISTRADA',
    element,
    secondaryElement: secondaryElement || null,
    threatLevel,
    threatScore: 80,
    status: "Ativo // Recém Descoberto",
    membraneDegradation: "Sob Análise",
    location: location || "Desconhecido",
    summary: summary || behavior.substring(0, 140) + '...',
    behavior,
    characteristics,
    quotes,
    relations: relationTarget ? [{ targetId: 'sob-analise', targetName: relationTarget, type: 'Em Investigação', notes: '' }] : [],
    knownMembers: [],
    investigationNotes: "Culto catalogado recentemente no sistema da Ordo Veritatis."
  };

  AppState.cults.unshift(newCult);
  saveToStorage();
  closeNewCultModal();
  renderContent();
  form.reset();
  AudioEngine.playStamp();
  openCultModal(newCult.id);
}

// ==========================================================================
// EXPORTAR & IMPORTAR BANCO DE DADOS
// ==========================================================================
function exportDatabase() {
  AudioEngine.playClick();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.cults, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `ordo_veritatis_cultos_${new Date().toISOString().slice(0, 10)}.json`);
  dlAnchor.click();
}

function triggerImportDatabase() {
  AudioEngine.playClick();
  const input = document.getElementById('importFileInput');
  if (input) input.click();
}

function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.cults = parsed;
        saveToStorage();
        renderContent();
        alert(`Arquivo carregado com sucesso! ${parsed.length} cultos sincronizados.`);
      } else {
        alert("Formato de arquivo inválido. Deve ser um array de cultos.");
      }
    } catch (err) {
      alert("Erro ao ler o arquivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetToDefaultDatabase() {
  if (confirm("Tem certeza que deseja restaurar a base original da Ordo Veritatis? Todas as anotações customizadas serão redefinidas.")) {
    AppState.cults = JSON.parse(JSON.stringify(DEFAULT_CULTS));
    saveToStorage();
    renderContent();
    AudioEngine.playStamp();
    alert("Base restaurada com sucesso.");
  }
}

// ==========================================================================
// CONTROLE DE EVENTOS & INTERFACE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initData();

  // Relógio do Sistema
  function updateTime() {
    const timeEl = document.getElementById('liveClock');
    if (timeEl) {
      const now = new Date();
      timeEl.textContent = now.toTimeString().split(' ')[0] + ' BRT';
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Busca em tempo real
  const searchInput = document.getElementById('searchField');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderContent();
    });
  }

  // Filtros elementais
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      AudioEngine.playClick();
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.selectedElement = pill.getAttribute('data-element');
      renderContent();
    });
  });

  // Alternador de Visualização (Grid, Tabela, Grafo)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AudioEngine.playClick();
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.currentView = btn.getAttribute('data-view');
      renderContent();
    });
  });

  // Alternar CRT
  const crtBtn = document.getElementById('toggleCrtBtn');
  if (crtBtn) {
    crtBtn.addEventListener('click', () => {
      AudioEngine.playClick();
      AppState.crtActive = !AppState.crtActive;
      document.body.classList.toggle('crt-active', AppState.crtActive);
      crtBtn.classList.toggle('active', AppState.crtActive);
    });
  }

  // Alternar Efeitos Sonoros & Drone
  const soundBtn = document.getElementById('toggleSoundBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isPlaying = AudioEngine.toggleAmbientDrone();
      soundBtn.classList.toggle('active', isPlaying);
      soundBtn.innerHTML = isPlaying ? `🔊 Som Ativo` : `🔇 Áudio Ambiente`;
    });
  }

  // Desclassificar / Revelar Segredos
  const declassBtn = document.getElementById('toggleDeclassifyBtn');
  if (declassBtn) {
    declassBtn.addEventListener('click', () => {
      AudioEngine.playStamp();
      AppState.declassified = !AppState.declassified;
      document.body.classList.toggle('declassified', AppState.declassified);
      declassBtn.classList.toggle('active', AppState.declassified);
      declassBtn.innerHTML = AppState.declassified ? `🔓 Segredos Desclassificados` : `🔒 Modo Redigido`;
    });
  }

  // Fechar modais com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCultModal();
      closeNewCultModal();
    }
  });

  // Fechar clicando no backdrop
  document.getElementById('dossierModalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'dossierModalBackdrop') closeCultModal();
  });

  document.getElementById('newCultModalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'newCultModalBackdrop') closeNewCultModal();
  });

  // Renderizar inicial
  renderContent();
});
