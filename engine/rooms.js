room_get_name = ()=>{
    if (!room) return '?'
    return room['name']
};

room_goto = (r)=>{
    console.log('goto room');
    console.log(r)
};

room_goto_next = ()=>{};

room_restart = ()=>{};

room_set_view = ()=>{};
