// 가정통신문 카드.
//
// 알림장(학급 게시판 글)과 가정통신문은 원래 다른 페이지에 있었다. 그런데 학부모도
// 알림장을 봐야 하고 학생도 가정통신문을 봐야 해서, 한 흐름에 나란히 세운다.
// 여기서 만드는 건 그 흐름에 끼는 가정통신문 한 장이다.
//
// 보는 사람이 누구냐에 따라 '보이는 것'이 아니라 '누를 수 있는 것'만 달라진다.
// 회신·동의·설문은 보호자만 한다. 학생에게는 단추 대신 "보호자 회신 필요"만 뜬다.
// (서버도 같은 규칙을 지킨다. 화면만 감추면 막은 게 아니다.)
(function (global) {
    const REPLY_LABELS = {
        confirmed: '확인함',
        agree: '동의',
        disagree: '미동의',
        submitted: '제출함'
    };

    const KIND_LABELS = {
        none: '가정통신문',
        confirm: '확인 회신',
        agree: '동의서',
        survey: '설문·신청'
    };

    function esc(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatWhen(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    // 이 사람이 이 통신문에 대해 아직 할 일이 남았는지. '할 일' 거르개가 이걸 쓴다.
    function needsAction(notice, viewerRole) {
        return viewerRole === 'guardian' && notice.replyType !== 'none' && !notice.myReply;
    }

    function surveyFormHtml(notice) {
        const questions = notice.questions || [];
        if (questions.length === 0) {
            return '<p class="notice-hint">문항이 없습니다.</p>';
        }
        const body = questions.map((q, index) => {
            const mine = q.myAnswer;
            const head = `<p class="survey-q-title">${index + 1}. ${esc(q.text)}`
                + (q.required ? ' <span class="survey-required">*필수</span>' : '')
                + (q.type === 'multiple' ? ' <span class="notice-hint">(복수 선택)</span>' : '')
                + '</p>';

            if (q.type === 'text') {
                return `<div class="survey-q" data-question-id="${esc(q.id)}" data-type="text">
                    ${head}
                    <textarea class="survey-text" rows="2" placeholder="답변을 적어 주세요">${esc(mine ? mine.text : '')}</textarea>
                </div>`;
            }

            const inputType = q.type === 'multiple' ? 'checkbox' : 'radio';
            const chosen = mine ? (mine.choiceIndexes || []) : [];
            const options = (q.options || []).map((label, i) => `
                <label class="survey-option">
                    <input type="${inputType}" name="q_${esc(q.id)}" value="${i}"${chosen.includes(i) ? ' checked' : ''}>
                    <span>${esc(label)}</span>
                </label>`).join('');

            return `<div class="survey-q" data-question-id="${esc(q.id)}" data-type="${esc(q.type)}">
                ${head}
                ${options}
            </div>`;
        }).join('');

        return `${body}<button type="button" class="btn" data-act="survey">${
            notice.myReply ? '설문 다시 제출' : '설문 제출'
        }</button>`;
    }

    // 회신 칸. 보호자에게는 단추, 학생에게는 안내만.
    function replyBoxHtml(notice, viewerRole) {
        if (notice.replyType === 'none') return '';

        if (viewerRole !== 'guardian') {
            const done = notice.myReply
                ? `<span class="reply-done">보호자가 ${esc(REPLY_LABELS[notice.myReply.choice] || notice.myReply.choice)}</span>`
                : '<span class="reply-waiting">보호자 회신이 아직 없습니다</span>';
            // 집에 가서 말하라는 신호가 된다.
            return `<div class="reply-box">${done}</div>`;
        }

        if (notice.replyType === 'survey') {
            const done = notice.myReply
                ? `<span class="reply-done">${esc(formatWhen(notice.myReply.repliedAt))} 제출함</span>`
                : '';
            return `<div class="reply-box">
                <p class="reply-need">설문에 답해 주세요 ${done}</p>
                ${surveyFormHtml(notice)}
            </div>`;
        }

        if (notice.myReply) {
            return `<div class="reply-box replied">
                <span class="reply-done">${esc(REPLY_LABELS[notice.myReply.choice] || notice.myReply.choice)}</span>
                <span class="notice-hint">${esc(formatWhen(notice.myReply.repliedAt))} 회신함</span>
                <button type="button" class="btn-secondary" data-act="redo">회신 바꾸기</button>
            </div>`;
        }

        const buttons = notice.replyType === 'confirm'
            ? '<button type="button" class="btn" data-act="reply" data-choice="confirmed">확인했습니다</button>'
            : '<button type="button" class="btn" data-act="reply" data-choice="agree">동의합니다</button>'
              + '<button type="button" class="btn-secondary" data-act="reply" data-choice="disagree">동의하지 않습니다</button>';

        return `<div class="reply-box">
            <p class="reply-need">${notice.replyType === 'confirm' ? '확인 회신이 필요합니다.' : '보호자 동의 여부를 회신해 주세요.'}</p>
            <div class="reply-actions">${buttons}</div>
        </div>`;
    }

    // ctx: { viewerRole, child, onChanged }
    // child 는 학부모가 자녀 여럿일 때 어느 아이 것인지 서버에 알리는 값이다.
    function render(notice, ctx) {
        const article = document.createElement('article');
        article.className = 'post-card notice-card';
        article.dataset.noticeId = String(notice.id);

        const kind = KIND_LABELS[notice.replyType] || '가정통신문';
        article.innerHTML = `
            <header class="post-header">
                <div class="post-author-info">
                    <div class="avatar teacher">${esc(String(notice.senderName || '학교').charAt(0))}</div>
                    <div>
                        <div class="author-name">
                            <span>${esc(notice.senderName || '학교')}</span>
                            <span class="author-role notice-kind">${esc(kind)}</span>
                        </div>
                        <div class="post-date">${esc(formatWhen(notice.createdAt))}</div>
                    </div>
                </div>
            </header>
            <div class="post-content notice-content">
                <p class="notice-title">${esc(notice.title)}</p>
                <div class="notice-body">${esc(notice.contentBody || '')}</div>
            </div>
            <div class="reply-slot">${replyBoxHtml(notice, ctx.viewerRole)}</div>`;

        bind(article, notice, ctx);
        return article;
    }

    function bind(article, notice, ctx) {
        const slot = article.querySelector('.reply-slot');
        if (!slot) return;

        slot.addEventListener('click', async (event) => {
            const button = event.target.closest('button[data-act]');
            if (!button) return;
            const act = button.dataset.act;

            if (act === 'redo') {
                // 다시 답하는 건 그냥 한 번 더 보내는 것이다. 서버가 덮어쓴다.
                slot.innerHTML = replyBoxHtml({ ...notice, myReply: null }, ctx.viewerRole);
                return;
            }

            const payload = { noticeId: notice.id, ...(ctx.child || {}) };
            if (act === 'reply') {
                payload.choice = button.dataset.choice;
            } else if (act === 'survey') {
                payload.choice = 'submitted';
                payload.answers = Array.from(article.querySelectorAll('.survey-q')).map(box => {
                    const questionId = box.dataset.questionId;
                    if (box.dataset.type === 'text') {
                        return { questionId, text: box.querySelector('.survey-text').value.trim() };
                    }
                    return {
                        questionId,
                        choiceIndexes: Array.from(box.querySelectorAll('input:checked')).map(i => Number(i.value))
                    };
                });
            } else {
                return;
            }

            button.disabled = true;
            try {
                const res = await fetch('/api/notice/replies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(data.message || '회신을 보내지 못했습니다.');
                if (typeof ctx.onChanged === 'function') await ctx.onChanged();
            } catch (error) {
                button.disabled = false;
                alert(error.message || '회신을 보내지 못했습니다.');
            }
        });
    }

    global.NoticeCard = { render, needsAction, KIND_LABELS };
})(window);
