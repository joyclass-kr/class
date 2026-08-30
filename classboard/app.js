const API_BASE = '/api';

// DOM Elements
const userInfoEl = document.getElementById('userInfo');
const composerSection = document.getElementById('composerSection');
const postContentInput = document.getElementById('postContent');
const postSubmitBtn = document.getElementById('postSubmitBtn');
const feedSection = document.getElementById('feedSection');
const postTemplate = document.getElementById('postTemplate');
const commentTemplate = document.getElementById('commentTemplate');

const boardPickerSection = document.getElementById('boardPickerSection');
const filterSection = document.getElementById('filterSection');
const composerTargetEl = document.getElementById('composerTarget');

let currentUser = null;
let boards = [];
let activeBoardKey = null;
let canPost = false;
// 과목별 보기. null이면 전체.
let activeSubjectFilter = null;
let loadedPosts = [];

// Utility: Autolink URL conversion
function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Escape HTML first to prevent XSS
    const escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
        
    return escapedText.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// Fetch current user and setup UI
async function initApp() {
    try {
        const res = await fetch(`${API_BASE}/auth/me`);
        const data = await res.json();
        if (!data.signedIn) {
            window.location.href = '/';
            return;
        }

        currentUser = data.user;

        // Setup Header
        userInfoEl.textContent = '';
        const nameLabel = document.createElement('span');
        nameLabel.textContent = `${currentUser.name} (${currentUser.role === 'teacher' ? '교사' : '학생'})`;
        userInfoEl.appendChild(nameLabel);
        if (currentUser.role === 'student') {
            const settingsLink = document.createElement('a');
            settingsLink.href = '/classtools/profile.html';
            settingsLink.className = 'settings-link';
            settingsLink.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">settings</span> 내 정보 설정';
            userInfoEl.appendChild(settingsLink);
        }

        await loadBoards();
        loadPosts();
    } catch (e) {
        console.error('Failed to init app', e);
        feedSection.innerHTML = '<div class="loader">오류가 발생했습니다.</div>';
    }
}

// 우리 반, 동아리, 방과후… 내가 볼 수 있는 게시판들. 안 읽은 글이 있으면 표시한다.
async function loadBoards() {
    try {
        const res = await fetch(`${API_BASE}/classboard/boards`);
        if (!res.ok) return;
        const data = await res.json();
        boards = data.boards || [];
        canPost = boards.some(b => b.canPost);

        if (boards.length > 0 && !activeBoardKey) activeBoardKey = boards[0].key;
        if (canPost) composerSection.classList.remove('hidden');

        renderBoardPicker();
        updateComposerTarget();
    } catch (e) {
        console.error('Failed to load boards', e);
    }
}

function renderBoardPicker() {
    // 게시판이 하나뿐이면 고를 것이 없다.
    if (boards.length < 2) {
        boardPickerSection.classList.add('hidden');
        return;
    }
    boardPickerSection.classList.remove('hidden');
    boardPickerSection.replaceChildren(...boards.map(b => {
        const btn = document.createElement('button');
        btn.className = 'board-tab';
        if (b.key === activeBoardKey) btn.classList.add('active');

        const name = document.createElement('span');
        name.className = 'board-tab-name';
        name.textContent = b.label;
        btn.appendChild(name);

        const kind = document.createElement('span');
        kind.className = 'board-tab-kind';
        kind.textContent = b.typeLabel;
        btn.appendChild(kind);

        // 안 읽은 글 개수. 들어가 보면 사라진다.
        if (b.unreadCount > 0) {
            const dot = document.createElement('span');
            dot.className = 'board-tab-unread';
            dot.textContent = b.unreadCount > 99 ? '99+' : String(b.unreadCount);
            dot.title = `안 읽은 글 ${b.unreadCount}개`;
            btn.appendChild(dot);
        }

        btn.addEventListener('click', () => {
            if (activeBoardKey === b.key) return;
            activeBoardKey = b.key;
            activeSubjectFilter = null;
            renderBoardPicker();
            updateComposerTarget();
            loadPosts();
        });
        return btn;
    }));
}

