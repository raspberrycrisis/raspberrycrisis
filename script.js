/*Navbar template. Reference is as below.
(Koishigawa, K. (2020, October 2). Reusable HTML Components – How to Reuse a Header and Footer on a Website. freeCodeCamp.
Retrieved May 22, 2023, from https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/).*/

const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
<head>
<nav class="navbar" id="myNavbar">
    <a href="index.html">HOME</a>
    <div class="dropdown">
        <button class="dropbutton">CAST
        </button>
        <div class="dropdown-content">
            <a href="characterlist.html">CHARACTERS</a>
            <a href="relations.html">CHARACTER RELATIONS</a>
        </div>
    </div>
    <a href="storysummary.html">STORY</a>
    <a href="read.html">READ</a>
    <div class="dropdown">
        <button class="dropbutton">ABOUT</button>
        <div class="dropdown-content">
            <a href="aboutauthor.html">ABOUT THE AUTHOR</a>
            <a href="aboutstory.html">ABOUT THE STORY</a>
        </div>
    </div>
    <a href="javascript:void(0);" class="icon" onclick="changeNavbar()">&#9776;</a>
</nav>

</head>
`;

class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = headerTemplate.innerHTML;
	}
}

customElements.define('header-component', Header);

//Making the navbar responsive//
function changeNavbar() {
	var x = document.getElementById("myNavbar");
	if (x.className === "navbar") {
		x.className += " responsive";
	} else {
		x.className = "navbar";
	}
}

/*Footer template. As with the navbar, this is also from freeCodeCamp.
(Koishigawa, K. (2020, October 2). Reusable HTML Components – How to Reuse a Header and Footer on a Website. freeCodeCamp.
Retrieved May 22, 2023, from https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/).*/

const footerTemplate = `
  <footer>
  <p class="footertext">Find Lianxia at these links.</p>
    <ul>
      <li><a href="https://twitter.com/">Twitter</a></li>
      <li><a href="https://instagram.com/">Instagram</a></li>
      <li><a href="https://tumblr.com/">Tumblr</a></li>
    </ul>
  </footer>
