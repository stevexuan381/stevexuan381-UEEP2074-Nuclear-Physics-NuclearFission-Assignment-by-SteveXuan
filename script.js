const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
let xp=+(localStorage.getItem("fqXP")||0);
function syncXP(){const e=$("#xpTop");if(e)e.textContent=xp;localStorage.setItem("fqXP",xp)}
function addXP(n,msg){xp+=n;syncXP();if(msg)toast(`${msg} +${n} XP`)}
syncXP();

const translations={
en:{
navHistory:"History",navPhysics:"Physics",navReactor:"Reactor",navSafety:"Case Files",navFuture:"Future",
heroTitle:'Split atoms.<br><span>Build understanding.</span>',heroText:"Explore nuclear history, fission physics, reactor engineering, major accident lessons and the future of nuclear technology through interactive learning.",beginMission:"🚀 Begin Mission",enterArcade:"🎮 Enter Nuclear Arcade",statModules:"learning modules",statGames:"interactive activities",statLanguages:"languages",
learningPath:"YOUR LEARNING PATH",missionHeading:'Five modules. <span>One nuclear story.</span>',missionSub:"Each module contains real study content, visual explanation and short interactions.",m1:"Atomic Age",m1s:"History",m2:"Break the Nucleus",m2s:"Physics",m3:"Engineer the Core",m3s:"Reactor",m4:"Case Files",m4s:"Safety",m5:"Tomorrow's Reactors",m5s:"Future",
histEyebrow:"THE ATOMIC AGE",histTitle:'How we discovered the <span>nuclear world</span>',histIntro:"Modern nuclear physics grew through a chain of experiments that changed the way scientists understood matter.",histCoreTitle:"Core idea: the atom is not indivisible",histCoreText:"By the late nineteenth century, atoms were often treated as the smallest building blocks of matter. Radioactivity, the electron and the atomic nucleus showed that atoms contain smaller structures and can undergo nuclear change.",
h1896t:"Becquerel — radioactivity",h1896p:"Henri Becquerel found that uranium compounds could affect photographic plates without an external light source. The radiation came from the material itself.",h1898t:"Marie and Pierre Curie",h1898p:"The Curies investigated radioactive substances and discovered polonium and radium, helping establish radioactivity as an important area of physics.",h1911t:"Rutherford — the nucleus",h1911p:"The gold-foil experiment showed that atoms are mostly empty space, while positive charge and most of the mass are concentrated in a tiny nucleus.",h1932t:"Chadwick — the neutron",h1932p:"James Chadwick identified the neutron. Because the neutron has no electric charge, it can approach nuclei without being repelled by positive nuclear charge.",h1939t:"Fission is discovered and explained",h1939p:"Hahn and Strassmann observed unexpectedly light products after bombarding uranium with neutrons. Lise Meitner and Otto Frisch explained that the uranium nucleus had split.",h1942t:"Chicago Pile-1",h1942p:"Enrico Fermi's team achieved the first controlled, self-sustaining nuclear chain reaction. This demonstrated that a chain reaction could be managed rather than simply allowed to grow.",h1950t:"From experiments to electricity",h1950p:"Reactor technology developed into commercial power stations using controlled fission heat to produce steam and drive electrical generators.",
histQ1:"Why was the neutron so important?",histA1:"A neutron has no electric charge, so it can enter a positively charged nucleus more easily than a proton. This makes neutron-induced nuclear reactions especially important in fission reactors.",histQ2:"History → physics connection",histA2:"The discovery of the nucleus explained where nuclear energy is stored; the discovery of the neutron provided a practical way to trigger nuclear reactions; the discovery of fission showed that heavy nuclei can split and release energy.",
physEyebrow:"FISSION PHYSICS",physTitle:'Break the nucleus, <span>follow the energy</span>',physIntro:"The key ideas are neutron absorption, nuclear instability, binding energy, mass-energy conversion and chain reactions.",p1t:"Neutron absorption",p1p:"A U-235 nucleus absorbs a neutron and forms an excited compound nucleus. The extra energy can make the nucleus unstable.",p2t:"Nuclear deformation",p2p:"The excited nucleus can stretch. Short-range nuclear attraction competes with electrostatic repulsion between protons.",p3t:"Fission products",p3p:"The heavy nucleus splits into two main fragments and usually releases several neutrons and gamma radiation.",p4t:"Energy release",p4p:"The fragments carry large kinetic energy. Their motion is converted into heat through collisions in the fuel and surrounding materials.",
eqNote:"The exact fission fragments are not always the same. The important idea is conservation of nucleon number, charge and energy across the reaction.",massDefect:"A small decrease in total mass-energy can correspond to a large released energy because c² is very large.",bindEyebrow:"BINDING ENERGY",bindTitle:"Why heavy nuclei can release energy by splitting",bindText:"Medium-mass nuclei are generally more tightly bound per nucleon than very heavy nuclei. Fission moves the products toward a more tightly bound region, so the final system can have lower mass-energy. The difference is released as kinetic energy and radiation.",
subcritical:"Subcritical",subcriticalText:"Fewer neutrons successfully continue the next generation, so the chain reaction decreases.",critical:"Critical",criticalText:"Each generation produces enough successful fissions to replace itself. Reactor power can remain steady.",supercritical:"Supercritical",supercriticalText:"The neutron population grows from generation to generation, so power rises.",fireTitle:"Fire a neutron at U-235",fireButton:"⚡ Fire neutron",simNote:"Simplified educational animation. Real fission can produce many different fragment combinations.",quickCheck:"Quick check",quickQ:"Why is a neutron effective for triggering U-235 fission?",qcA:"Because it is positively charged",qcB:"Because it has no electric charge",qcC:"Because it is an electron",
reactEyebrow:"REACTOR ENGINEERING",reactTitle:'Control the chain reaction. <span>Move the heat.</span>',reactIntro:"A power reactor is a controlled nuclear heat source connected to a thermal power cycle.",ecFission:"Fission",ecHeat:"Heat",ecSteam:"Steam",ecTurbine:"Turbine",ecElectricity:"Electricity",reactDiagram:"SIMPLIFIED LIGHT-WATER REACTOR",fuel:"☢ Fuel rods",moderator:"💧 Moderator",controlRods:"🛑 Control rods",coolant:"🌊 Coolant",containment:"🏢 Containment",selectComp:"SELECT A COMPONENT",selectCompTitle:"Inspect the reactor",selectCompText:"Choose a component to see its physics role.",moderationTitle:"Moderation",moderationText:"Fast neutrons lose kinetic energy through collisions with moderator nuclei. In thermal reactors this increases the chance that a neutron will cause U-235 fission.",controlTitle:"Reactivity control",controlText:"Control rods absorb neutrons. Inserting them farther removes more neutrons from the chain reaction; withdrawing them generally increases reactivity.",coolingTitle:"Heat removal",coolingText:"Even after fission stops, radioactive fission products continue to release decay heat. Cooling remains necessary after shutdown.",pwrTitle:"Pressurized Water Reactor",pwrText:"Primary water is kept under high pressure so it does not boil in the core. It transfers heat to a separate secondary loop that produces steam.",bwrTitle:"Boiling Water Reactor",bwrText:"Water boils directly in the reactor vessel. The steam travels to the turbine, then is condensed and returned to the cycle.",
caseEyebrow:"CASE FILES",caseTitle:'Accidents as <span>physics lessons</span>',caseIntro:"Studying accidents helps us understand feedback, cooling, decay heat and defence in depth.",chernTitle:"Positive feedback can amplify a disturbance",chernText:"Under the accident conditions in the RBMK reactor, increasing steam voids could increase reactivity. More reactivity increased power, producing more boiling and more steam voids. This is an example of dangerous positive feedback.",chernLesson:"Physics lesson: feedback coefficients matter because they determine whether a change naturally damps out or grows.",fukuTitle:"Shutdown does not mean zero heat",fukuText:"The reactors shut down after the earthquake, but radioactive fission products continued producing decay heat. Tsunami flooding caused severe loss of electrical power and cooling capability, making heat removal difficult.",fukuLesson:"Physics lesson: residual heat must be removed even when the chain reaction has stopped.",defenceTitle:"Defence in depth",defenceText:"Nuclear safety uses multiple layers: reliable design, automatic protection, cooling, containment, monitoring, procedures and emergency response. Safety should not depend on one component working perfectly.",
futureEyebrow:"TOMORROW'S REACTORS",futureTitle:'What may come <span>after today’s reactors?</span>',futureIntro:"Advanced reactor research explores smaller units, different coolants, fast-neutron systems and new fuel forms.",smrTitle:"Small Modular Reactors",smrText:"Smaller reactor units designed around modular manufacturing and flexible deployment. Some concepts emphasize passive safety and simpler systems.",msrTitle:"Molten Salt Reactors",msrText:"Use molten salts as coolant; in some designs, fuel is dissolved in the salt. High-temperature operation is one attraction of the concept.",fastTitle:"Fast Reactors",fastText:"Operate with fast neutrons instead of heavily moderated thermal neutrons. Sodium, lead or other coolants may be used depending on the design.",htgrTitle:"High-Temperature Gas Reactors",htgrText:"Use gas cooling and high-temperature fuel systems. Besides electricity, the high outlet temperature may support industrial heat applications.",fusionBridge:"BEYOND FISSION",fusionTitle:"Fusion joins light nuclei instead of splitting heavy ones",fusionText:"Fusion powers the Sun. On Earth, researchers create extremely hot plasma so light nuclei can overcome electrostatic repulsion and fuse. Commercial fusion power is still a research and engineering challenge.",fusionGame:"Play fusion games →",
videoEyebrow:"VIDEO STUDY",videoTitle:'Fission and fusion <span>on screen</span>',videoIntro:"Use the videos as a visual recap after completing the modules.",tutorTitle:'Ask the <span>Nucleus Tutor</span>',tutorIntro:"A built-in guided assistant for common fission and fusion questions. It works without exposing an API key.",tutorHello:"Hi! Ask me about fission, fusion, reactors, criticality, accidents or nuclear waste.",
arcadeTitle:'Welcome to the <span>Nuclear Arcade</span>',arcadeText:"This page is intentionally game-dominant. The science is hidden inside the mechanics, decisions and feedback.",playNow:"START PLAYING",dashText:"Steer a neutron through the reactor field. Collect U-235 and avoid absorber blocks.",fusionForgeText:"Build enough plasma temperature and confinement to make deuterium and tritium fuse — but do not let the plasma escape.",quizBossText:"Ten mixed questions. Your final score unlocks a different meme reaction.",feedbackTitle:'Tell me what you <span>really think</span>',feedbackText:"Suggestions, bugs, game ideas and comments are welcome. The board below is public."
},
zh:{
navHistory:"历史",navPhysics:"物理",navReactor:"反应堆",navSafety:"事故案例",navFuture:"未来",
heroTitle:'分裂原子。<br><span>建立真正的理解。</span>',heroText:"通过互动学习探索核科学史、核裂变物理、反应堆工程、重大事故的物理教训，以及未来核技术。",beginMission:"🚀 开始任务",enterArcade:"🎮 进入核物理游戏厅",statModules:"学习模块",statGames:"互动活动",statLanguages:"语言",
learningPath:"你的学习路线",missionHeading:'五个模块，<span>一条完整的核科学故事线。</span>',missionSub:"每个模块都有学习内容、图像解释和小型互动。",m1:"原子时代",m1s:"历史",m2:"分裂原子核",m2s:"物理",m3:"设计反应堆核心",m3s:"反应堆",m4:"事故档案",m4s:"安全",m5:"未来反应堆",m5s:"未来",
histEyebrow:"原子时代",histTitle:'我们如何发现<span>核世界</span>',histIntro:"现代核物理来自一连串改变人类对物质认识的实验。",histCoreTitle:"核心概念：原子并不是不可再分",histCoreText:"十九世纪末，人们常把原子当作最小的物质单位。放射性、电子和原子核的发现说明原子内部仍有更小结构，而且原子核可以发生变化。",
h1896t:"贝克勒尔——发现放射性",h1896p:"贝克勒尔发现铀化合物即使没有外来光源，也能使照相底片发生变化，说明辐射来自物质本身。",h1898t:"居里夫妇",h1898p:"玛丽·居里和皮埃尔·居里研究放射性物质并发现钋和镭，使放射性成为重要物理研究领域。",h1911t:"卢瑟福——原子核",h1911p:"金箔实验表明原子大部分是空的，而正电荷和大部分质量集中在极小的原子核中。",h1932t:"查德威克——中子",h1932p:"中子不带电，因此靠近带正电的原子核时不会受到静电排斥，这使它非常适合引发核反应。",h1939t:"核裂变被发现并解释",h1939p:"哈恩和施特拉斯曼用中子轰击铀后发现意外的轻元素产物；迈特纳和弗里施解释为铀核发生了分裂。",h1942t:"芝加哥一号堆",h1942p:"费米团队实现了第一次可控、自持式核链式反应，证明链式反应可以被工程控制。",h1950t:"从实验走向发电",h1950p:"反应堆技术逐步发展为商业核电站，以核裂变产生的热量制造蒸汽并推动发电机。",
histQ1:"为什么中子如此重要？",histA1:"中子不带电，比质子更容易进入带正电的原子核，因此中子诱发反应在核裂变反应堆中特别重要。",histQ2:"历史 → 物理联系",histA2:"原子核的发现告诉我们核能量储存在哪里；中子的发现提供了触发核反应的方法；裂变的发现则说明重核可以分裂并释放能量。",
physEyebrow:"核裂变物理",physTitle:'分裂原子核，<span>追踪能量去向</span>',physIntro:"关键概念包括中子吸收、核不稳定性、结合能、质能转换和链式反应。",p1t:"中子吸收",p1p:"U-235 吸收一个中子后形成激发态复合核，额外能量可能使原子核变得不稳定。",p2t:"原子核形变",p2p:"激发态原子核会拉长；短程核力与质子之间的静电斥力彼此竞争。",p3t:"裂变产物",p3p:"重核分裂成两个主要碎片，并通常释放数个中子及伽马射线。",p4t:"能量释放",p4p:"裂变碎片具有很高的动能，在燃料和周围材料中碰撞后转化为热。",
eqNote:"实际裂变产物并不固定。重要的是反应前后核子数、电荷和能量必须守恒。",massDefect:"由于 c² 非常大，即使很小的总质量能差也可以对应很大的释放能量。",bindEyebrow:"结合能",bindTitle:"为什么重核分裂可以释放能量",bindText:"中等质量的原子核通常具有更高的每核子结合能。裂变产物更接近稳定结合区域，因此最终系统总质量能可以更低，差值以动能和辐射形式释放。",
subcritical:"次临界",subcriticalText:"下一代成功继续裂变的中子较少，因此链式反应逐渐减弱。",critical:"临界",criticalText:"每一代产生足够的裂变来补充自身，反应堆功率可以保持稳定。",supercritical:"超临界",supercriticalText:"中子数量逐代增加，因此反应堆功率上升。",fireTitle:"向 U-235 发射一个中子",fireButton:"⚡ 发射中子",simNote:"这是教学简化动画，真实裂变可产生很多不同的碎片组合。",quickCheck:"快速检查",quickQ:"为什么中子适合引发 U-235 裂变？",qcA:"因为它带正电",qcB:"因为它不带电",qcC:"因为它是电子",
reactEyebrow:"反应堆工程",reactTitle:'控制链式反应，<span>把热量带走。</span>',reactIntro:"核电反应堆本质上是一个可控的核热源，再连接热力发电系统。",ecFission:"裂变",ecHeat:"热",ecSteam:"蒸汽",ecTurbine:"涡轮机",ecElectricity:"电力",reactDiagram:"简化轻水反应堆",fuel:"☢ 燃料棒",moderator:"💧 慢化剂",controlRods:"🛑 控制棒",coolant:"🌊 冷却剂",containment:"🏢 安全壳",selectComp:"选择组件",selectCompTitle:"检查反应堆",selectCompText:"选择一个组件查看其物理作用。",moderationTitle:"慢化",moderationText:"快中子与慢化剂原子核碰撞并损失动能。在热中子反应堆中，这会提高中子引发 U-235 裂变的概率。",controlTitle:"反应性控制",controlText:"控制棒吸收中子。插入更深会移除更多中子，通常降低反应性；拔出则通常增加反应性。",coolingTitle:"移除热量",coolingText:"即使裂变停止，放射性裂变产物仍会产生衰变热，所以停堆后仍必须冷却。",pwrTitle:"压水反应堆",pwrText:"一回路水保持高压，因此在堆芯中不沸腾，并把热量传给独立的二回路来产生蒸汽。",bwrTitle:"沸水反应堆",bwrText:"水直接在反应堆压力容器中沸腾，蒸汽进入涡轮机，冷凝后重新循环。",
caseEyebrow:"事故档案",caseTitle:'把事故当成<span>物理课</span>',caseIntro:"事故研究能帮助我们理解反馈效应、冷却、衰变热与纵深防御。",chernTitle:"正反馈会放大扰动",chernText:"切尔诺贝利事故条件下，RBMK 反应堆中蒸汽空泡增加可能使反应性上升；反应性上升又使功率和沸腾进一步增加，形成危险的正反馈。",chernLesson:"物理教训：反馈系数决定一个变化会自然衰减还是不断放大。",fukuTitle:"停堆不等于没有热量",fukuText:"地震后反应堆停堆，但放射性裂变产物仍持续产生衰变热。海啸导致严重失电与冷却能力丧失，使余热移除变得非常困难。",fukuLesson:"物理教训：即使链式反应停止，余热仍必须被持续移除。",defenceTitle:"纵深防御",defenceText:"核安全采用多层保护：可靠设计、自动保护、冷却、安全壳、监测、程序与应急响应，不能把安全完全依赖于单一设备。",
futureEyebrow:"未来反应堆",futureTitle:'今天的反应堆之后，<span>还会有什么？</span>',futureIntro:"先进反应堆研究包括更小型机组、新冷却剂、快中子系统和新型燃料。",smrTitle:"小型模块化反应堆",smrText:"较小型反应堆单元，强调模块化制造和灵活部署，一些设计也强调被动安全。",msrTitle:"熔盐反应堆",msrText:"使用熔盐作为冷却剂，部分设计甚至把燃料溶解在盐中；高温运行是其潜在优势之一。",fastTitle:"快中子反应堆",fastText:"主要利用快中子而不是强烈慢化的热中子；根据设计可使用钠、铅等冷却剂。",htgrTitle:"高温气冷堆",htgrText:"使用气体冷却和耐高温燃料系统；除了发电，也可能为工业过程提供高温热。",fusionBridge:"超越裂变",fusionTitle:"核聚变是把轻原子核结合，而不是把重核分裂",fusionText:"核聚变为太阳提供能量。地球上的研究装置需要制造极高温等离子体，使轻核克服静电斥力并发生融合。商业聚变发电仍是科学与工程挑战。",fusionGame:"玩聚变游戏 →",
videoEyebrow:"视频学习",videoTitle:'在视频中理解<span>裂变与聚变</span>',videoIntro:"完成模块后，可用视频进行视觉复习。",tutorTitle:'询问<span>核子导师</span>',tutorIntro:"内置引导式助手，可回答常见的裂变和聚变问题，并且不暴露任何 API 密钥。",tutorHello:"你好！可以问我裂变、聚变、反应堆、临界、事故或核废料。",
arcadeTitle:'欢迎来到<span>核物理游戏厅</span>',arcadeText:"这个页面以游戏为主，科学知识隐藏在操作、决策和反馈中。",playNow:"开始游戏",dashText:"控制一个中子穿过反应堆场，收集 U-235 并避开中子吸收体。",fusionForgeText:"提高等离子体温度和约束强度，让氘和氚发生聚变，同时避免等离子体失控。",quizBossText:"十道综合题。最终分数会解锁不同的 Meme 反应。",feedbackTitle:'告诉我你的<span>真实意见</span>',feedbackText:"欢迎建议、Bug、游戏创意和评论。下方留言板为公开区域。"
},
ms:{
navHistory:"Sejarah",navPhysics:"Fizik",navReactor:"Reaktor",navSafety:"Fail Kes",navFuture:"Masa Depan",
heroTitle:'Belah atom.<br><span>Bina pemahaman.</span>',heroText:"Terokai sejarah nuklear, fizik pembelahan, kejuruteraan reaktor, pengajaran daripada kemalangan utama dan masa depan teknologi nuklear melalui pembelajaran interaktif.",beginMission:"🚀 Mulakan Misi",enterArcade:"🎮 Masuk Arked Nuklear",statModules:"modul pembelajaran",statGames:"aktiviti interaktif",statLanguages:"bahasa",
learningPath:"LALUAN PEMBELAJARAN",missionHeading:'Lima modul. <span>Satu kisah nuklear.</span>',missionSub:"Setiap modul mempunyai kandungan pembelajaran, penerangan visual dan interaksi ringkas.",m1:"Zaman Atom",m1s:"Sejarah",m2:"Belah Nukleus",m2s:"Fizik",m3:"Jurutera Teras",m3s:"Reaktor",m4:"Fail Kes",m4s:"Keselamatan",m5:"Reaktor Masa Depan",m5s:"Masa Depan",
histEyebrow:"ZAMAN ATOM",histTitle:'Bagaimana kita menemui <span>dunia nuklear</span>',histIntro:"Fizik nuklear moden berkembang melalui siri eksperimen yang mengubah pemahaman saintis tentang jirim.",histCoreTitle:"Idea utama: atom bukan zarah yang tidak boleh dibahagi",histCoreText:"Pada akhir abad ke-19, atom sering dianggap unit terkecil jirim. Penemuan radioaktiviti, elektron dan nukleus menunjukkan bahawa atom mempunyai struktur dalaman dan nukleus boleh berubah.",
h1896t:"Becquerel — radioaktiviti",h1896p:"Becquerel mendapati sebatian uranium boleh menjejaskan plat fotografi tanpa sumber cahaya luar, menunjukkan sinaran datang daripada bahan itu sendiri.",h1898t:"Marie dan Pierre Curie",h1898p:"Pasangan Curie mengkaji bahan radioaktif dan menemui polonium serta radium, membantu menjadikan radioaktiviti bidang fizik yang penting.",h1911t:"Rutherford — nukleus",h1911p:"Eksperimen kerajang emas menunjukkan atom kebanyakannya ruang kosong, manakala cas positif dan kebanyakan jisim tertumpu dalam nukleus kecil.",h1932t:"Chadwick — neutron",h1932p:"Neutron tidak bercas, jadi ia boleh menghampiri nukleus bercas positif tanpa tolakan elektrostatik yang kuat.",h1939t:"Pembelahan ditemui dan diterangkan",h1939p:"Hahn dan Strassmann melihat hasil yang jauh lebih ringan selepas uranium dibedil neutron. Meitner dan Frisch menerangkan bahawa nukleus uranium telah terbelah.",h1942t:"Chicago Pile-1",h1942p:"Pasukan Fermi mencapai tindak balas berantai nuklear terkawal dan mampan yang pertama, membuktikan bahawa tindak balas berantai boleh dikawal.",h1950t:"Daripada eksperimen kepada elektrik",h1950p:"Teknologi reaktor berkembang menjadi loji kuasa komersial yang menggunakan haba pembelahan untuk menghasilkan wap dan memutarkan penjana.",
histQ1:"Mengapa neutron sangat penting?",histA1:"Neutron tidak mempunyai cas elektrik, jadi ia lebih mudah memasuki nukleus bercas positif berbanding proton. Oleh itu tindak balas teraruh neutron sangat penting dalam reaktor pembelahan.",histQ2:"Hubungan sejarah → fizik",histA2:"Penemuan nukleus menunjukkan di mana tenaga nuklear berada; penemuan neutron menyediakan cara praktikal untuk mencetuskan tindak balas nuklear; penemuan pembelahan menunjukkan nukleus berat boleh terbelah dan membebaskan tenaga.",
physEyebrow:"FIZIK PEMBELAHAN",physTitle:'Belah nukleus, <span>ikuti tenaga</span>',physIntro:"Idea utama ialah penyerapan neutron, ketidakstabilan nuklear, tenaga ikatan, penukaran jisim-tenaga dan tindak balas berantai.",p1t:"Penyerapan neutron",p1p:"Nukleus U-235 menyerap neutron dan membentuk nukleus kompaun teruja. Tenaga tambahan boleh menjadikannya tidak stabil.",p2t:"Ubah bentuk nukleus",p2p:"Nukleus teruja boleh memanjang. Daya nuklear jarak dekat bersaing dengan tolakan elektrostatik antara proton.",p3t:"Hasil pembelahan",p3p:"Nukleus berat terbelah kepada dua serpihan utama dan biasanya membebaskan beberapa neutron serta sinaran gama.",p4t:"Pembebasan tenaga",p4p:"Serpihan membawa tenaga kinetik tinggi. Perlanggaran dalam bahan menukarkan gerakan itu kepada haba.",
eqNote:"Serpihan pembelahan sebenar tidak semestinya sama setiap kali. Prinsip penting ialah pemuliharaan nombor nukleon, cas dan tenaga.",massDefect:"Penurunan kecil dalam jumlah jisim-tenaga boleh menghasilkan tenaga besar kerana c² sangat besar.",bindEyebrow:"TENAGA IKATAN",bindTitle:"Mengapa nukleus berat boleh membebaskan tenaga apabila terbelah",bindText:"Nukleus berjisim sederhana secara umum lebih kuat terikat per nukleon berbanding nukleus sangat berat. Pembelahan membawa hasil ke rantau ikatan yang lebih kuat, lalu perbezaan jisim-tenaga dibebaskan sebagai tenaga kinetik dan sinaran.",
subcritical:"Subkritikal",subcriticalText:"Lebih sedikit neutron meneruskan generasi seterusnya, jadi tindak balas berantai berkurang.",critical:"Kritikal",criticalText:"Setiap generasi menghasilkan pembelahan yang cukup untuk menggantikan dirinya; kuasa reaktor boleh kekal stabil.",supercritical:"Superkritikal",supercriticalText:"Populasi neutron meningkat dari satu generasi ke generasi seterusnya, jadi kuasa meningkat.",fireTitle:"Tembak neutron ke U-235",fireButton:"⚡ Tembak neutron",simNote:"Animasi pendidikan dipermudah. Pembelahan sebenar boleh menghasilkan banyak kombinasi serpihan.",quickCheck:"Semakan pantas",quickQ:"Mengapa neutron berkesan untuk mencetuskan pembelahan U-235?",qcA:"Kerana bercas positif",qcB:"Kerana tiada cas elektrik",qcC:"Kerana ia elektron",
reactEyebrow:"KEJURUTERAAN REAKTOR",reactTitle:'Kawal tindak balas berantai. <span>Pindahkan haba.</span>',reactIntro:"Reaktor kuasa ialah sumber haba nuklear terkawal yang disambungkan kepada kitar kuasa terma.",ecFission:"Pembelahan",ecHeat:"Haba",ecSteam:"Wap",ecTurbine:"Turbin",ecElectricity:"Elektrik",reactDiagram:"REAKTOR AIR RINGAN DIPERMUDAH",fuel:"☢ Rod bahan api",moderator:"💧 Moderator",controlRods:"🛑 Rod kawalan",coolant:"🌊 Penyejuk",containment:"🏢 Pengurungan",selectComp:"PILIH KOMPONEN",selectCompTitle:"Periksa reaktor",selectCompText:"Pilih komponen untuk melihat peranan fiziknya.",moderationTitle:"Moderasi",moderationText:"Neutron pantas kehilangan tenaga kinetik melalui perlanggaran dengan nukleus moderator. Dalam reaktor terma, ini meningkatkan kebarangkalian neutron menyebabkan pembelahan U-235.",controlTitle:"Kawalan kereaktifan",controlText:"Rod kawalan menyerap neutron. Memasukkannya lebih jauh menyingkirkan lebih banyak neutron dan biasanya mengurangkan kereaktifan.",coolingTitle:"Penyingkiran haba",coolingText:"Walaupun pembelahan berhenti, hasil pembelahan radioaktif terus menghasilkan haba pereputan. Penyejukan masih diperlukan selepas penutupan.",pwrTitle:"Reaktor Air Bertekanan",pwrText:"Air primer dikekalkan pada tekanan tinggi supaya tidak mendidih di dalam teras. Haba dipindahkan ke gelung sekunder untuk menghasilkan wap.",bwrTitle:"Reaktor Air Mendidih",bwrText:"Air mendidih terus dalam bejana reaktor. Wap bergerak ke turbin, kemudian dipeluwap dan digunakan semula.",
caseEyebrow:"FAIL KES",caseTitle:'Kemalangan sebagai <span>pelajaran fizik</span>',caseIntro:"Kajian kemalangan membantu memahami maklum balas, penyejukan, haba pereputan dan pertahanan berlapis.",chernTitle:"Maklum balas positif boleh membesarkan gangguan",chernText:"Dalam keadaan kemalangan RBMK, peningkatan lompang wap boleh meningkatkan kereaktifan. Kereaktifan lebih tinggi menaikkan kuasa, menghasilkan lebih banyak pendidihan dan lompang wap — satu gelung maklum balas positif yang berbahaya.",chernLesson:"Pelajaran fizik: pekali maklum balas menentukan sama ada perubahan akan reda atau berkembang.",fukuTitle:"Penutupan tidak bermaksud haba sifar",fukuText:"Reaktor ditutup selepas gempa bumi, tetapi hasil pembelahan radioaktif terus menghasilkan haba pereputan. Banjir tsunami menyebabkan kehilangan kuasa elektrik dan keupayaan penyejukan yang serius.",fukuLesson:"Pelajaran fizik: haba baki mesti terus disingkirkan walaupun tindak balas berantai telah berhenti.",defenceTitle:"Pertahanan berlapis",defenceText:"Keselamatan nuklear menggunakan banyak lapisan: reka bentuk yang boleh dipercayai, perlindungan automatik, penyejukan, pengurungan, pemantauan, prosedur dan tindak balas kecemasan.",
futureEyebrow:"REAKTOR MASA DEPAN",futureTitle:'Apa yang mungkin datang <span>selepas reaktor hari ini?</span>',futureIntro:"Penyelidikan reaktor maju meneroka unit lebih kecil, penyejuk berbeza, sistem neutron pantas dan bentuk bahan api baharu.",smrTitle:"Reaktor Modular Kecil",smrText:"Unit reaktor lebih kecil yang direka untuk pembuatan modular dan penggunaan fleksibel. Sesetengah konsep menekankan keselamatan pasif.",msrTitle:"Reaktor Garam Lebur",msrText:"Menggunakan garam lebur sebagai penyejuk; dalam sesetengah reka bentuk, bahan api dilarutkan dalam garam. Operasi suhu tinggi ialah salah satu tarikan konsep ini.",fastTitle:"Reaktor Pantas",fastText:"Beroperasi menggunakan neutron pantas berbanding neutron terma yang dimoderatkan. Natrium, plumbum atau penyejuk lain boleh digunakan.",htgrTitle:"Reaktor Gas Suhu Tinggi",htgrText:"Menggunakan penyejukan gas dan sistem bahan api suhu tinggi. Selain elektrik, haba suhu tinggi boleh digunakan untuk proses industri.",fusionBridge:"MELAMPAUI PEMBELAHAN",fusionTitle:"Pelakuran menggabungkan nukleus ringan dan bukannya membelah nukleus berat",fusionText:"Pelakuran membekalkan tenaga kepada Matahari. Di Bumi, penyelidik menghasilkan plasma sangat panas supaya nukleus ringan dapat mengatasi tolakan elektrostatik dan bergabung. Kuasa pelakuran komersial masih merupakan cabaran penyelidikan dan kejuruteraan.",fusionGame:"Main permainan pelakuran →",
videoEyebrow:"VIDEO PEMBELAJARAN",videoTitle:'Pembelahan dan pelakuran <span>di skrin</span>',videoIntro:"Gunakan video sebagai ulang kaji visual selepas melengkapkan modul.",tutorTitle:'Tanya <span>Nucleus Tutor</span>',tutorIntro:"Pembantu terbina dalam untuk soalan lazim pembelahan dan pelakuran tanpa mendedahkan kunci API.",tutorHello:"Hai! Tanya saya tentang pembelahan, pelakuran, reaktor, kritikaliti, kemalangan atau sisa nuklear.",
arcadeTitle:'Selamat datang ke <span>Arked Nuklear</span>',arcadeText:"Halaman ini sengaja berfokus pada permainan. Sains diselitkan dalam mekanik, keputusan dan maklum balas.",playNow:"MULA BERMAIN",dashText:"Kawal neutron melalui medan reaktor. Kumpul U-235 dan elakkan penyerap neutron.",fusionForgeText:"Naikkan suhu plasma dan pengurungan untuk menggabungkan deuterium dan tritium tanpa kehilangan plasma.",quizBossText:"Sepuluh soalan campuran. Skor akhir membuka reaksi meme yang berbeza.",feedbackTitle:'Beritahu saya <span>pendapat sebenar anda</span>',feedbackText:"Cadangan, pepijat, idea permainan dan komen sangat dialu-alukan. Papan di bawah adalah awam."
}
};

