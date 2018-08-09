$(document).ready(()=>{
    $('#title').keyup(()=>{
        $('#titleCount').html((50-$('#title').val().length)+" left");
    });      
    $('#subtitle').keyup(()=>{
        $('#subtitleCount').html((50-$('#subtitle').val().length)+" left");
    });
    $('#text').keyup(()=>{
        $('#textCount').html((500-$('#text').val().length)+" left");
    });
    $('#form').submit(()=>{
        swal({
            title: "Sending the post...",
            text: "This may take a while...",
            onOpen: ()=>swal.showLoading(),
            showConfirmButton: false,
            allowOutsideClick: false
        });
    });
});
