const btn_n = document.getElementById('btn_note');
let notes = document.getElementById('notes');
let clicks = localStorage.getItem('clicks');
let arrlang = ["ru", "en", "ua", "fr", "de", "pl"]
const select = document.getElementById('sel_l');
const themeSwitcher = document.querySelectorAll('#th');

if(localStorage.getItem('theme') == null) {
	localStorage.setItem('theme', "dark");
}

let activeTheme = localStorage.getItem('theme');

themeSwitcher.forEach(switcher => {
	switcher.addEventListener('click', function() {
		applyTheme(this.dataset.theme);
		localStorage.setItem('theme', this.dataset.theme)
		for(let i = 1; i <= clicks; i++){
			let title_notes = document.getElementById(`title_notes${i}`);
			if(localStorage.getItem('theme') == "dark") {
				title_notes.style.textDecoration = "none";
				title_notes.style.color = "#fff";
			}
			if(localStorage.getItem('theme') == "light") {
				title_notes.style.textDecoration = "none";
				title_notes.style.color = "#000";
			}
		}
		for(let i = 1; i <= clicks; i++){
			let btn_el_m_img = document.getElementById(`made_img${i}`);
			let btn_el_d_img = document.getElementById(`del_img${i}`);
			if(localStorage.getItem('theme') == "dark") {
	  		btn_el_m_img.setAttribute('src', "images/made dark.png");
	  		btn_el_d_img.setAttribute('src', "images/delete dark.png");
	  	}
	  	if(localStorage.getItem('theme') == "light") {
	  		btn_el_m_img.setAttribute('src', "images/made light.png");
	  		btn_el_d_img.setAttribute('src', "images/delete light.png");
	  	}
		}
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
  btn_el_m.classList.add("made");
  btn_el_m.id = `made${clicks}`;
  let btn_el_m_img = document.createElement("img");
  btn_el_m_img.classList.add("made_img")
  btn_el_m_img.id = `made_img${clicks}`;
  if(localStorage.getItem('theme') == "dark") {
  	btn_el_m_img.setAttribute('src', "images/made dark.png");
  }
  if(localStorage.getItem('theme') == "light") {
  	btn_el_m_img.setAttribute('src', "images/made light.png");
  }
  all_st.appendChild(btn_el_m);
  btn_el_m.appendChild(btn_el_m_img);

	let title_note_el = document.createElement("p");
  title_note_el.id = `title_notes${clicks}`;
  title_note_el.classList.add("title_note")
  title_note_el.innerHTML = title.value;
	all_st.appendChild(title_note_el);

	let btn_el_d = document.createElement("button");
  btn_el_d.classList.add("delete");
  btn_el_d.id = `delete${clicks}`;
  let btn_el_d_img = document.createElement("img");
  btn_el_d_img.classList.add("delete_img");
  btn_el_d_img.id = `del_img${clicks}`;
  if(localStorage.getItem('theme') == "dark") {
  	btn_el_d_img.setAttribute('src', "images/delete dark.png");
  }
  if(localStorage.getItem('theme') == "light") {
  	btn_el_d_img.setAttribute('src', "images/delete light.png");
  }
  all_st.appendChild(btn_el_d);
  btn_el_d.appendChild(btn_el_d_img);

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
			if(localStorage.getItem('theme') == "dark") {
				if(title_notes.style.textDecoration == "line-through") {
					title_notes.style.textDecoration = "none";
					title_notes.style.color = "#fff";
				}
				else {
					title_notes.style.textDecoration = "line-through";
					title_notes.style.color = "#696969";
				}
			}
			if(localStorage.getItem('theme') == "light") {
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
	  	let elem = document.getElementById(`note${i}`)
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
		let btn_el_m_img = document.getElementById(`made_img${i}`);
		let btn_el_d_img = document.getElementById(`del_img${i}`);
		if(localStorage.getItem('theme') == "dark") {
	  	btn_el_m_img.setAttribute('src', "images/made dark.png");
	  	btn_el_d_img.setAttribute('src', "images/delete dark.png");
	  }
	  if(localStorage.getItem('theme') == "light") {
	  	btn_el_m_img.setAttribute('src', "images/made light.png");
	  	btn_el_d_img.setAttribute('src', "images/delete light.png");
	  }
	}

	for(let i = 1; i <= clicks; i++){
		let made = document.getElementById(`made${i}`);
		made.addEventListener('click', function () {	
			let title_notes = document.getElementById(`title_notes${i}`);
			if(localStorage.getItem('theme') == "dark") {
				if(title_notes.style.textDecoration == "line-through") {
					title_notes.style.textDecoration = "none";
					title_notes.style.color = "#fff";
				}
				else {
					title_notes.style.textDecoration = "line-through";
					title_notes.style.color = "#696969";
				}
			}
			if(localStorage.getItem('theme') == "light") {
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
	for(let i = 1; i <= clicks; i++) {
  	let del = document.getElementById(`delete${i}`)
  	del.addEventListener('click', function () {
	  	let elem = document.getElementById(`note${i}`)
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
	  	let elem = document.getElementById(`note${i}`)
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