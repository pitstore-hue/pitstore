import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";

const CONTACT_EMAIL = "pitstorechat@gmail.com";

function ResiRimborsiModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Chiudi"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 flex max-h-[85vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl">Resi &amp; Rimborsi</h2>
          <button onClick={onClose} aria-label="Chiudi">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-muted-foreground">
          <p>
           La nostra politica di reso prevede un termine di 14 giorni, il che significa che hai 14 giorni di tempo dalla ricezione del prodotto per richiedere un reso.
          </p>
          <p>
            Per poter essere restituito, il prodotto deve essere nelle condizioni previste dalla normativa applicabile. Può essere aperto e verificato nella misura necessaria per controllarne la natura, le caratteristiche e il funzionamento. Qualora venga utilizzato o manipolato oltre quanto necessario, potrà essere applicata una riduzione del rimborso proporzionata all'eventuale diminuzione di valore.
          </p>
          <p>
            Per avviare una procedura di reso, puoi contattarci all'indirizzo{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            . Ti forniremo le istruzioni e l'indirizzo al quale dovrà essere spedito il prodotto.
          </p>
          <p>
            Dopo aver ricevuto la tua richiesta, ti forniremo le istruzioni su come e dove spedire il pacco. Ti chiediamo di contattarci prima di effettuare la spedizione, così da poter gestire correttamente la procedura di reso.Gli articoli rispediti senza
            aver prima richiesto un reso non saranno accettati.
          </p>
          <p>
            Puoi sempre contattarci per qualsiasi domanda sui resi all'indirizzo{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <div>
            <h3 className="text-base font-semibold text-foreground">Danni e problemi</h3>
            <p className="mt-2">
              Ti preghiamo di controllare il prodotto al momento della ricezione e di contattarci il prima possibile se risulta difettoso, danneggiato o se hai ricevuto un prodotto diverso da quello ordinato, in modo che possiamo valutare il problema e indicarti la soluzione più adatta.

In caso di prodotto difettoso o non conforme, si applicano i diritti previsti dalla garanzia legale di conformità. In questi casi, quando possibile e previsto dalla normativa applicabile, la soluzione normalmente proposta da PitStore sarà la sostituzione del prodotto.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Sostituzioni</h3>
            <p className="mt-2">
              In caso di prodotto difettoso, danneggiato o diverso da quello ordinato, la sostituzione è la soluzione che normalmente preferiamo utilizzare.

Dopo aver ricevuto e controllato il prodotto, potremo procedere alla spedizione di un nuovo prodotto, quando previsto e possibile, oppure applicare la soluzione prevista dalla normativa applicabile.

La sostituzione non limita il diritto di recesso o gli altri diritti riconosciuti dalla legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Rimborsi</h3>
            <p className="mt-2">
              I rimborsi vengono effettuati secondo quanto previsto dalla normativa applicabile.

Nel caso in cui venga esercitato validamente il diritto di recesso entro i termini previsti, il rimborso sarà effettuato anche nel caso in cui il prodotto non presenti alcun difetto. Il fatto che il prodotto sia perfettamente funzionante non esclude il diritto di recesso.

Una volta ricevuto il prodotto restituito, procederemo alla verifica delle sue condizioni. Se il prodotto è stato utilizzato o manipolato oltre quanto necessario per verificarne la natura, le caratteristiche e il funzionamento, potrà essere applicata una riduzione del rimborso proporzionata all'eventuale diminuzione di valore.

Il rimborso sarà effettuato utilizzando lo stesso metodo di pagamento utilizzato per l'acquisto, salvo diverso accordo.

