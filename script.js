(function(){
    "use strict";

    // ==================== 锁屏核心逻辑 ====================
    function updateLockClock(){ 
        const now=new Date(); 
        const h=now.getHours().toString().padStart(2,'0'),m=now.getMinutes().toString().padStart(2,'0'); 
        const clockEl=document.getElementById('liveClock');
        if(clockEl)clockEl.innerText=`${h}:${m}`; 
        const t1=document.getElementById('msgTime1'); 
        if(t1)t1.innerText=`${h}:${m}`; 
        const t2=document.getElementById('msgTime2'); 
        if(t2){ 
            let mins=parseInt(m)-2; 
            let ph=parseInt(h); 
            if(mins<0){mins+=60;ph--;} 
            if(ph<0)ph=23; 
            t2.innerText=`${ph.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}`; 
        } 
    }
    updateLockClock(); 
    setInterval(updateLockClock,1000);
    
    document.querySelectorAll('.notif-card').forEach(c=>c.addEventListener('click',(e)=>{
        if(!e.target.closest('.play-icon'))c.classList.toggle('expanded');
    }));
    
    let isPlayingLock=false; 
    const playSpan=document.getElementById('playPauseIcon'); 
    const audio=new Audio('https://music.163.com/song/media/outer/url?id=2750149909.mp3'); 
    const musicWidgetDiv=document.getElementById('musicPlayerWidget'); 
    if(musicWidgetDiv) musicWidgetDiv.addEventListener('click',(e)=>{
        e.stopPropagation(); 
        if(isPlayingLock){ audio.pause(); playSpan.innerText='▶'; }
        else{ audio.play().catch(()=>{}); playSpan.innerText='⏸'; } 
        isPlayingLock=!isPlayingLock; 
    }); 
    audio.addEventListener('ended',()=>{ isPlayingLock=false; if(playSpan)playSpan.innerText='▶'; });
    
    const newsList = [
        {title:"《黑神话：悟空》获得TGA提名",source:"游戏时光",full:"年度最佳动作游戏提名"},
        {title:"寒潮预警 多地降温",source:"中国天气",full:"注意保暖"},
        {title:"iOS 19新功能曝光",source:"威锋网",full:"锁屏小组件实时活动"}
    ];
    function refreshNews(){ 
        const r=newsList[Math.floor(Math.random()*newsList.length)]; 
        const nt=document.getElementById('newsTitle');
        const ns=document.getElementById('newsSource');
        const nf=document.getElementById('newsFullContent');
        if(nt)nt.innerText=r.title; 
        if(ns)ns.innerHTML=r.source; 
        if(nf)nf.innerText=r.full; 
    }
    refreshNews(); 
    setInterval(refreshNews,30000);
    
    // 年轮按钮+密码面板
    const ringBtn=document.getElementById('treeRingBtn'); 
    ringBtn.addEventListener('click',()=>{ ringBtn.classList.add('ripple'); setTimeout(()=>ringBtn.classList.remove('ripple'),400); });
    let rainCleanup=null,cyberActive=false,currentInput='';
    const virusDiv=document.getElementById('virusAnimation'),cyberDiv=document.getElementById('cyberLock'),
          lockDiv=document.getElementById('lockScreen'),homeContainer=document.getElementById('homeScreenContainer'),
          treeContainer=document.getElementById('treeRingContainer');
          
    function showVirus(){ 
        return new Promise(res=>{ 
            const codesDiv=document.getElementById('virusCodes'),loveDiv=document.getElementById('virusLove'); 
            codesDiv.innerHTML=''; 
            for(let i=0;i<25;i++){ 
                let line=document.createElement('div'); 
                line.className='code-line'; 
                line.innerText=['ACCESS DENIED','SYSTEM HACKED','1314'][Math.floor(Math.random()*3)]; 
                line.style.left=Math.random()*80+'%'; 
                line.style.top=Math.random()*90+'%'; 
                line.style.color=Math.random()>0.5?'#44ff44':'#ff4444'; 
                codesDiv.appendChild(line); 
            } 
            loveDiv.innerHTML=''; 
            for(let i=0;i<15;i++){ 
                let love=document.createElement('div'); 
                love.className='love-text'; 
                love.innerText='I like you'; 
                love.style.left=Math.random()*80+'%'; 
                love.style.top=Math.random()*85+'%'; 
                love.style.color='#ff6666'; 
                loveDiv.appendChild(love); 
            } 
            virusDiv.classList.add('active'); 
            setTimeout(()=>{ virusDiv.classList.remove('active'); res(); },2800); 
        }); 
    }
    
    function initCodeRain(){ 
        const canvas=document.getElementById('codeRainCanvas'); 
        if(!canvas) return ()=>{}; 
        const ctx=canvas.getContext('2d'); 
        let w=canvas.parentElement.clientWidth,h=canvas.parentElement.clientHeight; 
        canvas.width=w;canvas.height=h; 
        const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
        const cols=Math.floor(w/22); 
        const drops=Array(cols).fill(1); 
        function draw(){ 
            ctx.fillStyle="rgba(0,0,0,0.05)"; 
            ctx.fillRect(0,0,w,h); 
            ctx.fillStyle="rgba(0,255,0,0.45)"; 
            ctx.font="14px monospace"; 
            for(let i=0;i<drops.length;i++){ 
                const text=chars[Math.floor(Math.random()*chars.length)]; 
                ctx.fillText(text,i*22,drops[i]*18); 
                if(drops[i]*18>h && Math.random()>0.975) drops[i]=0; 
                drops[i]++; 
            } 
            requestAnimationFrame(draw); 
        } 
        draw(); 
        const resize=()=>{ w=canvas.parentElement.clientWidth; h=canvas.parentElement.clientHeight; canvas.width=w; canvas.height=h; }; 
        window.addEventListener('resize',resize); 
        return ()=>{ window.removeEventListener('resize',resize); }; 
    }
    
    function startYandere(){ 
        const container=document.getElementById('yandereBarrageContainer'); 
        if(!container) return; 
        const texts=['想永远和你在一起','别想逃','我会一直等','LOVE']; 
        const add=()=>{ 
            let span=document.createElement('div'); 
            span.className='yandere-barrage'; 
            span.innerText=texts[Math.floor(Math.random()*texts.length)]; 
            span.style.top=Math.random()*90+'%'; 
            span.style.left=Math.random()*80+'%'; 
            span.style.animationDuration=10+Math.random()*8+'s'; 
            container.appendChild(span); 
            setTimeout(()=>span.remove(),14000); 
        }; 
        for(let i=0;i<12;i++) add(); 
        setInterval(add,3000); 
    }
    
    function stopYandere(){ const c=document.getElementById('yandereBarrageContainer'); if(c) c.innerHTML=''; }
    
    function showPasswordScreen(){ 
        lockDiv.style.opacity='0'; 
        lockDiv.style.pointerEvents='none'; 
        cyberDiv.classList.add('visible'); 
        if(rainCleanup) rainCleanup(); 
        rainCleanup=initCodeRain(); 
        startYandere(); 
        cyberActive=true; 
        currentInput=''; 
        document.getElementById('pwdStatus').innerText='输入密码 1314'; 
    }
    
    function closeCyber(){ 
        cyberDiv.classList.remove('visible'); 
        lockDiv.style.opacity='1'; 
        lockDiv.style.pointerEvents='auto'; 
        if(rainCleanup) rainCleanup(); 
        stopYandere(); 
        cyberActive=false; 
    }
    
    document.getElementById('closeCyberBtn').addEventListener('click',closeCyber);
    ringBtn.addEventListener('click',async()=>{ await showVirus(); showPasswordScreen(); });
    
    function onKeyPress(val){ 
        if(!cyberActive) return; 
        const statusDiv=document.getElementById('pwdStatus'); 
        if(val==='del'){ 
            currentInput=currentInput.slice(0,-1); 
            statusDiv.innerText=currentInput||'请输入密码'; 
        }else if(val==='enter'){ 
            if(currentInput==='1314'){ 
                cyberDiv.classList.remove('visible'); 
                lockDiv.style.display='none'; 
                homeContainer.style.display='flex'; 
                if(treeContainer)treeContainer.classList.add('hidden'); 
                if(rainCleanup)rainCleanup(); 
                stopYandere(); 
                cyberActive=false; 
                audio.pause(); 
                if(playSpan)playSpan.innerText='▶'; 
                isPlayingLock=false; 
                const slider=document.getElementById('screenSlider'); 
                if(slider){ setTimeout(()=>{ slider.scrollLeft = slider.clientWidth; updateDots(); },100); }
            }else{ 
                const errDiv=document.getElementById('errorMessageContainer'); 
                errDiv.innerHTML='<div class="error-message">密码不对哦 再想想 ❤️</div>'; 
                setTimeout(()=>errDiv.innerHTML='',1800); 
                currentInput=''; 
                statusDiv.innerText='输入密码 1314'; 
                statusDiv.classList.add('error-shake'); 
                setTimeout(()=>statusDiv.classList.remove('error-shake'),500); 
            } 
        }else{ 
            if(currentInput.length<6){ 
                currentInput+=val; 
                statusDiv.innerText='•'.repeat(currentInput.length); 
            } 
        } 
    }
    
    const padDiv=document.getElementById('numPad'); 
    ['1','2','3','4','5','6','7','8','9','del','0','enter'].forEach(k=>{ 
        let btn=document.createElement('div'); 
        btn.classList.add('key'); 
        if(k==='del') btn.innerText='⌫'; 
        else if(k==='enter') btn.innerText='↵'; 
        else btn.innerText=k; 
        btn.addEventListener('click',()=>{ 
            if(k==='del') onKeyPress('del'); 
            else if(k==='enter') onKeyPress('enter'); 
            else onKeyPress(k); 
        }); 
        padDiv.appendChild(btn); 
    });
    
    // ==================== page2 主屏逻辑 ====================
    function updateDateTime(){ 
        const now=new Date(); 
        const timeStr=`${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`; 
        const dateStr=`${now.getMonth()+1}月${now.getDate()}日 ${['周日','周一','周二','周三','周四','周五','周六'][now.getDay()]}`; 
        for(let i=0;i<=3;i++){ 
            const st=document.getElementById(`statusTime${i}`); 
            const mt=document.getElementById(`mainTime${i}`); 
            const md=document.getElementById(`mainDate${i}`); 
            if(st)st.textContent=timeStr; 
            if(mt)mt.textContent=timeStr; 
            if(md)md.textContent=dateStr; 
        } 
    }
    updateDateTime(); 
    setInterval(updateDateTime,1000);
    
    const weatherStates=[{icon:'☀️',temp:'24°',desc:'晴'},{icon:'☁️',temp:'19°',desc:'多云'},{icon:'🌧️',temp:'16°',desc:'小雨'}]; 
    let wi=1; 
    function updWeather(){ 
        const w=weatherStates[wi]; 
        document.getElementById('weatherIcon').textContent=w.icon; 
        document.getElementById('weatherTemp').textContent=w.temp; 
        document.getElementById('weatherDesc').textContent=w.desc; 
    } 
    updWeather(); 
    document.getElementById('weatherWidget')?.addEventListener('click',()=>{ wi=(wi+1)%weatherStates.length; updWeather(); });
    
    function genIcon(seed){ 
        let h=0; 
        for(let i=0;i<seed.length;i++)h=((h<<5)-h)+seed.charCodeAt(i); 
        const st=Math.abs(h)%4; 
        if(st===0) return '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="11" stroke="white" stroke-width="2" fill="none"/></svg>'; 
        if(st===1) return '<svg viewBox="0 0 36 36"><polygon points="18,7 29,18 18,29 7,18" stroke="white" fill="none"/></svg>'; 
        return '<svg viewBox="0 0 36 36"><rect x="8" y="8" width="20" height="20" stroke="white" fill="none"/></svg>'; 
    }
    
    const sysApps=[
        {name:'电话',page:'1'},{name:'信息',page:'2'},{name:'浏览器',page:'3'},{name:'相机',page:'4'},
        {name:'照片',page:'5'},{name:'日历',page:'6'},{name:'时钟',page:'7'},{name:'备忘录',page:'memo'},
        {name:'地图',page:'9'},{name:'天气',page:'10'},{name:'设置',page:'11'},{name:'健康',page:'12'},
        {name:'录音',page:'13'},{name:'计算器',page:'14'},{name:'邮件',page:'15'}
    ];
    const downApps=[
        {name:'微信',page:'16'},{name:'QQ',page:'17'},{name:'微博',page:'18'},{name:'小红书',page:'19'},
        {name:'抖音',page:'20'},{name:'网易云',page:'21'},{name:'饿了么',page:'22'},{name:'大众点评',page:'23'},
        {name:'番茄',page:'24'},{name:'支付宝',page:'25'},{name:'Telegram',page:'26'},{name:'WhatsApp',page:'27'},
        {name:'Notion',page:'28'},{name:'DeepSeek',page:'29'},{name:'百度网盘',page:'30'},{name:'高德',page:'31'}
    ];
    const gameApps=[
        {name:'王者',page:'32'},{name:'无限暖暖',page:'33'},{name:'Steam',page:'34'},{name:'原神',page:'35'}
    ];
    
    function createIcon(app){ 
        const div=document.createElement('div'); 
        div.className='app-icon'; 
        div.setAttribute('data-page',app.page); 
        div.innerHTML=`<div class="icon-img">${genIcon(app.name+app.page)}</div><span class="app-label">${app.name}</span>`; 
        return div; 
    }
    
    const delSys=[...sysApps.slice(0,4),...sysApps.slice(12,15)]; 
    const delDown=[downApps[3],downApps[7],downApps[11],downApps[15]]; 
    const keptSys=sysApps.slice(4,12); 
    const keptDown=[downApps[0],downApps[1],downApps[2],downApps[4],downApps[5],downApps[6],downApps[8],downApps[9],downApps[10],downApps[12],downApps[13],downApps[14]];
    
    const g1=document.getElementById('appGrid1'); 
    keptSys.forEach(a=>g1.appendChild(createIcon(a)));
    const g2=document.getElementById('appGrid2'); 
    keptDown.forEach(a=>g2.appendChild(createIcon(a)));
    const delSysG=document.getElementById('deletedSysGrid'); 
    delSys.forEach(a=>delSysG.appendChild(createIcon(a)));
    const delDownG=document.getElementById('deletedDownloadGrid'); 
    delDown.forEach(a=>delDownG.appendChild(createIcon(a)));
    
    const recentDiv=document.getElementById('recentApps'); 
    [sysApps[4],downApps[0],downApps[4],sysApps[7]].forEach(a=>{ 
        let item=document.createElement('div'); 
        item.className='suggestion-item'; 
        item.setAttribute('data-page',a.page); 
        item.innerHTML=`<div class="icon-img">${genIcon(a.name)}</div><span class="app-label">${a.name}</span>`; 
        recentDiv.appendChild(item); 
    });
    
    const folderCtn=document.getElementById('gameFolderContainer'); 
    if(folderCtn){ 
        folderCtn.innerHTML=`<div class="folder-preview" id="gameFolderBtn"><div class="icon-img">${genIcon('游戏')}</div><span>游戏</span><span class="expand-arrow">▶</span></div><div class="folder-content" id="gameFolderContent"><div class="folder-grid" id="gameGrid"></div></div>`; 
        const grid=document.getElementById('gameGrid'); 
        gameApps.forEach(a=>{ 
            let ic=document.createElement('div'); 
            ic.className='folder-icon'; 
            ic.setAttribute('data-page',a.page); 
            ic.innerHTML=`<div class="icon-img">${genIcon(a.name)}</div><span class="folder-app-label">${a.name}</span>`; 
            grid.appendChild(ic); 
        }); 
        document.getElementById('gameFolderBtn')?.addEventListener('click',()=>{ 
            document.getElementById('gameFolderContent').classList.toggle('open'); 
        }); 
    }
    
    document.getElementById('dockPhoneIcon').innerHTML=genIcon('电话'); 
    document.getElementById('dockMsgIcon').innerHTML=genIcon('信息'); 
    document.getElementById('dockBrowserIcon').innerHTML=genIcon('浏览器');
    
    const playlist=[{title:'Way Back Home',artist:'吉他独奏'},{title:'小星星',artist:'白榆'},{title:'千本樱',artist:'纯音乐'}]; 
    let songIdx=0,playing2=false; 
    const playBtn2=document.getElementById('playPauseBtn'),prev2=document.getElementById('prevBtn'),next2=document.getElementById('nextBtn'),
          titleEl=document.getElementById('songTitle'),artistEl=document.getElementById('songArtist'); 
    function updateSong(){ titleEl.textContent=playlist[songIdx].title; artistEl.textContent=playlist[songIdx].artist; } 
    prev2.addEventListener('click',()=>{ songIdx=(songIdx-1+playlist.length)%playlist.length; updateSong(); }); 
    next2.addEventListener('click',()=>{ songIdx=(songIdx+1)%playlist.length; updateSong(); }); 
    playBtn2.addEventListener('click',()=>{ playing2=!playing2; playBtn2.textContent=playing2?'⏸':'▶'; }); 
    updateSong(); 
    document.getElementById('musicCoverSvg').innerHTML=genIcon('music');
    
    const sliderDiv=document.getElementById('screenSlider'); 
    const dotsAll=document.querySelectorAll('.dot'); 
    function updateDots(){ 
        if(sliderDiv.scrollWidth>0){ 
            const idx=Math.round(sliderDiv.scrollLeft/sliderDiv.clientWidth); 
            dotsAll.forEach((d,i)=>d.classList.toggle('active',i===idx)); 
        } 
    } 
    sliderDiv.addEventListener('scroll',updateDots); 
    window.addEventListener('resize',()=>setTimeout(updateDots,100));
    
    const homeScr=document.getElementById('homeScreen'),detailPg=document.getElementById('detailPage');
    
    // ==================== 备忘录系统 ====================
    const SIGNATURE_LIBRARY = [
        "🌙 月亮不营业，晚安由我来说", "☁️ 在黑白世界里，做自己的光", "🐾 你也是别人翘首以盼的惊喜",
        "✨ 保持热爱，奔赴山海", "🍃 且听风吟，静待花开", "🎧 耳机是人类的避难所",
        "📖 书里总爱写喜出望外的傍晚", "🕊️ 自由散漫的风治愈心情", "⏳ 时间不语，回答所有问题",
        "🌟 爱点什么，像草木钟情光阴", "💭 心存温柔，山河浪漫", "🌊 平淡日子里泛着光"
    ];
    
    function getRandomSignature() { return SIGNATURE_LIBRARY[Math.floor(Math.random()*SIGNATURE_LIBRARY.length)]; }
    
    let memoSettings = {
        signature: "ʚ 顺其自然 ɞ",
        password: "0000",
        notes: []
    };
    
    let memoCurrentNoteId = null;
    let memoPendingPrivateId = null;
    let memoIsSettingPassword = false;
    let memoPendingNewPrivate = false;
    
    const MEMO_STORAGE = 'black_memo_embedded_v1';
    const MEMO_SIG_STORAGE = 'memo_signature_embedded';
    const MEMO_PWD_STORAGE = 'memo_private_pwd_embedded';
    
    function loadMemoData() {
        try {
            const saved = localStorage.getItem(MEMO_STORAGE);
            if (saved) memoSettings.notes = JSON.parse(saved);
            if (!Array.isArray(memoSettings.notes)) memoSettings.notes = [];
        } catch(e) { memoSettings.notes = []; }
        
        if (memoSettings.notes.length === 0) {
            memoSettings.notes = [{ id: Date.now(), title: '便签', content: '✨ 普通笔记示例', isPrivate: false }];
            saveMemoNotes();
        }
        
        const savedSig = localStorage.getItem(MEMO_SIG_STORAGE);
        if (savedSig) memoSettings.signature = savedSig;
        
        const savedPwd = localStorage.getItem(MEMO_PWD_STORAGE);
        if (savedPwd) memoSettings.password = savedPwd;
    }
    
    function saveMemoNotes() { localStorage.setItem(MEMO_STORAGE, JSON.stringify(memoSettings.notes)); }
    function saveMemoSignature() { localStorage.setItem(MEMO_SIG_STORAGE, memoSettings.signature); }
    function saveMemoPassword() { localStorage.setItem(MEMO_PWD_STORAGE, memoSettings.password); }
    
    let memoHomeView, memoDetailView, memoPwdModal;
    let memoSignatureInput, memoRandomDot, memoNewNoteBtn, memoPrivateBtn;
    let memoNotesContainer, memoDetailTitle, memoDetailBody, memoSaveBtn, memoBackBtn;
    let memoModalTitle, memoModalHint, memoPwdInput, memoPwdError, memoConfirmBtn, memoCancelBtn;
    
    function initMemoUI() {
        const contentDiv = document.getElementById('detailContent');
        contentDiv.innerHTML = `
            <div class="memo-embedded" id="memoHomeView">
                <div class="status-bar-placeholder">
                    <span>9:41</span>
                    <span>📶 🔋</span>
                </div>
                <div class="home-container">
                    <div class="app-title">备忘录</div>
                    <div class="signature-area">
                        <div class="dot-clickable" id="memoRandomDot">●</div>
                        <input type="text" id="memoSignatureInput" class="signature-input" placeholder="输入个性签名" maxlength="60">
                    </div>
                    <button class="new-note-btn" id="memoNewNoteBtn">+ 新建便签</button>
                    <button class="new-note-btn private-icon-btn" id="memoPrivateNoteBtn">=⩌⩊⩌=</button>
                    <div id="memoNotesContainer" class="notes-list"></div>
                </div>
            </div>
            <div class="memo-detail-embedded" id="memoDetailView" style="display:none;">
                <div class="detail-status-bar">
                    <button class="back-home-icon" id="memoBackBtn">←</button>
                    <input type="text" id="memoDetailTitle" class="detail-title-input" placeholder="便签标题" maxlength="60">
                    <button class="save-detail-btn" id="memoSaveBtn">保存</button>
                </div>
                <div class="detail-content-card">
                    <textarea id="memoDetailBody" class="detail-body-textarea" placeholder="写下手写笔记……"></textarea>
                </div>
            </div>
        `;
        
        memoHomeView = document.getElementById('memoHomeView');
        memoDetailView = document.getElementById('memoDetailView');
        memoSignatureInput = document.getElementById('memoSignatureInput');
        memoRandomDot = document.getElementById('memoRandomDot');
        memoNewNoteBtn = document.getElementById('memoNewNoteBtn');
        memoPrivateBtn = document.getElementById('memoPrivateNoteBtn');
        memoNotesContainer = document.getElementById('memoNotesContainer');
        memoDetailTitle = document.getElementById('memoDetailTitle');
        memoDetailBody = document.getElementById('memoDetailBody');
        memoSaveBtn = document.getElementById('memoSaveBtn');
        memoBackBtn = document.getElementById('memoBackBtn');
        
        memoSignatureInput.value = memoSettings.signature;
        
        memoSignatureInput.addEventListener('input', () => {
            memoSettings.signature = memoSignatureInput.value;
            saveMemoSignature();
        });
        
        memoRandomDot.addEventListener('click', () => {
            memoSettings.signature = getRandomSignature();
            memoSignatureInput.value = memoSettings.signature;
            saveMemoSignature();
        });
        
        memoNewNoteBtn.addEventListener('click', () => {
            const newNote = { id: Date.now(), title: '便签', content: '', isPrivate: false };
            memoSettings.notes.unshift(newNote);
            saveMemoNotes();
            renderMemoList();
            openMemoDetail(newNote.id);
        });
        
        memoPrivateBtn.addEventListener('click', () => {
            if (!confirm("⚠️ 创建隐私便签需要密码，是否继续？")) return;
            memoPendingNewPrivate = true;
            showMemoPasswordModal('setup');
        });
        
        memoBackBtn.addEventListener('click', () => {
            if (memoCurrentNoteId) {
                const note = memoSettings.notes.find(n => n.id === memoCurrentNoteId);
                if (note && (note.title !== memoDetailTitle.value || note.content !== memoDetailBody.value)) {
                    if (!confirm('有未保存的更改，确定放弃吗？')) return;
                }
            }
            memoHomeView.style.display = 'flex';
            memoDetailView.style.display = 'none';
            memoCurrentNoteId = null;
        });
        
        memoSaveBtn.addEventListener('click', () => {
            if (memoCurrentNoteId) {
                const note = memoSettings.notes.find(n => n.id === memoCurrentNoteId);
                if (note) {
                    note.title = memoDetailTitle.value.trim() || '便签';
                    note.content = memoDetailBody.value;
                    saveMemoNotes();
                    renderMemoList();
                }
            }
            memoHomeView.style.display = 'flex';
            memoDetailView.style.display = 'none';
            memoCurrentNoteId = null;
        });
        
        memoPwdModal = document.getElementById('memoPasswordModal');
        memoModalTitle = document.getElementById('memoModalTitle');
        memoModalHint = document.getElementById('memoModalSubHint');
        memoPwdInput = document.getElementById('memoPwdInput');
        memoPwdError = document.getElementById('memoPwdError');
        memoConfirmBtn = document.getElementById('memoPwdConfirmBtn');
        memoCancelBtn = document.getElementById('memoPwdCancelBtn');
        
        memoConfirmBtn.addEventListener('click', handleMemoPassword);
        memoCancelBtn.addEventListener('click', hideMemoPasswordModal);
        memoPwdInput.addEventListener('keypress', (e) => { if(e.key==='Enter') handleMemoPassword(); });
        memoPwdModal.addEventListener('click', (e) => { if(e.target===memoPwdModal) hideMemoPasswordModal(); });
        
        renderMemoList();
    }
    
    function renderMemoList() {
        if (!memoNotesContainer) return;
        const notes = memoSettings.notes;
        if (notes.length === 0) {
            memoNotesContainer.innerHTML = '<div class="empty-list">📭 暂无便签，点击上方新建</div>';
            return;
        }
        memoNotesContainer.innerHTML = notes.map(note => `
            <div class="note-card" data-id="${note.id}">
                <span class="note-title">${escapeHtml(note.title || '便签')}</span>
                <div style="display:flex;align-items:center;gap:6px;">
                    <button class="delete-note-icon" data-delete="${note.id}">✕</button>
                    <span style="color:#5c5c5e;">›</span>
                </div>
            </div>
        `).join('');
        
        memoNotesContainer.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-delete]')) return;
                const id = parseInt(card.dataset.id);
                const note = memoSettings.notes.find(n => n.id === id);
                if (note && note.isPrivate) {
                    memoPendingPrivateId = id;
                    showMemoPasswordModal('verify');
                } else {
                    openMemoDetail(id);
                }
            });
        });
        
        memoNotesContainer.querySelectorAll('[data-delete]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.delete);
                if (confirm('确定删除这条便签吗？')) {
                    memoSettings.notes = memoSettings.notes.filter(n => n.id !== id);
                    saveMemoNotes();
                    renderMemoList();
                }
            });
        });
    }
    
    function openMemoDetail(id) {
        const note = memoSettings.notes.find(n => n.id === id);
        if (!note) return;
        memoCurrentNoteId = id;
        memoDetailTitle.value = note.title || '便签';
        memoDetailBody.value = note.content || '';
        memoHomeView.style.display = 'none';
        memoDetailView.style.display = 'flex';
    }
    
    function showMemoPasswordModal(mode) {
        memoIsSettingPassword = (mode === 'setup');
        memoModalTitle.innerText = memoIsSettingPassword ? '创建隐私便签' : '隐私笔记';
        memoModalHint.innerText = memoIsSettingPassword ? '设置密码 (默认0000)' : '请输入密码';
        memoPwdInput.value = '';
        memoPwdError.innerText = '';
        memoPwdModal.classList.add('active');
    }
    
    function hideMemoPasswordModal() {
        memoPwdModal.classList.remove('active');
        memoPendingPrivateId = null;
        memoPendingNewPrivate = false;
    }
    
    function handleMemoPassword() {
        const pwd = memoPwdInput.value;
        if (memoIsSettingPassword) {
            if (!pwd) { memoPwdError.innerText = '密码不能为空'; return; }
            memoSettings.password = pwd;
            saveMemoPassword();
            if (memoPendingNewPrivate) {
                const newNote = { id: Date.now(), title: '私密笔记', content: '', isPrivate: true };
                memoSettings.notes.unshift(newNote);
                saveMemoNotes();
                renderMemoList();
                memoPendingPrivateId = newNote.id;
            }
            hideMemoPasswordModal();
        } else {
            if (pwd === memoSettings.password) {
                if (memoPendingPrivateId) {
                    openMemoDetail(memoPendingPrivateId);
                }
                hideMemoPasswordModal();
            } else {
                memoPwdError.innerText = '密码错误';
            }
        }
    }
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[m]);
    }
    
    document.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const pageId = el.getAttribute('data-page');
            const name = el.querySelector('.app-label, .folder-app-label')?.textContent || '应用';
            
            if (pageId === 'memo') {
                document.getElementById('detailTitle').textContent = '备忘录';
                initMemoUI();
                homeScr.style.display = 'none';
                detailPg.classList.add('active');
            } else {
                document.getElementById('detailTitle').textContent = name;
                document.getElementById('detailContent').innerHTML = `<div style="padding:20px;color:white;"><h3>${name}</h3><p>页面ID: ${pageId}</p></div>`;
                homeScr.style.display = 'none';
                detailPg.classList.add('active');
            }
        });
    });
    
    document.getElementById('backBtn').addEventListener('click', () => {
        homeScr.style.display = 'flex';
        detailPg.classList.remove('active');
        memoCurrentNoteId = null;
    });
    
    loadMemoData();
    homeContainer.style.display = 'none';
})();