function updateComposerTarget() {
    if (!composerTargetEl) return;
    const target = boards.find(b => b.key === activeBoardKey);
    composerTargetEl.textContent = target ? `${target.label}에 게시` : '';
    // 학생이 소속된 게시판이어도 글은 교사만 쓴다.
    composerSection.classList.toggle('hidden', !(target && target.canPost));
}

// 한 게시판에 담임과 여러 전담이 함께 쓰므로, 누가 쓴 글만 볼지 고를 수 있게 한다.
function renderFilters() {
    const labels = [...new Set(loadedPosts.map(p => p.authorLabel).filter(Boolean))];
    if (labels.length < 2) {
        filterSection.classList.add('hidden');
        filterSection.replaceChildren();
        return;
    }
    filterSection.classList.remove('hidden');
    filterSection.replaceChildren(...['전체', ...labels].map(label => {
        const btn = document.createElement('button');
        btn.className = 'filter-chip';
        const isActive = label === '전체' ? activeSubjectFilter === null : activeSubjectFilter === label;
        if (isActive) btn.classList.add('active');
        btn.textContent = label;
        btn.addEventListener('click', () => {
            activeSubjectFilter = label === '전체' ? null : label;
            renderFeed();
        });
        return btn;
    }));
}

async function loadPosts() {
    try {
        const query = activeBoardKey ? `?board=${encodeURIComponent(activeBoardKey)}` : '';
        const res = await fetch(`${API_BASE}/classboard/posts${query}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to load posts');

        loadedPosts = data.posts || [];
        renderFilters();
        renderFeed();

        // 방금 이 게시판을 읽었으니 표시를 지운다.
        const board = boards.find(b => b.key === activeBoardKey);
        if (board && board.unreadCount) {
            board.unreadCount = 0;
            renderBoardPicker();
        }
    } catch (e) {
        console.error(e);
        feedSection.innerHTML = '<div class="loader" style="color: #ff5252;">게시물을 불러오지 못했습니다.</div>';
    }
}

function renderFeed() {
    renderFilters();
    feedSection.innerHTML = '';
    const shown = activeSubjectFilter
        ? loadedPosts.filter(p => p.authorLabel === activeSubjectFilter)
        : loadedPosts;

    if (shown.length === 0) {
        feedSection.innerHTML = `<div class="loader" style="color: #666;">${
            loadedPosts.length === 0 ? '아직 게시물이 없습니다.' : '이 과목의 게시물이 없습니다.'
        }</div>`;
        return;
    }
    shown.forEach(post => renderPost(post));
}

function renderPost(post) {
    const clone = postTemplate.content.cloneNode(true);
    const article = clone.querySelector('.post-card');
    
    // Author info
    const avatar = clone.querySelector('[data-type="post-avatar"]');
    avatar.textContent = post.authorName.charAt(0);
    avatar.classList.add(post.authorRole);
    if (post.authorPicture) {
        avatar.style.backgroundImage = `url(${post.authorPicture})`;
        avatar.textContent = '';
    }
    
    clone.querySelector('[data-type="post-author-name"]').textContent = post.authorName;
    // 담임인지 과목 전담인지 한눈에. 한 게시판에 여러 선생님이 글을 쓴다.
    const roleEl = clone.querySelector('[data-type="post-author-role"]');
    roleEl.textContent = post.authorLabel || (post.authorRole === 'teacher' ? '교사' : '학생');
    if (post.authorSubject) roleEl.classList.add('subject');
    clone.querySelector('[data-type="post-date"]').textContent = formatDate(post.createdAt);
    
    // Post Content (with linkify)
    clone.querySelector('[data-type="post-content"]').innerHTML = linkify(post.content);
    
    // Delete Post button
    // 본인 글이거나 이 반 담임일 때만. 서버도 같은 규칙으로 거른다.
    const deletePostBtn = clone.querySelector('[data-type="delete-post"]');
    if (post.canDelete) {
        deletePostBtn.classList.remove('hidden');
        deletePostBtn.addEventListener('click', () => deletePost(post.id, article));
    }
    
    // Comments
    const commentsList = clone.querySelector('[data-type="comments-list"]');
    post.comments.forEach(comment => {
        commentsList.appendChild(createCommentNode(comment, post.id));
    });
    
    // Add Comment
    const commentInput = clone.querySelector('[data-type="comment-input"]');
    const commentSubmitBtn = clone.querySelector('[data-type="comment-submit"]');
    
    // Auto resize comment textarea
    commentInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    const submitCommentHandler = async () => {
        const content = commentInput.value.trim();
        if (!content) return;
        
        commentSubmitBtn.disabled = true;
        try {
            const res = await fetch(`${API_BASE}/classboard/posts/${post.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            
            // Optimistically add comment
            const newComment = {
                id: data.id,
                content: content,
                authorName: currentUser.name,
                authorPicture: currentUser.picture,
                authorRole: currentUser.role,
                isMine: true,
                canDelete: true,
                createdAt: new Date().toISOString()
            };
            commentsList.appendChild(createCommentNode(newComment, post.id));
            commentInput.value = '';
            commentInput.style.height = 'auto';
        } catch (e) {
            alert(e.message || '댓글 등록에 실패했습니다.');
        } finally {
            commentSubmitBtn.disabled = false;
        }
    };
    
    commentSubmitBtn.addEventListener('click', submitCommentHandler);
    commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitCommentHandler();
        }
    });

    feedSection.appendChild(clone);
}

