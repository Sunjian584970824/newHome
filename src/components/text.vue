<template>
<div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ea aut nulla voluptates ex voluptatem eius corporis ab saepe nisi dicta debitis beatae iste! Corrupti, quam. Ducimus pariatur rem voluptatum.
</div>
</template>

<script>
import mqtt from 'mqtt'
export default {
    mounted() {
        var client = mqtt.connect('mqtt://127.0.0.1:1883')

        client.on('connect', function () {
            client.subscribe('presence')
            client.publish('presence', 'Hello mqtt')
        })

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
            client.end()
        })
    }
}
</script>