const factText={
en:"Chicago Pile-1 achieved the first controlled self-sustaining chain reaction in December 1942. One memorable DOE fact is that some instruments were nicknamed Piglet, Tigger and Pooh.",
zh:"芝加哥一号堆在 1942 年 12 月实现第一次可控、自持式链式反应。DOE 还提到，当时一些仪器被昵称为 Piglet、Tigger 和 Pooh。",
ms:"Chicago Pile-1 mencapai tindak balas berantai terkawal dan mampan yang pertama pada Disember 1942. Satu fakta menarik DOE: beberapa instrumen diberi nama panggilan Piglet, Tigger dan Pooh."
};

function applyLanguage(lang){
  localStorage.setItem("fqLang",lang); document.documentElement.lang=lang==="zh"?"zh-CN":lang;
  $$("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[lang]?.[k])el.textContent=translations[lang][k]});
  $$("[data-i18n-html]").forEach(el=>{const k=el.dataset.i18nHtml;if(translations[lang]?.[k])el.innerHTML=translations[lang][k]});
}
const langSelect=$("#langSelect"); if(langSelect){const lang=localStorage.getItem("fqLang")||"en";langSelect.value=lang;applyLanguage(lang);langSelect.addEventListener("change",e=>applyLanguage(e.target.value))}

const nav=$("#mainNav"), menu=$("#menuBtn"); if(menu)menu.addEventListener("click",()=>nav.classList.toggle("open"));
$$("nav a").forEach(a=>a.addEventListener("click",()=>nav?.classList.remove("open")));
const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObs.unobserve(e.target)}}),{threshold:.08});$$(".reveal").forEach(el=>revealObs.observe(el));

