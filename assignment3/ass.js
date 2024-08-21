// Callback-based functions
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "Vidu", age: 20};
        callback(null, data);
    }, 1000);
}

function processData(data, callback) {
    setTimeout(() => {
        if (data.age >= 18) {
            callback(null, `Name: ${data.name}, Age: ${data.age}`);
        } else {
            callback(new Error("Age is below 18"));
        }
    }, 1000);
}

// use Promises
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "Vidu", age: 20 };
            resolve(data);
        }, 1000);
    });
}

function processDataPromise(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.age >= 18) {
                resolve(`Name: ${data.name}, Age: ${data.age}`);
            } else {
                reject(new Error("Age is below 18"));
            }
        }, 1000);
    });
}

// use Async/Await
async function main() {
    try {
        const data = await fetchDataPromise();
        const result = await processDataPromise(data);
        console.log("Processed Data:", result);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

// Using the Async/Await functions
main();