Il rimborso potrà essere trattenuto fino alla ricezione del prodotto restituito oppure fino a quando non avrai dimostrato di averlo rispedito, se precedente, nei limiti previsti dalla legge.
            </p>
            <p className="mt-2">
              Per qualsiasi domanda relativa a resi e rimborsi, puoi contattarci all'indirizzo{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Chiudi"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 flex max-h-[85vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl">Privacy</h2>
          <button onClick={onClose} aria-label="Chiudi">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            PitStore gestisce questo negozio e questo sito web, comprese tutte le relative informazioni, contenuti, funzionalità, strumenti, prodotti e servizi, al fine di offrirti, in qualità di cliente, un'esperienza di acquisto personalizzata (i "Servizi").
          </p>
          <p>
            La presente Informativa sulla Privacy descrive come raccogliamo, utilizziamo, conserviamo e divulghiamo le tue informazioni personali quando visiti, utilizzi o effettui un acquisto o un'altra transazione tramite i Servizi, oppure quando comunichi con noi.
          </p>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Informazioni personali che raccogliamo o trattiamo
            </h3>
            <p className="mt-2">
              A seconda di come interagisci con i Servizi, del luogo in cui vivi e di quanto consentito o richiesto dalla legge applicabile, possiamo raccogliere o trattare dati identificativi e di contatto, come nome, cognome, indirizzo di spedizione, indirizzo di fatturazione, indirizzo email e, quando necessario per la consegna, numero di telefono.

Possiamo inoltre trattare informazioni relative agli ordini, come i prodotti acquistati, la quantità, l'importo dell'ordine, lo stato dell'ordine e le informazioni relative alla spedizione e alla consegna.

Le informazioni relative ai pagamenti possono essere trattate direttamente dai nostri fornitori di servizi di pagamento. PitStore non conserva i dati completi delle carte di pagamento, salvo nei casi in cui ciò sia necessario e consentito dai servizi utilizzati.

Possiamo inoltre raccogliere le comunicazioni che ci invii, comprese le informazioni contenute nelle richieste rivolte al servizio clienti, nonché informazioni tecniche relative al dispositivo e all'utilizzo dei Servizi, come indirizzo IP, tipo di dispositivo, browser, sistema operativo, pagine visitate e informazioni raccolte tramite cookie e tecnologie simili.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Fonti delle informazioni personali
            </h3>
            <p className="mt-2">
              Raccogliamo informazioni direttamente da te quando effettui un ordine, utilizzi i Servizi o ci contatti.

Possiamo inoltre raccogliere automaticamente determinate informazioni durante l'utilizzo del sito, anche tramite cookie e tecnologie simili.

In alcuni casi possiamo ricevere informazioni dai nostri fornitori di servizi, partner commerciali o altri soggetti coinvolti nella gestione degli ordini, dei pagamenti e delle spedizioni.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Come utilizziamo le tue informazioni personali
            </h3>
            <p className="mt-2">
              Utilizziamo le tue informazioni personali per fornire, gestire e migliorare i Servizi, inclusa la gestione degli ordini, dei pagamenti, dei resi, dei rimborsi, dell'assistenza clienti e delle spedizioni.

Utilizziamo le informazioni necessarie per elaborare e consegnare il tuo ordine all'indirizzo da te indicato. Il trattamento dei dati necessario per queste attività si basa, in generale, sull'esecuzione del contratto di vendita o sull'adozione di misure precontrattuali richieste dall'utente.

Possiamo utilizzare determinate informazioni per rispettare gli obblighi previsti dalla legge, inclusi gli obblighi fiscali, contabili e amministrativi.

Possiamo inoltre utilizzare determinate informazioni per proteggere i Servizi, prevenire frodi, abusi, accessi non autorizzati e altre attività illecite.

Possiamo utilizzare le informazioni di contatto per comunicare con te in relazione agli ordini, alle spedizioni, alle richieste di assistenza e ad altre comunicazioni necessarie relative ai Servizi.

Per finalità di marketing e pubblicità, utilizziamo i dati personali esclusivamente quando ciò sia consentito dalla normativa applicabile. Quando richiesto dalla legge, tali attività saranno effettuate sulla base del consenso dell'utente. Puoi revocare il consenso o opporti alle comunicazioni di marketing in qualsiasi momento.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Come divulghiamo le informazioni personali
            </h3>
            <p className="mt-2">
              Possiamo condividere le informazioni personali con fornitori di servizi, partner commerciali e altri soggetti che ci aiutano a fornire i Servizi, nella misura necessaria per le finalità descritte nella presente Informativa.

