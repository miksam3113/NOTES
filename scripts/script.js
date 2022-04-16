const btn_n = document.getElementById('btn_note');
let notes = document.getElementById('notes');
let clicks = localStorage.getItem('clicks');
let arrlang = ["ru", "en", "ua", "fr", "de", "pl"]
const select = document.getElementById('sel_l');
const themeSwitcher = document.querySelectorAll('#th');
let activeTheme = localStorage.getItem('theme');

themeSwitcher.forEach(switcher => {
	switcher.addEventListener('click', function() {
		applyTheme(this.dataset.theme);
		localStorage.setItem('theme', this.dataset.theme)
	})
})

function applyTheme(themeName) {
	let themeURL = `styles/${themeName}_theme.css`;
	document.querySelector('[title="theme"]').setAttribute('href', themeURL);
}

if(activeTheme === null) {
	applyTheme('dark');
}
else {
	applyTheme(activeTheme);
}

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
	let lang = select.value;
	location.href = window.location.pathname + '#' + lang;
	location.reload();
}

function changeLanguage() {
	let hash = window.location.hash;
	hash = hash.substr(1);
	if(!arrlang.includes(hash)) {
		location.href = window.location.pathname + "#en";
		location.reload();
	}
	select.value = hash;
	document.querySelector('title').innerHTML = langARR["unit"][hash];
	document.querySelector('.title_all').innerHTML = langARR["title_all"][hash];
	document.querySelector('#title_input').value = langARR["title_note"][hash];
	document.querySelector('#txt_input').placeholder = langARR["placeholder"][hash];
	document.querySelector('#btn_note').innerHTML = langARR["save"][hash];
	return hash;
}

changeLanguage();

btn_n.addEventListener('click', function() {
	let title = document.getElementById('title_input');
	let txt = document.getElementById('txt_input');
	localStorage.setItem('clicks', ++clicks);
	console.log(clicks);

	if(title.value == "Заметка" || title.value == "Note" || title.value == "Нотатка" || title.value == "La note" || title.value == "Die Notiz" || title.value == "Notatka"){
		title.value += clicks;
	}

	localStorage.setItem(`title${clicks}`, title.value);
	localStorage.setItem(`txt${clicks}`, txt.value);

  let note_el = document.createElement("div");
  note_el.id = `note${clicks}`;
  note_el.classList.add("note");
  note_el.classList.add("note_new");
	notes.appendChild(note_el);

	let all_st = document.createElement("div");
  all_st.classList.add("all_st");
	note_el.appendChild(all_st);

	let btn_el_m = document.createElement("button");
  btn_el_m.id = `made${clicks}`;
  btn_el_m.classList.add("made");
  btn_el_m.innerHTML = "&#10004";
	all_st.appendChild(btn_el_m);

	let title_note_el = document.createElement("p");
  title_note_el.id = `title_notes${clicks}`;
  title_note_el.classList.add("title_note")
  title_note_el.innerHTML = title.value;
	all_st.appendChild(title_note_el);

	let btn_el_d = document.createElement("button");
  btn_el_d.id = `delete${clicks}`;
  btn_el_d.classList.add("delete")
  btn_el_d.innerHTML = "&#10006";
	all_st.appendChild(btn_el_d);

	let btn_open = document.createElement("button");
  btn_open.id = `open${clicks}`;
  btn_open.classList.add("open")
  btn_open.innerHTML = '<img class="open_btn" src="images/open.png">';
	note_el.appendChild(btn_open);
		
	localStorage.setItem(`note${clicks}`, notes.innerHTML);

	let hash = changeLanguage();
	title.value = langARR["title_note"][hash];
	txt.value = "";

	for(let i = 1; i <= clicks; i++){
		let made = document.getElementById(`made${i}`);
		made.addEventListener('click', function () {	
			let title_notes = document.getElementById(`title_notes${i}`);
			if(activeTheme == 'dark') {
				if(title_notes.style.textDecoration == "line-through") {
					title_notes.style.textDecoration = "none";
					title_notes.style.color = "#fff";
				}
				else {
					title_notes.style.textDecoration = "line-through";
					title_notes.style.color = "#696969";
				}
			}
			if(activeTheme == 'light') {
				if(title_notes.style.textDecoration == "line-through") {
					title_notes.style.textDecoration = "none";
					title_notes.style.color = "#000";
				}
				else {
					title_notes.style.textDecoration = "line-through";
					title_notes.style.color = "#696969";
				}
			}
		})
	}

	let del = document.getElementById(`delete${clicks}`)
  del.addEventListener('click', function () {
	  let elem = document.getElementById(`note${clicks}`)
		localStorage.setItem('clicks', --clicks);
		console.log(clicks);
  	elem.style.opacity = '0';
  	window.setTimeout(
  	  function removethis()
  	  {
  	    elem.style.display='none';
  	    elem.remove();
  	  }, 300);
	})

	for(let i = 1; i <= clicks; i++){
		let open = document.getElementById(`open${i}`);
		open.addEventListener('click', function () {
			let title = document.getElementById('title_input');
			let txt = document.getElementById('txt_input');
			title.value = localStorage.getItem(`title${i}`);
			txt.value = localStorage.getItem(`txt${i}`);
	  	let elem = document.getElementById(`note${clicks}`)
			localStorage.setItem('clicks', --clicks);
			console.log(clicks);
  		elem.style.opacity = '0';
  		window.setTimeout(
  		  function removethis() {
  		    elem.style.display='none';
  		    elem.remove();
  		  }, 300);
		})
	}
})

function onloadpage() {
	console.log(clicks);
	if(clicks == 0) {
		notes.innerHTML = "";
	}
	else {
		notes.innerHTML = localStorage.getItem(`note${clicks}`);
	}
	for(let i = 1; i <= clicks; i++){
		let made = document.getElementById(`made${i}`);
		made.addEventListener('click', function () {	
			let title_notes = document.getElementById(`title_notes${i}`);
			if(title_notes.style.textDecoration == "line-through") {
				title_notes.style.textDecoration = "none";
				if(activeTheme == "light") {
					title_notes.style.color = "#000";
				}
				if(activeTheme == "dark"){
					title_notes.style.color = "#fff"
				}
			}
			else {
				title_notes.style.textDecoration = "line-through";
				title_notes.style.color = "#696969";
			}
		})
	}
	for(let i = 1; i <= clicks; i++) {
  	let del = document.getElementById(`delete${i}`)
  	del.addEventListener('click', function () {
	  	let elem = document.getElementById(`note${clicks}`)
			localStorage.setItem('clicks', --clicks);
			console.log(clicks);
  		elem.style.opacity = '0';
  		window.setTimeout(
  		  function removethis() {
  		    elem.style.display='none';
  		    elem.remove();
  		  }, 300);
  	})
	}
	for(let i = 1; i <= clicks; i++){
		let open = document.getElementById(`open${i}`);
		open.addEventListener('click', function () {
			let title = document.getElementById('title_input');
			let txt = document.getElementById('txt_input');
			title.value = localStorage.getItem(`title${i}`);
			txt.value = localStorage.getItem(`txt${i}`);
	  	let elem = document.getElementById(`note${clicks}`)
			localStorage.setItem('clicks', --clicks);
			console.log(clicks);
  		elem.style.opacity = '0';
  		window.setTimeout(
  		  function removethis() {
  		    elem.style.display='none';
  		    elem.remove();
  		  }, 300);
		})
	}
}

window.onload = onloadpage;