function createCommentNode(comment, postId) {
    const clone = commentTemplate.content.cloneNode(true);
    const commentEl = clone.querySelector('.comment');
    
    const avatar = clone.querySelector('[data-type="comment-avatar"]');
    avatar.textContent = comment.authorName.charAt(0);
    avatar.classList.add(comment.authorRole);
    if (comment.authorPicture) {
        avatar.style.backgroundImage = `url(${comment.authorPicture})`;
        avatar.textContent = '';
    }

    clone.querySelector('[data-type="comment-author-name"]').textContent = comment.authorName;
    clone.querySelector('[data-type="comment-author-role"]').textContent = comment.authorRole === 'teacher' ? '교사' : '학생';
    
    // Comment Content (with linkify)
    clone.querySelector('[data-type="comment-content"]').innerHTML = linkify(comment.content);

    const deleteBtn = clone.querySelector('[data-type="delete-comment"]');
    if (comment.canDelete ?? comment.isMine) {
        deleteBtn.classList.remove('hidden');
        deleteBtn.addEventListener('click', async () => {
            if (!confirm('댓글을 삭제하시겠습니까?')) return;
            try {
                const res = await fetch(`${API_BASE}/classboard/posts/${postId}/comments/${comment.id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('삭제 실패');
                commentEl.remove();
            } catch (e) {
                alert(e.message);
            }
        });
    }
    
    return clone;
}

// Create Post
postSubmitBtn.addEventListener('click', async () => {
    const content = postContentInput.value.trim();
    if (!content) return;

    postSubmitBtn.disabled = true;
    postSubmitBtn.textContent = '게시 중...';
    try {
        const res = await fetch(`${API_BASE}/classboard/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, board: activeBoardKey })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        postContentInput.value = '';
        loadPosts(); // Reload all posts for simplicity
    } catch (e) {
        alert(e.message || '게시물 등록에 실패했습니다.');
    } finally {
        postSubmitBtn.disabled = false;
        postSubmitBtn.textContent = '게시하기';
    }
});

async function deletePost(postId, articleElement) {
    if (!confirm('게시물을 삭제하시겠습니까? (관련 댓글도 모두 삭제됩니다)')) return;
    
    try {
        const res = await fetch(`${API_BASE}/classboard/posts/${postId}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('삭제 실패');
        articleElement.remove();
        
        if (feedSection.children.length === 0) {
            feedSection.innerHTML = '<div class="loader" style="color: #666;">아직 게시물이 없습니다.</div>';
        }
    } catch (e) {
        alert(e.message);
    }
}

// Start app
initApp();