Possiamo condividere i dati con fornitori di servizi di pagamento, piattaforme e-commerce, fornitori di servizi informatici, servizi di hosting, corrieri, società di logistica, fornitori incaricati della gestione e dell'evasione degli ordini e fornitori di assistenza.

Quando effettui un acquisto, alcuni dati necessari per completare e consegnare il tuo ordine, come nome, indirizzo di spedizione, informazioni relative all'ordine e, quando necessario per la consegna, numero di telefono, possono essere comunicati al fornitore incaricato di preparare e spedire il prodotto direttamente a te.

Tali informazioni vengono condivise esclusivamente nella misura necessaria per consentire l'evasione dell'ordine, la spedizione e la consegna del prodotto.

Possiamo inoltre divulgare informazioni personali quando richiesto dalla legge, per rispettare obblighi legali, per proteggere i nostri diritti o per prevenire frodi, abusi o attività illecite.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Siti web e link di terze parti
            </h3>
            <p className="mt-2">
              I Servizi possono contenere collegamenti o integrazioni con siti, piattaforme e servizi gestiti da terze parti, per i quali non siamo responsabili.

Ti consigliamo di consultare le relative informative sulla privacy prima di utilizzare tali servizi o fornire loro informazioni personali.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Dati dei minori</h3>
            <p className="mt-2">
              I Servizi non sono destinati a persone che non abbiano l'età minima richiesta dalla normativa applicabile per effettuare acquisti online.

Non raccogliamo consapevolmente informazioni personali relative a minori in violazione della normativa applicabile.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Sicurezza e conservazione delle informazioni
            </h3>
            <p className="mt-2">
              Adottiamo misure tecniche e organizzative ragionevoli per proteggere le informazioni personali da accessi non autorizzati, perdita, distruzione, alterazione o divulgazione non autorizzata.

Nessuna misura di sicurezza è perfetta o completamente impenetrabile.

Conserviamo le informazioni personali per il periodo necessario a fornire i Servizi e a rispettare gli obblighi legali, fiscali e contabili applicabili, nonché per il tempo necessario a tutelare i nostri diritti.

Quando le informazioni non sono più necessarie, saranno cancellate o rese anonime, ove possibile e nel rispetto della normativa applicabile.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Cookie e tecnologie simili
            </h3>
            <p className="mt-2">
              Il sito può utilizzare cookie e tecnologie simili per garantire il corretto funzionamento dei Servizi, ricordare determinate preferenze, analizzare l'utilizzo del sito e, quando consentito dalla normativa applicabile, effettuare attività di marketing e pubblicità.

Per maggiori informazioni sul trattamento dei dati tramite cookie, puoi consultare la relativa Cookie Policy, se disponibile.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              I tuoi diritti
            </h3>
            <p className="mt-2">
              Nei limiti previsti dalla normativa applicabile, puoi avere il diritto di ottenere conferma dell'esistenza di un trattamento dei tuoi dati personali, ottenere accesso ai tuoi dati, chiedere la rettifica dei dati inesatti o incompleti, chiedere la cancellazione dei dati quando ne ricorrono i presupposti, chiedere la limitazione del trattamento, opporti a determinati trattamenti e, quando applicabile, ricevere i dati personali in un formato strutturato e richiederne la portabilità.

Quando il trattamento si basa sul consenso, puoi revocare il consenso in qualsiasi momento. La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca.

Puoi inoltre opporti in qualsiasi momento al trattamento dei dati personali effettuato per finalità di marketing diretto.

Hai inoltre il diritto di proporre reclamo all'autorità di controllo competente in materia di protezione dei dati personali qualora ritenga che il trattamento dei tuoi dati violi la normativa applicabile.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Modifiche alla presente Informativa sulla Privacy
            </h3>
            <p className="mt-2">
              Potremmo aggiornare periodicamente la presente Informativa sulla Privacy per riflettere modifiche ai nostri Servizi, ai fornitori utilizzati o alla normativa applicabile.