let tt; function toast(t){const e=$("#toast");if(!e)return;e.textContent=t;e.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>e.classList.remove("show"),1800)}
function showMeme(emoji,title,text,award=0){const m=$("#memeModal");if(!m)return;$("#memeEmoji").textContent=emoji;$("#memeTitle").textContent=title;$("#memeText").textContent=text;$("#memeXP").textContent=award?`+${award} XP`:"";m.classList.add("show");if(award)addXP(award)}
$("#memeClose")?.addEventListener("click",()=>$("#memeModal").classList.remove("show"));$("#memeModal")?.addEventListener("click",e=>{if(e.target.id==="memeModal")e.target.classList.remove("show")});

$$(".fact-btn").forEach(b=>b.addEventListener("click",()=>showMeme("🤯","Did you know?",factText[localStorage.getItem("fqLang")||"en"],20)));

let audioCtx,nodes=[];$("#musicBtn")?.addEventListener("click",e=>{if(nodes.length){nodes.forEach(n=>{try{n.stop?.()}catch{}});nodes=[];e.target.textContent="♫ Music: Off";return}audioCtx=audioCtx||new (AudioContext||webkitAudioContext)();const master=audioCtx.createGain();master.gain.value=.035;master.connect(audioCtx.destination);[110,164.8,220].forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=i?"triangle":"sine";o.frequency.value=f;g.gain.value=i?.18:.5;o.connect(g);g.connect(master);o.start();nodes.push(o)});nodes.push(master);e.target.textContent="♫ Music: On"});

