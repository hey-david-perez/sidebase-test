const room = 'CHAT'
export default defineWebSocketHandler({
    open(peer){
        console.log('opened WS', peer)
        peer.subscribe(room)
        peer.publish(room, 'User joined')
    },
    close(peer){
        console.log('closed WS', peer)
        peer.unsubscribe(room)
    },
    error(peer, error){
        console.log('error WS', peer, error)
    },
    message(peer, message){
        console.log('message WS', peer, message)
        peer.publish(room, message.text())
    }
})