La versione aggiornata sarà pubblicata su questa pagina e, quando necessario, sarà indicata la relativa data di aggiornamento.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Contatti</h3>
            <p className="mt-2">
              Per qualsiasi domanda relativa alla presente Informativa sulla Privacy o per esercitare i tuoi diritti in relazione al trattamento dei dati personali puoi contattarci al seguente indirizzo email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminiCondizioniModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Chiudi"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 flex max-h-[85vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl">Termini e Condizioni</h2>
          <button onClick={onClose} aria-label="Chiudi">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Benvenuto su PitStore! I termini "noi", "ci" e "nostro" si riferiscono a PitStore, che gestisce questo sito web per offrirti un'esperienza di acquisto personalizzata (i "Servizi").
          </p>
          <p>
            Visitando, interagendo con o utilizzando i nostri Servizi, accetti di essere vincolato dai presenti Termini e Condizioni e dalla nostra Informativa sulla Privacy. Se non li accetti, non dovresti utilizzare o accedere ai nostri Servizi.
          </p>

          <div>
            <h3 className="text-base font-semibold text-foreground">Accesso e account</h3>
            <p className="mt-2">
              Accettando i presenti Termini, dichiari di aver raggiunto la maggiore età prevista dalla legge nel tuo luogo di residenza. Sei responsabile della sicurezza delle credenziali del tuo account e delle attività effettuate tramite esso. Non puoi trasferire, vendere o cedere il tuo account a un'altra persona.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">I nostri prodotti</h3>
            <p className="mt-2">
              Facciamo ogni ragionevole sforzo per rappresentare accuratamente i nostri prodotti. Tuttavia, colori, immagini e aspetto dei prodotti possono variare a seconda del dispositivo utilizzato. Le descrizioni e le caratteristiche dei prodotti possono essere modificate in qualsiasi momento, fermo restando quanto previsto dalla legge applicabile. Possiamo inoltre limitare le quantità disponibili per determinati prodotti.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Ordini</h3>
            <p className="mt-2">
              L'invio di un ordine costituisce una proposta di acquisto. Dopo aver ricevuto il tuo ordine, potremmo inviarti una conferma di ricezione. L'ordine si considera accettato quando ti comunichiamo la conferma dell'accettazione o quando procediamo alla spedizione del prodotto, salvo diversa comunicazione.

Ci riserviamo il diritto di rifiutare o annullare un ordine in caso di indisponibilità del prodotto, errori evidenti nel prezzo o nella descrizione, sospetto di attività fraudolente o altri motivi legittimi previsti dalla legge. In caso di annullamento di un ordine già pagato, provvederemo al relativo rimborso.

I tuoi acquisti sono soggetti al diritto di recesso, alla garanzia legale di conformità e agli eventuali ulteriori diritti previsti dalla normativa applicabile, oltre a quanto indicato nella nostra Politica sui Resi.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Prezzi e fatturazione</h3>
            <p className="mt-2">
              I prezzi dei prodotti sono quelli indicati sul sito al momento dell'acquisto e comprendono le imposte applicabili, salvo diversa indicazione. Eventuali costi aggiuntivi, comprese le spese di spedizione, saranno indicati prima della conclusione dell'ordine.

Prezzi, sconti e promozioni possono essere modificati in qualsiasi momento, ma le modifiche non influiranno sugli ordini già accettati.

Accetti di fornire informazioni di pagamento aggiornate, complete e accurate e di verificare che i dati forniti siano corretti prima di completare l'acquisto.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Spedizione e consegna</h3>
            <p className="mt-2">
              I tempi di consegna indicati sul sito sono stime e possono variare in base al metodo di spedizione e alle circostanze della consegna. Faremo ogni ragionevole sforzo per rispettare i tempi indicati.