if($("#fireFission")){
  let busy=false;
  let resetTimer=null;
  const stage=$("#fissionStage");
  const readout=$("#fissionReadout");
  const fireBtn=$("#fireFission");

  function resetFissionLab(){
    if(resetTimer){
      clearTimeout(resetTimer);
      resetTimer=null;
    }
    stage.classList.remove("run");
    // Force browser reflow so the same CSS animations can replay.
    void stage.offsetWidth;
    readout.textContent="STATUS: READY";
    fireBtn.disabled=false;
    busy=false;
  }

  fireBtn.addEventListener("click",()=>{
    if(busy) return;
    busy=true;
    fireBtn.disabled=true;

    stage.classList.remove("run");
    void stage.offsetWidth;
    stage.classList.add("run");

    readout.textContent="STATUS: NEUTRON APPROACHING";
    setTimeout(()=>{ if(busy) readout.textContent="STATUS: NEUTRON ABSORBED"; },560);
    setTimeout(()=>{ if(busy) readout.textContent="STATUS: NUCLEUS DEFORMING"; },820);
    setTimeout(()=>{ if(busy) readout.textContent="STATUS: FISSION — ENERGY + NEUTRONS RELEASED"; },1120);

    resetTimer=setTimeout(()=>{
      resetFissionLab();
      showMeme(
        "💥",
        "Fission complete",
        "U-235 absorbed the neutron, became unstable and split. The fragments moved apart while additional neutrons were released.",
        50
      );
    },2450);
  });

  // Return to a clean state if the page/tab was interrupted mid-animation.
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden && busy) resetFissionLab();
  });
}
$$(".inline-choices button").forEach(b=>b.onclick=()=>{if(b.dataset.correct==="true"){b.style.borderColor="var(--green)";$("#quickFeedback").textContent="✓ Correct. Neutrons are electrically neutral, so they are not repelled by the positive nucleus.";$("#quickFeedback").style.color="var(--green)";addXP(20)}else{b.style.borderColor="var(--red)";$("#quickFeedback").textContent="Not quite. Think about electric charge.";$("#quickFeedback").style.color="var(--red)"}});

