
global.io.sockets.on('connection',function(socket){
    socket.on('teacher-login',function(data){
        socket.join('teacher_channel');
        console.log(data);
    });
    
    socket.on('student-login',function(data){
        socket.join('student_channel');        
        global.io.sockets.in('teacher_channel').emit('init-state', data);
        console.log(data);
    });

    socket.on('move-slide', function(data){
        console.log(data);        
        var room = 'student_channel';
        global.io.sockets.in(room).emit('move-slide', data);
    });

    socket.on('mouse-event', function(data){
        console.log(data);                
        global.io.sockets.in('teacher_channel').emit('mouse-event', data);
        global.io.sockets.in('student_channel').emit('mouse-event', data);
    });

    socket.on('clear-canvas', function(data){
        console.log(data);                        
        global.io.sockets.in('student_channel').emit('clear-canvas', data);
    });

    socket.on('drawing-flag', function(data){
        console.log(data);                        
        global.io.sockets.in('student_channel').emit('drawing-flag', data);
    });
})  