Non siamo responsabili per ritardi derivanti da circostanze al di fuori del nostro ragionevole controllo, fermo restando quanto previsto dalla normativa applicabile.

Il rischio di perdita o danneggiamento dei prodotti passa al cliente nel momento in cui il cliente, o un terzo da lui designato diverso dal corriere, acquisisce materialmente il possesso dei prodotti, salvo i casi previsti dalla legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Proprietà intellettuale</h3>
            <p className="mt-2">
              Marchi, testi, immagini, grafiche, loghi e altri contenuti presenti sui Servizi sono di proprietà di PitStore o dei rispettivi titolari dei diritti e sono protetti dalle leggi applicabili.

Puoi utilizzare i Servizi esclusivamente per uso personale e non commerciale. Non è consentito copiare, riprodurre, modificare, distribuire, pubblicare o utilizzare commercialmente i contenuti dei Servizi senza il nostro previo consenso scritto, salvo quanto espressamente consentito dalla legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Strumenti opzionali e link di terze parti</h3>
            <p className="mt-2">
              Potremmo offrirti l'accesso a strumenti o servizi di terze parti sui quali non esercitiamo controllo diretto. Tali strumenti e servizi sono forniti secondo le condizioni stabilite dai rispettivi fornitori.

Potremmo inoltre includere link a siti web o servizi di terze parti. Non siamo responsabili dei contenuti, delle pratiche o delle condizioni applicate da tali soggetti. L'utilizzo di servizi o siti di terze parti avviene sotto la tua responsabilità.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Privacy</h3>
            <p className="mt-2">
              Le informazioni personali che raccogliamo attraverso i Servizi sono trattate in conformità con la nostra Informativa sulla Privacy.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Feedback</h3>
            <p className="mt-2">
              Se ci invii idee, suggerimenti, recensioni o altri feedback, ci concedi una licenza gratuita, mondiale e non esclusiva per utilizzare, riprodurre, modificare, pubblicare e distribuire tali contenuti attraverso qualsiasi mezzo, anche per finalità commerciali.

La concessione di tale licenza non ci obbliga a utilizzare il feedback ricevuto né a corrispondere alcun compenso. Non utilizzeremo il feedback in modo da identificarti personalmente senza una base giuridica o il tuo consenso, quando richiesto dalla legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Usi vietati</h3>
            <p className="mt-2">
              Puoi utilizzare i Servizi esclusivamente per scopi leciti e nel rispetto dei presenti Termini e della normativa applicabile.

È vietato utilizzare i Servizi per violare leggi o regolamenti applicabili, violare diritti di proprietà intellettuale, molestare o danneggiare altre persone, trasmettere virus o materiale dannoso, raccogliere dati senza autorizzazione, tentare di compromettere la sicurezza dei Servizi o aggirare le misure tecniche e di sicurezza da noi adottate.

Ci riserviamo il diritto di sospendere o terminare un account in caso di violazione dei presenti Termini, di utilizzo illecito dei Servizi o quando ciò sia necessario per motivi di sicurezza o per adempiere a obblighi di legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Agenti automatizzati</h3>
            <p className="mt-2">
              Se utilizzi software, bot o altri strumenti che agiscono in modo autonomo o semi-autonomo per interagire con i Servizi, devi farlo nel rispetto delle leggi applicabili e delle eventuali restrizioni tecniche da noi stabilite.

Non è consentito utilizzare strumenti automatizzati per simulare intenzionalmente un comportamento umano, compromettere il funzionamento dei Servizi, aggirare misure di sicurezza o raccogliere dati in modo non autorizzato.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Risoluzione</h3>
            <p className="mt-2">
              Possiamo sospendere o interrompere l'accesso ai Servizi in caso di violazione dei presenti Termini, di utilizzo illecito dei Servizi, per motivi di sicurezza o quando richiesto dalla legge.

