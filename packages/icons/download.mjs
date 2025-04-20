async function run() {
   console.log('RUN')
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});