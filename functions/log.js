function log(message, who = "") {
    let now = new Date()
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    const date = now.toLocaleString('en', options)
    const logString = `[${date}] (${who}) ${message}`

    console.log(logString)
}

exports.log = log