const comp={
fuel:["Nuclear fuel","Fuel rods contain fissile material such as U-235. Fission in the fuel releases energy and more neutrons."],
moderator:["Moderator","The moderator slows neutrons by collisions. In thermal reactors, slower neutrons are more effective at causing U-235 fission."],
control:["Control rods","Control rods absorb neutrons. More insertion generally lowers reactivity; withdrawal generally raises it."],
coolant:["Coolant","Coolant carries thermal energy away from the fuel and toward the steam-electric power system."],
containment:["Containment","Containment is a strong engineered barrier around major reactor systems and forms one layer of defence in depth."]
};$$("[data-comp]").forEach(b=>b.onclick=()=>{const d=comp[b.dataset.comp];$("#componentInfo").innerHTML=`<span class="eyebrow">REACTOR COMPONENT</span><h3>${d[0]}</h3><p>${d[1]}</p>`;addXP(5)});

const tutorRules=[
[["fission"],"Nuclear fission is the splitting of a heavy nucleus. U-235 can absorb a neutron, become unstable and split, releasing energy, fission fragments and additional neutrons."],
[["fusion"],"Fusion joins light nuclei. It powers the Sun. On Earth, fusion research uses extremely hot plasma so nuclei can overcome electrostatic repulsion and collide effectively."],
[["critical","criticality","k"],"k describes neutron multiplication. k<1 is subcritical, k≈1 is a steady self-sustaining critical chain reaction, and k>1 means the neutron population grows."],
[["chernobyl","void"],"An important physics issue at Chernobyl was positive void reactivity under the accident conditions: more steam voids could increase reactivity, which increased power and produced still more boiling."],
[["fukushima","decay heat"],"At Fukushima the chain reaction stopped, but decay heat continued. Severe loss of power and cooling after the tsunami made heat removal difficult."],
[["moderator"],"A moderator slows fast neutrons through collisions. Thermal neutrons are effective for U-235 fission in light-water reactors."],
[["control rod"],"Control rods absorb neutrons, changing the number available to continue the chain reaction."],
[["pwr"],"A PWR keeps primary water under high pressure and transfers heat to a separate secondary steam loop."],
[["bwr"],"A BWR boils water directly in the reactor vessel and sends the resulting steam to the turbine."],
[["waste"],"Used nuclear fuel remains radioactive and generates decay heat, so it requires shielding, cooling and controlled long-term management."]
];
function tutorAnswer(t){
  const original=t||"";
  const q=original.toLowerCase();

  for(const [keys,a] of tutorRules){
    if(keys.some(k=>q.includes(k))) return a;
  }

  const lang=localStorage.getItem("fqLang")||"en";

  if(lang==="zh"){
    return "我目前是内置的离线核物理导师。你可以问我核裂变、核聚变、临界状态、慢化剂、控制棒、PWR、BWR、切尔诺贝利、福岛或核废料。";
  }
  if(lang==="ms"){
    return "Saya ialah tutor nuklear luar talian terbina dalam. Cuba tanya tentang pembelahan, pelakuran, kritikaliti, moderator, rod kawalan, PWR, BWR, Chernobyl, Fukushima atau sisa nuklear.";
  }
  return "I am the built-in offline Nucleus Tutor. Try asking about fission, fusion, criticality, moderators, control rods, PWR/BWR, Chernobyl, Fukushima or nuclear waste.";
}