`;

class Footer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = footerTemplate;
	}
}

customElements.define('footer-component', Footer);

//Making the active tab in the navbar visible.//
function highlightMenu() {
	const nav = document.getElementById("myNavbar");
	if (!nav) {
		return;
	}
	
	
	let path = window.location.href;
	
	path = path.split('/').slice(-1)[0];
	

	const menu = nav.querySelector(`a[href='${path}']`);
	menu.classList.add('active');

	const dropdown = menu.closest('.dropdown');
	if (dropdown) {
		dropdown.querySelector('.dropbutton').classList.add('active');
	}	
}

/*Cast gallery display. I wanted to try a method that didn't require me to repeat the same code multiple times. Please
find the list used at the bottom of this file.*/
function loadCharacters(data, id) {
	const characters = []
	for (let x = 0; x < data.length; x++) {
		const cast = data[x]

		const name = '<span class="name">' + cast.name + "</span>";
		const cnName = '<span class="name">' + cast.cnName + "</span>";
		const nonENdesc = '<span class="nonENdesc">' + cast.nonENdesc + "</span>";
		const desc = '<span class="desc">' + cast.desc + "</span>";
		const url = 'images/' + cast.image + '_default.png';
		const img = `<img id="${cast.image}" src="${url}" alt="${cast.image}" onmouseover="flipIcon(this)" onmouseout="showDefaultIcon(this)"  onclick="showDetail(this, '${cast.name}')" width="160" height="150"/>`;

		let div = `<div class="cast">${img}${name}${cnName}${nonENdesc}${desc}</div>`
		characters.push(div)
	}

	document.getElementById(id).innerHTML = characters.join('');
}

function flipIcon(e) {
	const toggle = document.getElementById('disableFlip');
	if (!toggle.checked) {
		return;
	}
	const id = e.id;
	document.getElementById(id).setAttribute("src", "images/" + id + "_monster.png");
}

function showDefaultIcon(e) {
	const id = e.id;
	document.getElementById(id).setAttribute("src", "images/" + id + "_default.png");
}

window.onload = function () {
	highlightMenu();
	const mainCast = document.getElementById('mainCast');
	if (!mainCast) {
		return;
	}
	loadCharacters(mainCharacters, 'mainCast');
	loadCharacters(supportingCharacters, 'supportingCast');
	loadCharacters(colleagueCharacters, 'colleagueCast');
	loadCharacters(cafeCharacters, 'cafeCast');
	document.querySelector('#modal .close').onclick = (e) => {
		closeModal();
	}
}

/*Modal for a popup that shows more details about each character. Since it is very inefficient to create and get IDs for each
individual character and create a different modal for each of them, I tried to use a method that would query all of them
at once. Please also find the list used here at the bottom of the file.*/
function showDetail(e, name) {
	const id = e.id;
	const data = castDetails;
	const cast = data.find(d => d.id === id);

	showModal(name, cast.gender, cast.body);
}

function showModal(name, gender, content) {
	const modal = document.getElementById('modal');
	modal.querySelector('.details-name').innerHTML = name;
	modal.querySelector('.details-gender').innerHTML = gender;
	modal.querySelector('.details-body').innerHTML = content;

	modal.classList.add("show");
	modal.focus();
}

function closeModal() {
	document.getElementById('modal').classList.remove("show");
}


/*All the characters featured in the gallery on the Character List page.*/
const mainCharacters = [
	{
		id: 1,
		name: 'ASTER BAI WEN',
		cnName: '白雯',
		nonENdesc: 'shé jīng (snake spirit)',
		desc: '',
		image: 'aster',
	},
	{
		id: 2,
		name: 'CHUA QING YA, VIVIENNE',
		cnName: '蔡青雅',
		nonENdesc: 'hú lí jīng (fox spirit)',
		desc: '',
		image: 'vivienne'
	},
	{
		id: 3,
		name: 'LALAA (BILAL)',
		cnName: '',
		nonENdesc: 'hantu air (water spirit)',
		desc: '',
		image: 'lalaa'
	},
	{
		id: 4,
		name: `IAN CHAE EUN-SEONG`,
		cnName: '',
		nonENdesc: '',
		desc: 'dhampir',
		image: 'ian'
	},

];

const supportingCharacters = [
	{
		id: 1,
		name: 'TAN HONG WEI',
		cnName: '陈宏伟',
		nonENdesc: '',
		desc: 'human',
		image: 'hongwei'
	},
	{
		id: 2,
		name: 'JASPER LEE',
		cnName: '李瑜晖',
		nonENdesc: '',
		desc: 'half-lizard shifter',
		image: 'jasper'
	},
	{
		id: 3,
		name: 'MOTH',
		cnName: '',
		nonENdesc: '',
		desc: 'MOTH',
		image: 'moth'
	},
];

const colleagueCharacters = [
	{
		id: 1,
		name: '“FORK”',
		cnName: '',
		nonENdesc: '',
		desc: 'unknown unknown',
		image: 'fork'
	},
	{
		id: 2,
		name: 'WIP',
		cnName: 'WIP',
		nonENdesc: 'WIP',
		desc: '',
		image: 'WIP'
	},
	{
		id: 3,
		name: 'KIFAYAH',
		cnName: '',
		nonENdesc: 'orang bunian (“elf”)',
		desc: '',
		image: 'kifayah'
	},
	{
		id: 4,
		name: 'WAVERLEY WOO',
		cnName: '',
		nonENdesc: '',
		desc: 'human',
		image: 'waverley'
	},
];

const cafeCharacters = [
	{
		id: 1,
		name: 'WARAN “RAN” QALLI',
		cnName: '',
		nonENdesc: '',
		desc: 'xaela au ra',
		image: 'ran'
	},
	{
		id: 2,
		name: 'MOMO',
		cnName: '',
		nonENdesc: '',
		desc: 'rabbit slime',
		image: 'momo'
	},
]




const castDetails = [
	{
		id: 'aster',
		gender: 'she/her preferred, any',
		body: `<p class="biotext">Aster Bai Wen is a shé jīng (a snake spirit; no, not that one) who, after being asleep for years and years,
		decided to leave home for something new. She chose to settle down instead in a small tropical city near the equator. While she is quiet,
		rather shy, and is known to be moody, it is difficult to lose her respect once it is earned, and making friends with her guarantees that
		she’ll stay that way for at least a lifetime or two. She’s terrible at expressing it, but she immensely appreciates people who are still
		willing to be patient with her.</p>

		<p class="biotext">Aster is next door neighbours and best friends with Lalaa, and eventually befriends and starts dating Vivienne. An
		incident involving eggs has also led to her adopting a young lizard boy as her younger brother, and she has gotten used to life with him
		while, perhaps unusually for someone like her, maintaining her interest in technology. These days, maybe there is something brewing
		between her, Vivienne, and the tall, stoic doctor who lives one floor below…</p>
		`,
	},

	{
		id: 'vivienne',
		gender: 'she/he',
		body: `<p class="biotext">Vivienne Chua Qing Ya is a hú lí jīng, or fox spirit. Technically, she is a hú lí jīng who lay dormant in a
		human girl before becoming fully manifested. She is lively and usually doesn’t take most things too seriously, though she truly does
		enjoy making people laugh with her antics. She has had trouble adjusting to her new life in the years after she truly became inhuman,
		and avoids thinking about it as much as she can by busying herself with running a bakery with her best friend. When one suddenly has
		all the time in the world, it can be difficult to decide how to take the next step, especially when one’s human side is gradually
		slipping away from them too.</p>

		<p class="biotext">Vivienne is friends with Lalaa through Aster, the latter of whom she befriends and eventually starts dating. Did
		they know each other in another life? Vivienne can’t remember, but there’s an odd familiarity about Aster that she only really
		realises is there after they become friends. She does still keep in touch with friends from before, most notably her childhood best
		friend, Hong Wei. Nowadays, she feels like something might happen between her, Aster, and that tall doctor living on the floor below
		Aster’s…</p>`,
	},

	{
		id: 'lalaa',
		gender: 'she/her, or none',
		body: `<p class="biotext">Lalaa is a hantu air, or water spirit. Life can get rather lonely when you haunt a longkang (storm drain)
		all by yourself, so Lalaa, tired of the monotony of her life, decided to try out life as a mortal. A cheerful and bubbly person, she
		can talk to anyone about anything, though some may find her rather too talkative for their liking. Privately, she is fearful of having
		to go back to her days of being the local haunt alone, and longs for a friend or two to spend her days with. One can imagine how
		excited she was after she got to know a certain neighbour of hers.</p>
		
		<p class="biotext">Lalaa is next door neighbours and best friends with Aster and is friends with Vivienne through Aster as well.
		She has a merman friend she is close to and has taken in a strange little moth child who now lives with her. Sometimes, she
		enjoys getting out of the flat and visiting different cafés to do her work, and she has fun talking to the regulars and sometimes
		strangers she meets on her breaks. Her latest endeavours usually involve friends, both old and new, in some way…</p>`,
	},

	{
		id: 'ian',
		gender: 'they/them',
		body: `<p class="biotext">Ian Chae is a dhampir who has lived two hundred years too long. Their lengthy lifespan has brought them
		from Victorian London to the shores of this island nation, where they work their (no longer unlicensed) medical practice. A stoic
		and frequently brooding person, they still haven't brushed off some of the cobwebs of their past. At first glance, their sharp
		intelligence and questionable morals cut an intimidating figure, yet this edge sometimes seems to be tempered by a more tender
		melancholy. </p>
		
		<p class="biotext">Ian lives alone and has had no interest in changing that for centuries. Their increasingly more frequent
		encounters with their upstairs neighbour, however, may be leading them inexplicably to a lively new life.</p>`,
	},

	
	{
		id: 'hongwei',
		gender: 'he/him',
		body: `<p class="biotext">Tan Hong Wei is a normal person. Okay, maybe he's not as normal as you think he is, but he's mostly as
		normal as they come. On his eighteenth birthday, he found himself blessed with sight that let him see some… otherworldly… traits
		in the people around him, as cliché as it is. Though it did not take him too long to adjust to the small change, mostly due to
		the fact that he figured that they were all pretty harmless, what on earth was he supposed to do when his best friend of a decade
		showed up with some unusual traits on the day of her eighteenth birthday?</p>
		
		<p class="biotext">Hong Wei is longtime best friends with Vivienne and they have the shared passion of baking.</p>`,
	},

	{
		id: 'jasper',
		gender: 'any/he',
		body: `<p class="biotext">Jasper is a teenage boy who has spent most of his life on the streets, and only half of that time as a
		human. Half shapeshifter with a lizard form, he enjoys rollerblading and eating eggs raw. He is an upbeat, energetic boy, equal
		parts anxious and exuberant. His pursuit of eggs has historically led him into some sticky situations, during one of which he met 
		Aster.</p>
		
		<p class="biotext">Aster is very important to him. He has a home with her now. Jasper has also begun to make his first real
		friend, a moth. </p>`,
	},

	{
		id: 'moth',
		gender: 'they/any',
		body: `<p class="biotext">Moth is a moth who took a great liking to Lalaa, and who now lives with her. They are very much a moth.</p>`,
	},

	{
		id: 'fork',
		gender: 'they/none',
		body: `<p class="biotext">Fork is an eccentric unknown entity of unknown origin here to have a good time and, true to their name,
		grow their fork collection. Incredibly curious and inquisitive, they are looking forward to enjoying their time pretending to be
		human. Even if they aren't very good at it yet.</p>

		<p class="biotext">Fork runs a company of some kind, solo. Aster works as their 'secretary.' They have an extensive collection of
		forks and enjoy reading instruction manuals.</p>`,
	},

	{
		id: 'WIP',
		gender: '?',
		body: `<p class="biotext">NIL</p>`,
	},

	{
		id: 'kifayah',
		gender: 'they/she/he',
		body: `<p class="biotext">Kifayah left their home deep inside the mountains to search for a sibling. This led to their arrival on a
		nearby little tropical island across a causeway, and that is where they have remained since. Serene, easygoing, and ever calm, she
		proves to be a great rock to lean on for anyone. He would like to find his sibling, but given how much time is remaining in eternity—
		Kifayah is in no hurry.</p>
		
		<p class="biotext">Kifayah's current job is a cashier at a local café.</p>`,
	},

	{
		id: 'waverley',
		gender: 'she/they preferred, any',
		body: `<p class="biotext">Waverley is just an ordinary human only tangentially involved in the main cast's shenanigans. As the regular 
		delivery girl for Vivienne's bakery, she has walked in on many a strange incident, yet somehow always manages to take it in stride with
		a remarkable lack of suspicion. It remains to be seen whether this is out of stupidity, or self-preservation.</p>
		
		<p class="biotext">Waverley leads a normal life with normal friends and family outside of her job.</p>`,
	},

	{
		id: 'ran',
		gender: 'he/him',
		body: `<p class="biotext">Ran is an Au Ra who has travelled far from his home star Eitherys. Originally an adventurer by trade, h
		spends his days in this world baristaing at his friend Butters' cafe, fishing, and looking after his "adopted" "pet" "rabbit" Momo.
		While he has a reserved self-assurance that may come off as cold aloofness, Ran is openly affectionate to friends and has a flirty,
		sunny side.</p>
		
		<p class="biotext">Ran has known Momo since he was an egg. Though their journey has changed her into something entirely different
		and significantly more gelatinous, their friendship remains as familiar as the endless plains of his homeland. He is content to see
		where this newfound adventure leads.</p>`,
	},

	{
		id: 'momo',
		gender: 'she/her',
		body: `<p class="biotext">Momo is a slime-like, rabbit-resembling traveller creature from another world. While her vocabulary in this
		world and form is limited to her own name alone, she is still rather intelligent and is perfectly capable of understanding multiple
		languages. She does demonstrate rabbit-like behaviour much of the time, though unlike a normal rabbit, she can consume carrots without
		issue and greatly enjoys doing so. She is also known to enjoy cabbage.</p>
		
		<p class="biotext">Momo lives with her friend Ran. They have known each other for a long, long time, and have a friendship that
		transcends space, despair, and the supposed end of the universe. Perhaps in another world, she knew something of a Mothercrystal.
		Where will their adventures bring her next?
		</p>`,
	},

]