L'eventuale sospensione o cessazione dell'accesso ai Servizi non pregiudicherà i diritti già maturati dalle parti né gli obblighi derivanti da ordini già accettati, salvo quanto diversamente previsto dalla legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Esclusione di garanzie e limitazione di responsabilità
            </h3>
            <p className="mt-2">
              I Servizi sono forniti secondo disponibilità e possono essere temporaneamente sospesi o modificati per motivi tecnici, di manutenzione o per altre ragioni legittime.

Nulla nei presenti Termini esclude o limita i diritti inderogabili riconosciuti ai consumatori dalla normativa applicabile, inclusi il diritto alla garanzia legale di conformità, il diritto di recesso quando previsto e qualsiasi altra tutela che non possa essere esclusa o limitata per legge.

Nella misura massima consentita dalla legge, PitStore non sarà responsabile per danni derivanti da un utilizzo dei Servizi contrario ai presenti Termini o dalla condotta di terze parti non sotto il nostro ragionevole controllo.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Manleva</h3>
            <p className="mt-2">
              Nella misura consentita dalla legge, accetti di manlevare e tenere indenne PitStore da perdite, danni o reclami derivanti da un tuo utilizzo illecito dei Servizi o da una tua violazione dei presenti Termini.

La presente disposizione non limita i diritti inderogabili riconosciuti ai consumatori dalla normativa applicabile.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Disposizioni generali
            </h3>
            <p className="mt-2">
              Qualora una disposizione dei presenti Termini risultasse invalida o inapplicabile, le restanti disposizioni resteranno pienamente valide ed efficaci.

Non puoi cedere i tuoi diritti od obblighi ai sensi dei presenti Termini senza il nostro previo consenso scritto, salvo quanto previsto dalla legge. PitStore può trasferire i propri diritti e obblighi nell'ambito di una riorganizzazione, cessione dell'attività o altra operazione legittima, nel rispetto dei diritti del consumatore.

I presenti Termini sono disciplinati dalla legge applicabile, fermo restando che, qualora tu sia un consumatore residente in un altro Paese, continuerai a beneficiare delle eventuali disposizioni inderogabili di tutela previste dalla legge del tuo Paese di residenza.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Modifiche ai Termini</h3>
            <p className="mt-2">
              Ci riserviamo il diritto di aggiornare o modificare i presenti Termini quando necessario, ad esempio per riflettere modifiche ai nostri Servizi o alla normativa applicabile.

Le modifiche saranno pubblicate sul nostro sito web e, quando richiesto dalla legge, ti saranno comunicate con modalità appropriate.

Le modifiche non avranno effetto retroattivo sugli ordini già accettati, salvo quanto diversamente richiesto o consentito dalla legge.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Contatti</h3>
            <p className="mt-2">
              Per domande relative ai presenti Termini e Condizioni, puoi scriverci a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [showResi, setShowResi] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTermini, setShowTermini] = useState(false);

  return (
    <footer className="mt-24 border-t border-border/60 py-12">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg">
            PitStore<span className="text-primary">.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Lampade LED per rendere ogni sera più calda, accogliente e
            piena di atmosfera.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-primary">
          <button
            onClick={() => setShowResi(true)}
            className="transition-colors hover:opacity-80 md:hover:text-foreground md:hover:opacity-100"
          >
            Resi &amp; Rimborsi
          </button>
          <button
            onClick={() => setShowPrivacy(true)}
            className="transition-colors hover:opacity-80 md:hover:text-foreground md:hover:opacity-100"
          >
            Privacy
          </button>
          <button
            onClick={() => setShowTermini(true)}
            className="transition-colors hover:opacity-80 md:hover:text-foreground md:hover:opacity-100"
          >
            Termini e Condizioni
          </button>
        </nav>
      </div>

      <div className="container-page mt-8 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground">
        <p>
          Contattaci a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-xs">
          © {new Date().getFullYear()} PitStore — Spedizione gratuita. Reso entro 14 giorni.
        </p>
      </div>

      {showResi && <ResiRimborsiModal onClose={() => setShowResi(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showTermini && <TerminiCondizioniModal onClose={() => setShowTermini(false)} />}
    </footer>
  );
}