function addChat(role,text,extraClass=""){
  const log=$("#chatLog");
  if(!log) return null;

  const d=document.createElement("div");
  d.className=`msg ${role} ${extraClass}`.trim();

  const title=document.createElement("b");
  title.textContent=role==="bot" ? "Nucleus Tutor" : "You";

  const p=document.createElement("p");
  p.textContent=text;

  d.appendChild(title);
  d.appendChild(p);
  log.appendChild(d);

  requestAnimationFrame(()=>{
    log.scrollTop=log.scrollHeight;
  });

  return d;
}

function askTutor(text){
  const v=(text||"").trim();
  if(!v) return;

  addChat("user",v);
  const typing=addChat("bot","Thinking","typing");

  setTimeout(()=>{
    typing?.remove();
    addChat("bot",tutorAnswer(v));
  },420);
}

const chatForm=$("#chatForm");
const chatInput=$("#chatInput");

chatForm?.addEventListener("submit",e=>{
  e.preventDefault();
  const v=chatInput?.value?.trim()||"";
  if(!v) return;

  chatInput.value="";
  askTutor(v);
  chatInput.focus();
});

$$(".suggestion").forEach(b=>{
  b.addEventListener("click",()=>{
    askTutor(b.textContent);
  });
});


const star=$("#starField");if(star){const c=star.getContext("2d");let ss=[];function rs(){star.width=innerWidth;star.height=innerHeight;ss=Array.from({length:Math.min(140,Math.floor(innerWidth/8))},()=>({x:Math.random()*star.width,y:Math.random()*star.height,r:Math.random()*1.3+.3,v:Math.random()*.16+.03}))}function dr(){c.clearRect(0,0,star.width,star.height);for(const s of ss){s.y-=s.v;if(s.y<0)s.y=star.height;c.beginPath();c.fillStyle=`rgba(88,228,255,${.12+s.r*.15})`;c.arc(s.x,s.y,s.r,0,Math.PI*2);c.fill()}requestAnimationFrame(dr)}addEventListener("resize",rs);rs();dr()}
