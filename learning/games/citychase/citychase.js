(function () {
  "use strict";

  const GAME_ID = "citychase";
  const NAME_KEY = "classPlayerName";
  const MESSAGE = Object.freeze({ ACTION: "CITYCHASE_ACTION", STATE: "CITYCHASE_STATE", ERROR: "CITYCHASE_ERROR" });
  const Board = window.CityChaseData;
  const $ = id => document.getElementById(id);
  const savedName = String(localStorage.getItem(NAME_KEY) || "").trim();

  let lobby = null;
  let state = null;
  let actionPending = false;
  let toastTimer = null;
  let placementMode = null;
  let trickNode = null;
  let activeSecret = "gem1";
  let setupSelection = { gem1: null, gem2: null, undercover: null };

  function myId() { return lobby?.snapshot().myId || ""; }
  function me() { return state?.players.find(player => player.id === myId()) || null; }
  function currentPawn() { return state?.pawns.find(pawn => pawn.id === state.turnPawnId) || null; }
  function pawnById(id) { return state?.pawns.find(pawn => pawn.id === id) || null; }
  function playerById(id) { return state?.players.find(player => player.id === id) || null; }
  function buildingMeta(id) { return Board.BUILDINGS.find(building => building.id === id) || null; }
  function avatarOf(playerId) {
    const key = lobby?.snapshot().players?.[playerId]?.avatarKey;
    return key ? window.ClassroomMultiplayerLobby.avatarUrl(key) : "";
  }

  function pawnControllers(pawnId) {
    return state.players.filter(player => player.pawnIds.includes(pawnId));
  }

  function firstLetter(name) {
    return Array.from(String(name || "?").trim())[0] || "?";
  }
  function nodeMeta(id) { return Board.NODES[id] || null; }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $("toast").textContent = message;
    $("toast").classList.remove("hidden");
    toastTimer = setTimeout(() => $("toast").classList.add("hidden"), 2600);
  }

  function sendAction(action, data = {}) {
    if (actionPending) return false;
    actionPending = true;
    const sent = lobby.sendServer({ type: MESSAGE.ACTION, action, ...data });
    if (!sent) {
      actionPending = false;
      showToast("서버에 행동을 보내지 못했습니다.");
      return false;
    }
    return true;
  }

  function showRules() { $("rulesOverlay").classList.remove("hidden"); }
  function hideRules() { $("rulesOverlay").classList.add("hidden"); }

  function drawArrow(ctx, from, to, color) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const cx = from.x + dx * .58;
    const cy = from.y + dy * .58;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx + ux * 9, cy + uy * 9);
    ctx.lineTo(cx - ux * 8 - uy * 7, cy - uy * 8 + ux * 7);
    ctx.lineTo(cx - ux * 8 + uy * 7, cy - uy * 8 - ux * 7);
    ctx.closePath();
    ctx.fill();
  }

  function drawBoard() {
    const canvas = $("boardCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, Board.WIDTH, Board.HEIGHT);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const edge of Board.EDGES) {
      const a = nodeMeta(edge.a);
      const b = nodeMeta(edge.b);
      if (!a || !b) continue;
      const isRail = edge.kind === "rail";
      const isThief = edge.kind === "thief-lane";
      const isPolice = edge.kind === "police-lane";
      const accent = isRail ? "#8e5c23" : isThief ? "#c92f4f" : isPolice ? "#2362b7" : "#233d31";
      const inner = isRail ? "#efb75a" : isThief ? "#ee5e78" : isPolice ? "#5d9fe5" : "#fff8df";
      ctx.globalAlpha = isRail || isThief || isPolice ? .92 : .86;
      ctx.strokeStyle = accent;
      ctx.lineWidth = isRail ? 14 : isThief || isPolice ? 13 : 16;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.strokeStyle = inner;
      ctx.lineWidth = isRail ? 7 : isThief || isPolice ? 7 : 10;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.globalAlpha = 1;
      if (edge.oneWay) drawArrow(ctx, a, b, accent);
    }
  }

  function positionStyle(x, y) {
    return `left:${(x / Board.WIDTH) * 100}%;top:${(y / Board.HEIGHT) * 100}%`;
  }

  function contentLabel(content) {
    return content === "gem" ? "보석" : content === "undercover" ? "잠복경찰" : content === "empty" ? "비어 있음" : "확인 전";
  }

  function contentBadge(content) {
    if (content === "gem") {
      return `<svg class="secretIcon gemIcon" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5h16l6 8-14 16L2 13z"/><path class="facet" d="m8 5 8 24 8-24M2 13h28M8 5l-6 8m22-8 6 8"/></svg>`;
    }
    if (content === "undercover") {
      return `<svg class="secretIcon undercoverIcon" viewBox="0 0 32 32" aria-hidden="true"><path class="hat" d="M5 12h22l-4-7H9z"/><circle class="face" cx="16" cy="18" r="10"/><path class="glasses" d="M7 16h4l2 4h3l2-4h7M7 16l1 5h5l1-5m4 0 1 5h5l1-5"/><path class="smile" d="M13 24q3 2 6 0"/></svg>`;
    }
    if (content === "empty") {
      return `<svg class="secretIcon emptyIcon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13"/><path d="m9 16 5 5 9-11"/></svg>`;
    }
    return `<span class="secretUnknown" aria-hidden="true">?</span>`;
  }

  function pawnFaceMarkup(controllers) {
    const faces = controllers.slice(0, 2).map(player => {
      const url = avatarOf(player.id);
      return url
        ? `<img class="pawnAvatar" src="${escapeHtml(url)}" alt="">`
        : `<span class="pawnInitial">${escapeHtml(firstLetter(player.name))}</span>`;
    }).join("");
    return `<span class="pawnFaces${controllers.length > 1 ? " shared" : ""}">${faces || '<span class="pawnInitial">?</span>'}</span>`;
  }

  function renderBuildings() {
    const layer = $("buildingsLayer");
    const fragment = document.createDocumentFragment();
    const captainSetup = !!state?.canSetup;
    for (const building of Board.BUILDINGS) {
      const knowledge = state?.buildings.find(item => item.id === building.id) || { content: "hidden" };
      const button = document.createElement("button");
      button.type = "button";
      button.className = "building";
      button.style.cssText = `${positionStyle(building.x, building.y)};--building:${building.color}`;
      button.disabled = !captainSetup;
      button.setAttribute("aria-label", `${building.name}${knowledge.content === "hidden" ? "" : `, ${contentLabel(knowledge.content)}`}`);
      const selectedKey = Object.entries(setupSelection).find(([, value]) => value === building.id)?.[0];
      if (captainSetup) button.classList.add("setupTarget");
      if (selectedKey?.startsWith("gem")) button.classList.add("selectedGem");
      if (selectedKey === "undercover") button.classList.add("selectedUndercover");
      button.innerHTML = `<span class="buildingIcon">${building.icon}</span><span class="buildingName">${escapeHtml(building.name)}</span><span class="buildingKnowledge">${selectedKey ? contentBadge(selectedKey === "undercover" ? "undercover" : "gem") : contentBadge(knowledge.content)}</span>`;
      button.addEventListener("click", () => selectSetupBuilding(building.id));
      fragment.appendChild(button);
    }
    layer.replaceChildren(fragment);
  }

  function emptyNodeForCard(id) {
    return !state.pawns.some(pawn => pawn.position === id) && !state.tricks.some(card => card.nodeId === id) && !state.checks.some(card => card.nodeId === id);
  }

  function trickDirections() {
    if (!trickNode) return [];
    return Board.neighbors(trickNode, "police").map(item => item.id);
  }

  function nodeTargetClass(id) {
    if (!state) return "";
    if (state.turnMode === "moving" && state.validMoves.includes(id)) return "valid";
    if (state.pending?.type === "teleport" && state.pending.options.includes(id)) return "pendingTarget";
    if (placementMode === "trick-node" && nodeMeta(id)?.trickSlot && emptyNodeForCard(id)) return "cardTarget";
    if (placementMode === "trick-direction" && trickDirections().includes(id)) return "cardTarget cardDirection";
    if (placementMode === "check" && nodeMeta(id)?.inspectionSlot && emptyNodeForCard(id)) return "cardTarget";
    return "";
  }

  function renderNodes() {
    const layer = $("nodesLayer");
    const fragment = document.createDocumentFragment();
    for (const node of Object.values(Board.NODES)) {
      const button = document.createElement("button");
      button.type = "button";
      const targetClass = nodeTargetClass(node.id);
      button.className = `node ${targetClass}`.trim();
      button.style.cssText = positionStyle(node.x, node.y);
      button.dataset.tone = node.tone || "";
      button.dataset.kind = node.kind || "road";
      if (node.dense) button.dataset.dense = "true";
      if (node.start) button.dataset.start = node.start;
      if (node.station) button.dataset.station = String(node.station);
      button.disabled = !targetClass || actionPending;
      button.title = node.label;
      button.setAttribute("aria-label", node.label);
      button.textContent = node.start === "thief"
        ? "도둑 아지트"
        : node.start === "police"
          ? "경찰 감옥"
          : node.station ? String(node.station) : node.kind === "building" ? "⌂" : node.effect ? "!" : "";
      button.addEventListener("click", () => handleNodeClick(node.id));
      fragment.appendChild(button);
    }
    layer.replaceChildren(fragment);
  }

  function renderCards() {
    const layer = $("cardsLayer");
    const fragment = document.createDocumentFragment();
    for (const card of state.tricks) {
      const node = nodeMeta(card.nodeId);
      const marker = document.createElement("div");
      marker.className = "boardCard trick";
      marker.style.cssText = positionStyle(node.x, node.y);
      marker.textContent = "➜";
      marker.title = `속임수 · ${nodeMeta(card.nextNodeId)?.label || "화살표"} 방향`;
      fragment.appendChild(marker);
    }
    for (const card of state.checks) {
      const node = nodeMeta(card.nodeId);
      const marker = document.createElement("div");
      marker.className = "boardCard check";
      marker.style.cssText = positionStyle(node.x, node.y);
      marker.textContent = "검";
      marker.title = "검문 카드";
      fragment.appendChild(marker);
    }
    layer.replaceChildren(fragment);
  }

  function renderPawns() {
    const layer = $("piecesLayer");
    const fragment = document.createDocumentFragment();
    const groups = new Map();
    for (const pawn of state.pawns) {
      if (!groups.has(pawn.position)) groups.set(pawn.position, []);
      groups.get(pawn.position).push(pawn);
    }
    for (const [position, pawns] of groups) {
      const node = nodeMeta(position);
      if (!node) continue;
      pawns.forEach((pawn, index) => {
        const button = document.createElement("button");
        button.type = "button";
        const choice = state.pending && ["transfer", "rescue"].includes(state.pending.type) && state.pending.options.includes(pawn.id);
        const offsetX = (index % 3 - Math.min(1, pawns.length - 1)) * 60;
        const offsetY = Math.floor(index / 3) * 25 - (pawns.length > 3 ? 11 : 0);
        button.className = `pawn ${pawn.team}${pawn.carryingGem ? " carrying" : ""}${pawn.status === "jailed" ? " jailed" : ""}${pawn.id === state.turnPawnId ? " current" : ""}${choice ? " choice" : ""}`;
        button.style.cssText = positionStyle(node.x + offsetX, node.y + offsetY);
        const controllers = pawnControllers(pawn.id);
        const names = controllers.map(player => player.name).join("·") || `${teamName(pawn.team)}팀`;
        button.innerHTML = `<span class="pawnName">${escapeHtml(names)}</span>${pawnFaceMarkup(controllers)}<span class="pawnNumber">${pawn.number}</span>`;
        button.setAttribute("aria-label", `${names}, ${pawn.team === "police" ? "경찰" : "도둑"} ${pawn.number}번${pawn.carryingGem ? ", 보석 소지" : ""}`);
        button.disabled = !choice || actionPending;
        if (choice) button.addEventListener("click", () => sendAction("CHOOSE", { choiceId: pawn.id }));
        fragment.appendChild(button);
      });
    }
    layer.replaceChildren(fragment);
  }

  function handleNodeClick(nodeId) {
    if (actionPending || !state) return;
    if (state.turnMode === "moving" && state.validMoves.includes(nodeId)) {
      sendAction("MOVE", { nodeId });
      return;
    }
    if (state.pending?.type === "teleport" && state.pending.options.includes(nodeId)) {
      sendAction("CHOOSE", { choiceId: nodeId });
      return;
    }
    if (placementMode === "trick-node" && nodeMeta(nodeId)?.trickSlot && emptyNodeForCard(nodeId)) {
      trickNode = nodeId;
      placementMode = "trick-direction";
      showToast("경찰을 보낼 화살표 방향을 선택하세요.");
      renderBoardState();
      return;
    }
    if (placementMode === "trick-direction" && trickDirections().includes(nodeId)) {
      sendAction("PLACE_TRICK", { nodeId: trickNode, nextNodeId: nodeId });
      placementMode = null;
      trickNode = null;
      return;
    }
    if (placementMode === "check" && nodeMeta(nodeId)?.inspectionSlot && emptyNodeForCard(nodeId)) {
      sendAction("PLACE_CHECK", { nodeId });
      placementMode = null;
    }
  }

  function renderBoardState() {
    if (!state || state.phase === "lobby") return;
    renderBuildings();
    renderNodes();
    renderCards();
    renderPawns();
  }

  function selectedName(key) {
    return buildingMeta(setupSelection[key])?.name || "선택 안 됨";
  }

  function selectSetupBuilding(buildingId) {
    if (!state?.canSetup) return;
    for (const key of Object.keys(setupSelection)) {
      if (key !== activeSecret && setupSelection[key] === buildingId) setupSelection[key] = null;
    }
    setupSelection[activeSecret] = buildingId;
    activeSecret = activeSecret === "gem1" ? "gem2" : activeSecret === "gem2" ? "undercover" : "undercover";
    renderSetup();
    renderBuildings();
  }

  function renderSetup() {
    const setup = state?.phase === "setup";
    $("setupCard").classList.toggle("hidden", !setup);
    if (!setup) return;
    const canSetup = state.canSetup;
    $("secretTabs").classList.toggle("hidden", !canSetup);
    $("confirmSetupBtn").classList.toggle("hidden", !canSetup);
    $("setupTitle").textContent = canSetup ? "비밀 물건 배치" : state.myTeam === "police" ? "경찰팀 대표가 배치 중" : "경찰팀이 비밀 배치 중";
    $("setupGuide").textContent = canSetup
      ? "서로 다른 건물에 보석 2개와 잠복경찰을 숨기세요. 건물을 누르면 선택한 물건이 배치됩니다."
      : state.myTeam === "police" ? "팀 대표의 선택이 끝나면 함께 위치를 확인할 수 있습니다." : "보석과 잠복경찰이 어디에 숨겨지는지는 도둑팀에게 보이지 않습니다.";
    document.querySelectorAll(".secretTab").forEach(button => button.classList.toggle("active", button.dataset.secret === activeSecret));
    $("setupSummary").innerHTML = canSetup
      ? `<span>${contentBadge("gem")} 보석 1 · ${escapeHtml(selectedName("gem1"))}</span><span>${contentBadge("gem")} 보석 2 · ${escapeHtml(selectedName("gem2"))}</span><span>${contentBadge("undercover")} 잠복경찰 · ${escapeHtml(selectedName("undercover"))}</span>`
      : "<span>비밀 배치가 끝날 때까지 잠시 기다려 주세요.</span>";
    const values = Object.values(setupSelection);
    $("confirmSetupBtn").disabled = !canSetup || values.some(value => !value) || new Set(values).size !== 3 || actionPending;
  }

  function teamName(team) { return team === "police" ? "경찰팀" : team === "thief" ? "도둑팀" : "팀 배정 전"; }

  function renderHeader() {
    const pawn = currentPawn();
    $("gameRoomCode").textContent = lobby.snapshot().roomCode || "----";
    if (state.phase === "setup") {
      $("turnHeadline").textContent = "경찰팀 비밀 배치";
      $("turnSubline").textContent = state.lastAction;
      return;
    }
    if (state.phase === "ended") {
      $("turnHeadline").textContent = `${teamName(state.winnerTeam)} 승리`;
      $("turnSubline").textContent = state.lastAction;
      return;
    }
    const controllers = state.turnControllers.map(id => playerById(id)?.name).filter(Boolean).join(" · ");
    $("turnHeadline").textContent = state.canAct ? `내 차례 · ${teamName(pawn.team)} ${pawn.number}번` : `${controllers || "플레이어"} 차례 · ${teamName(pawn.team)} ${pawn.number}번`;
    $("turnSubline").textContent = state.lastAction;
  }

  function renderIdentity() {
    const team = state.myTeam;
    const crest = $("teamCrest");
    crest.className = `teamCrest ${team || ""}`;
    crest.textContent = team === "police" ? "♜" : team === "thief" ? "♟" : "?";
    $("teamTitle").textContent = teamName(team);
    $("teamMission").textContent = team === "police" ? "도둑 3명을 모두 체포하세요." : team === "thief" ? "보석 2개를 아지트로 운반하세요." : "게임이 시작되면 역할이 정해집니다.";
  }

  function renderProgress() {
    $("gemProgress").textContent = `${state.resources.thief.securedGems} / 2`;
    const arrested = state.pawns.filter(pawn => pawn.team === "thief" && pawn.status === "jailed").length;
    $("arrestProgress").textContent = `${arrested} / 3`;
    $("roundText").textContent = `${state.turnNumber || 1}라운드`;
  }

  function renderTurnCard() {
    const show = state.phase === "playing";
    $("turnCard").classList.toggle("hidden", !show);
    $("actionCard").classList.toggle("hidden", !show);
    if (!show) return;
    const pawn = currentPawn();
    $("pawnTitle").textContent = `${teamName(pawn.team)} ${pawn.number}번 차례${state.canAct ? " · 나" : ""}`;
    $("turnMessage").textContent = state.lastAction;
    $("dieFace").textContent = state.die || "·";
    $("remainingText").textContent = state.turnMode === "moving" ? `${state.remaining}칸 남음` : state.turnMode === "pending" ? "선택 대기" : pawn.status === "jailed" ? "탈출 주사위" : "주사위 대기";
    $("movementHint").textContent = state.turnMode === "moving" ? "말판의 빛나는 칸을 누르세요." : state.canAct ? "아래에서 행동을 선택하세요." : "현재 플레이어의 행동을 기다립니다.";
  }

  function makeAction(label, className, handler, disabled = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `teamAction ${className}`;
    button.textContent = label;
    button.disabled = disabled || actionPending;
    button.addEventListener("click", handler);
    return button;
  }

  function cancelPlacement() {
    placementMode = null;
    trickNode = null;
    renderActions();
    renderBoardState();
  }

  function renderActions() {
    if (state.phase !== "playing") return;
    const stack = $("actionStack");
    const fragment = document.createDocumentFragment();
    let hint = "현재 플레이어의 행동을 기다리는 중입니다.";
    if (state.canAct) {
      if (placementMode) {
        const text = placementMode === "trick-node" ? "속임수를 놓을 분홍 표시 칸을 선택하세요." : placementMode === "trick-direction" ? "경찰을 보낼 다음 칸을 선택하세요." : "검문을 놓을 파란 표시 칸을 선택하세요.";
        fragment.appendChild(makeAction("카드 배치 취소", "", cancelPlacement));
        hint = text;
      } else if (state.actions.roll) {
        const pawn = currentPawn();
        fragment.appendChild(makeAction(pawn.status === "jailed" ? "🎲 탈출 주사위" : "🎲 주사위 던지기", "roll", () => sendAction("ROLL")));
        if (state.actions.hide) fragment.appendChild(makeAction(`안전지대에서 숨기 (${pawn.hidingTurns}/3)`, "thief", () => sendAction("HIDE")));
        if (state.actions.trick) fragment.appendChild(makeAction(`속임수 카드 · ${state.resources.thief.trickCards}장`, "thief", () => { placementMode = "trick-node"; renderActions(); renderBoardState(); }));
        if (state.actions.check) fragment.appendChild(makeAction(`검문 카드 · ${state.resources.police.checkCards}장`, "police", () => { placementMode = "check"; renderActions(); renderBoardState(); }));
        hint = pawn.status === "jailed" ? "1이 나오면 즉시 탈출해 다시 이동합니다." : "주사위를 쓰는 대신 카드나 숨기를 선택할 수 있습니다.";
      } else if (state.turnMode === "moving") {
        hint = "말판에서 노란빛으로 강조된 다음 칸을 누르세요.";
      } else if (state.turnMode === "pending") {
        hint = state.pending?.type === "teleport" ? "초록빛 위치 이동 칸을 선택하세요." : "말판에서 빛나는 도둑말을 선택하세요.";
      }
    }
    if (!fragment.childNodes.length) {
      const wait = document.createElement("div");
      wait.className = "actionHint";
      wait.textContent = state.canAct ? "말판에서 다음 선택을 하세요." : "다른 플레이어가 진행 중입니다.";
      fragment.appendChild(wait);
    }
    stack.replaceChildren(fragment);
    $("actionHint").textContent = hint;
  }

  function renderIntel() {
    const team = state.myTeam;
    $("intelCard").classList.toggle("hidden", !team || state.phase === "lobby");
    if (!team) return;
    $("cardCount").textContent = team === "thief" ? `속임수 ${state.resources.thief.trickCards}장` : `검문 ${state.resources.police.checkCards}장`;
    const list = $("intelList");
    const fragment = document.createDocumentFragment();
    const knownBuildings = state.buildings.filter(building => building.known);
    if (!knownBuildings.length) {
      const empty = document.createElement("div");
      empty.className = "intelItem";
      empty.textContent = team === "thief" ? "아직 확인한 건물이 없습니다." : "비밀 배치를 기다리는 중입니다.";
      fragment.appendChild(empty);
    }
    for (const knowledge of knownBuildings) {
      const building = buildingMeta(knowledge.id);
      const item = document.createElement("div");
      item.className = "intelItem";
      const label = contentLabel(knowledge.content);
      item.innerHTML = `<span>${building.icon} ${escapeHtml(building.name)}</span><strong class="intelSecret">${contentBadge(knowledge.content)}${label}</strong>`;
      fragment.appendChild(item);
    }
    list.replaceChildren(fragment);
  }

  function renderPlayers() {
    const list = $("playerList");
    const fragment = document.createDocumentFragment();
    for (const player of state.players) {
      const chip = document.createElement("div");
      chip.className = `playerChip${state.turnControllers.includes(player.id) && state.phase === "playing" ? " active" : ""}`;
      const pawnLabels = player.pawnIds.map(id => pawnById(id)?.number).filter(Boolean).join("·") || "-";
      chip.innerHTML = `<span class="playerDot ${player.team || ""}"></span><span>${escapeHtml(player.name)}${player.id === myId() ? " · 나" : ""}</span><em>${teamName(player.team)} · 말 ${pawnLabels}</em>`;
      fragment.appendChild(chip);
    }
    list.replaceChildren(fragment);
  }

  function renderResult() {
    const ended = state.phase === "ended";
    $("resultOverlay").classList.toggle("hidden", !ended);
    if (!ended) return;
    const won = state.myTeam === state.winnerTeam;
    $("resultIcon").textContent = state.winnerTeam === "police" ? "🚓" : "💎";
    $("resultTitle").textContent = won ? "우리 팀이 승리했습니다!" : `${teamName(state.winnerTeam)} 승리`;
    $("resultMessage").textContent = state.lastAction;
    const actions = $("resultActions");
    const fragment = document.createDocumentFragment();
    if (lobby.snapshot().role === "host") {
      fragment.appendChild(makeAction("같은 방에서 다시 하기", "roll", () => sendAction("NEW_GAME")));
      fragment.appendChild(makeAction("대기실로", "", () => sendAction("RETURN_LOBBY")));
    } else {
      const text = document.createElement("span");
      text.textContent = "방장이 다음 진행을 선택하는 중입니다.";
      fragment.appendChild(text);
    }
    actions.replaceChildren(fragment);
  }

  function renderGame() {
    if (!state || state.phase === "lobby") return;
    $("lobbyScreen").classList.add("hidden");
    $("gameScreen").classList.remove("hidden");
    renderHeader();
    renderIdentity();
    renderProgress();
    renderSetup();
    renderTurnCard();
    renderActions();
    renderIntel();
    renderPlayers();
    renderBoardState();
    renderResult();
  }

  function installState(nextState) {
    const previousPhase = state?.phase;
    state = nextState;
    actionPending = false;
    placementMode = null;
    trickNode = null;
    if (state.phase === "lobby") {
      if (lobby.snapshot().started) {
        $("gameScreen").classList.add("hidden");
        $("lobbyScreen").classList.remove("hidden");
        lobby.returnToLobby();
      }
      return;
    }
    if (previousPhase !== "setup" && state.phase === "setup") {
      setupSelection = { gem1: null, gem2: null, undercover: null };
      activeSecret = "gem1";
    }
    renderGame();
  }

  function handleServerMessage(message) {
    if (message.type === MESSAGE.STATE && message.state) {
      installState(message.state);
      return;
    }
    if (message.type === MESSAGE.ERROR) {
      actionPending = false;
      showToast(message.message || "행동을 처리하지 못했습니다.");
      if (state) renderGame();
    }
  }

  function syncLobby(snapshot) {
    $("gameRoomCode").textContent = snapshot.roomCode || "----";
  }

  function showAbort({ title, message }) {
    $("abortTitle").textContent = title;
    $("abortMessage").textContent = message;
    $("abortOverlay").classList.remove("hidden");
  }

  function init() {
    drawBoard();
    lobby = window.ClassroomMultiplayerLobby.create({
      gameId: GAME_ID,
      initialMode: "guest",
      getPlayerName: () => /^[가-힣]{2,6}$/.test(savedName) ? savedName : "",
      allowedPlayerCounts: [2, 3, 4, 5, 6],
      maxPlayers: 6,
      rulesButtonIds: ["rulesBtnLobby", "rulesBtnGame"],
      leaveButtonIds: ["leaveBtnLobby", "leaveBtnGame"],
      onRules: showRules,
      onLeave: () => location.href = "../../../",
      onNotice: showToast,
      onInvalidStart: () => showToast("2~6명이 모여야 시작할 수 있습니다."),
      onStateChange: syncLobby,
      getLobbyPresentation: ({ count, role, canStart }) => ({
        canStart,
        startText: role === "host" && canStart ? `게임 시작 · ${count}명` : "참가자를 기다리는 중",
        guideText: role === "host" ? `현재 ${count}명 · 2~6명에서 시작 가능` : "방장이 게임을 시작할 때까지 기다리세요."
      }),
      createStartData: () => ({ serverAuthoritative: true }),
      onStarted: () => {
        if (lobby.snapshot().role === "host") sendAction("START");
      },
      onServerMessage: handleServerMessage,
      onPlayerLeftDuringGame: () => showToast("플레이어가 나가 대기실로 돌아갑니다."),
      onAbort: showAbort
    }).mount();

    document.querySelectorAll(".secretTab").forEach(button => button.addEventListener("click", () => {
      activeSecret = button.dataset.secret;
      renderSetup();
    }));
    $("confirmSetupBtn").addEventListener("click", () => sendAction("PLACE_SECRETS", {
      gems: [setupSelection.gem1, setupSelection.gem2],
      undercover: setupSelection.undercover
    }));
    $("closeRulesBtn").addEventListener("click", hideRules);
    $("closeRulesBottomBtn").addEventListener("click", hideRules);
    $("rulesOverlay").addEventListener("click", event => { if (event.target === $("rulesOverlay")) hideRules(); });
    $("reloadBtn").addEventListener("click", () => location.reload());
  }

  window.addEventListener("DOMContentLoaded", init);
})();
