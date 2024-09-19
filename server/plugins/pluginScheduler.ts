import { useScheduler } from "#scheduler"

export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
    const scheduler = useScheduler()
  
    scheduler.run(() => {
      console.log("I run every 10 seconds")
    }).everySeconds(10)
  
    // scheduler.run(() => {
    //   console.log("I run every 5 seconds")
    // }).everySeconds(5)
  
    // create as many tasks as you want here or in a separate function
  }