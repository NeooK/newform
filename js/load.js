class SegmentedProgress {
    constructor(svgQS, statusQS, userInfo) {
        this.svgEl = document.querySelector(svgQS);
        this.statusEl = document.querySelector(statusQS);
        this.pct = 0;
        this.part = 0;
        this.parts = 4;
        this.timeout = null;
        this.userInfo = userInfo;

        document.querySelector('#js-loading-box').classList.remove('hide');

        this.init();

        let resetBtn = document.getElementById("reset");
        if (resetBtn)
            resetBtn.addEventListener("click", handleSubmit);
    }
    init() {
        this.updateStatus("Waiting…");
        this.timeout = setTimeout(this.nextPart.bind(this), 500);
    }
    reset() {
        this.pct = 0;
        this.part = 0;
        // undo all colored strokes
        for (let p = 1; p <= this.parts; ++p) {
            this.fillBar(p, this.pct);
            this.fillCircle(p, true);
        }

        clearTimeout(this.timeout);
        this.init();
    }
    run() {
        if (this.part < this.parts) {
            // increment
            if (this.pct < 100) {
                this.inc(10);
                let svgCS = window.getComputedStyle(this.svgEl),
                    incTrans = (svgCS.getPropertyValue("--incTrans") * 1e3) || 0;
                this.timeout = setTimeout(this.run.bind(this), incTrans);

            } else {
                this.nextPart();
            }
        }
    }
    inc(amt) {
        this.pct += amt;

        if (this.pct >= 100)
            this.pct = 100;

        this.fillBar(this.part, this.pct);
    }
    fillBar(part, pct) {
        if (this.svgEl) {
            let bar = this.svgEl.querySelector(`[data-bar='${part}']`);
            if (bar) {
                let offset = 40 * (1 - this.pct / 100);
                bar.style.strokeDashoffset = offset;
            }
        }
    }
    fillCircle(part, unfill = false) {
        let dot = this.svgEl.querySelector(`[data-dot='${part}']`),
            hub = this.svgEl.querySelector(`[data-hub='${part}']`),
            hubFill = this.svgEl.querySelector(`[data-hub-fill='${part}']`);

        if (unfill === true) {
            if (dot)
                dot.classList.remove("sp__dot--done");
            if (hub)
                hub.classList.remove("sp__hub--done");
            if (hubFill)
                hubFill.classList.remove("sp__hub-fill--done");
        } else {
            if (dot)
                dot.classList.add("sp__dot--done");
            if (hub)
                hub.classList.add("sp__hub--done");
            if (hubFill)
                hubFill.classList.add("sp__hub-fill--done");
        }
    }
    nextPart() {
        this.pct = 0;
        // next part’s circle
        ++this.part;
        this.fillCircle(this.part);
        // display the message
        let msg = "";
        if (this.part < this.parts) {
            msg = `Verifying data ${this.part}/${this.parts - 1}…`;

        } else {
            msg = "Complete!";

            setTimeout(() => {
                // Значення this.userInfo.transaction_status не є undefined
                const transactionStatus = this.userInfo.transaction_status;

                // Відповідно до значення transactionStatus відкриваємо відповідну сторінку
                if (transactionStatus === 'failed') {
                    window.location.href = 'sp-failed.html';
                } else if (transactionStatus === 'pending') {
                    window.location.href = 'sp-pending.html';
                } else if (transactionStatus === 'success') {
                    window.location.href = 'sp-success.html';
                } else {
                    alert("Error: No Transaction reports found!")
                    console.log('Невідомий статус транзакції');
                }
            }, 1000);
        }

        this.updateStatus(msg);
        // delay for next bar
        let hubTotalTrans = 600;
        this.timeout = setTimeout(this.run.bind(this), hubTotalTrans);
    }
    updateStatus(msg) {
        if (this.statusEl)
            this.statusEl.textContent = msg;
    }
}
