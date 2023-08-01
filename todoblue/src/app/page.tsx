import {default as React} from "react";

export default function Page() {
	return <>
		<header>
			<h1>
				{process.env.NEXT_PUBLIC_SITE_NAME ?? "Todoblue"}
			</h1>
		</header>
		<main>
			<div className={"chapter-2"}>
				<h2>
					Crea un nuovo tabellone
				</h2>
				<form className={"panel box form-flex"}>
					<h3>
						Pubblico
					</h3>
					<p>
						Crea un nuovo tabellone pubblico, con un codice personalizzato!
						<br/>
						<small>Se un tabellone con quel codice esiste già, sarai reindirizzato ad esso.</small>
					</p>
					<label className={"float-bottom"}>
						<span>
							Codice
						</span>
						<input type={"text"} placeholder={"garas-auto-planning-2023"}/>
						<span/>
					</label>
					<label>
						<span/>
						<button>
							Crea
						</button>
						<span/>
					</label>
				</form>
				<div className={"panel box form-flex"}>
					<h3>
						Privato
					</h3>
					<p>
						Crea un nuovo tabellone privato utilizzando un codice segreto autogenerato!
						<br/>
						<small>Esso sarà accessibile solo da chi ne conosce il link.</small>
					</p>
					<label className={"float-bottom"}>
						<span/>
						<button>
							Crea
						</button>
						<span/>
					</label>
				</div>
			</div>
		</main>
		<footer>
			<p>
				© <a href="https://steffo.eu">Stefano Pigozzi</a> -
				<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL 3.0</a> -
				<a href="https://github.com/Steffo99/todocolors">GitHub</a>
			</p>
		</footer>
	</>
}
