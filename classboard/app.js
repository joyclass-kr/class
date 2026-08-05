const API_BASE = '/api';

// DOM Elements
const userInfoEl = document.getElementById('userInfo');
const composerSection = document.getElementById('composerSection');
const postContentInput = document.getElementById('postContent');
const postSubmitBtn = document.getElementById('postSubmitBtn');
const feedSection = document.getElementById('feedSection');
const postTemplate = document.getElementById('postTemplate');
const commentTemplate = document.getElementById('commentTemplate');

let currentUser = null;

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
        userInfoEl.textContent = `${currentUser.name} (${currentUser.role === 'teacher' ? '교사' : '학생'})`;
        
        if (currentUser.role === 'teacher') {
            composerSection.classList.remove('hidden');
        }

        loadPosts();
    } catch (e) {
        console.error('Failed to init app', e);
        feedSection.innerHTML = '<div class="loader">오류가 발생했습니다.</div>';
    }
}

async function loadPosts() {
    try {
        const res = await fetch(`${API_BASE}/classboard/posts`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Failed to load posts');
        
        feedSection.innerHTML = '';
        if (data.posts.length === 0) {
            feedSection.innerHTML = '<div class="loader" style="color: #666;">아직 게시물이 없습니다.</div>';
            return;
        }

        data.posts.forEach(post => {
            renderPost(post);
        });
    } catch (e) {
        console.error(e);
        feedSection.innerHTML = '<div class="loader" style="color: #ff5252;">게시물을 불러오지 못했습니다.</div>';
    }
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
    clone.querySelector('[data-type="post-author-role"]').textContent = post.authorRole === 'teacher' ? '교사' : '학생';
    clone.querySelector('[data-type="post-date"]').textContent = formatDate(post.createdAt);
    
    // Post Content (with linkify)
    clone.querySelector('[data-type="post-content"]').innerHTML = linkify(post.content);
    
    // Delete Post button
    const deletePostBtn = clone.querySelector('[data-type="delete-post"]');
    if (currentUser.role === 'teacher') {
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
    if (comment.isMine || currentUser.role === 'teacher') {
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
            body: JSON.stringify({ content })
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
