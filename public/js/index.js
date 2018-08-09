let deleteButtons = $("button[name='delete']");
let editButtons = $("button[name='edit']");
deleteButtons.click((e)=>{
	let parent = $(e.target).parents('div.card');
	let id = parent.attr('data-id');
	let title = parent.find("div[title='Title']").text();
	console.log(id+title);
	swal({
		type: 'question',
		title: "Are you sure?",
		text: `You are about to delete ${title? `the post titled: ${title}`: "an untitled post"}.`,
		showConfirmButton: true,
		confirmButtonText: "Confirm",
		showCancelButton: true
	}).then((result)=>{
		if (result.value) {
			swal({
					title: "Deleting the post...",
					text: "It may take a while...",
					onOpen: ()=>swal.showLoading(),
					showConfirmButton: false
			});
			$.ajax({
					url: '/',
					type: 'DELETE',
					data: {action: 'DELETE', id: id},
					success: (result)=>{
							// Do something with the result
							swal({type: "success", title: "Delete success!", timer: 1500, showConfirmButton: false});
							setTimeout(()=>location.reload(), 1500);
					},
					timeout: 10000,
					error: (jqXHR, textStatus, errorThrown)=>{
						swal({type: "warning", title: "Delete failed!", text: `Problem: ${textStatus} ${errorThrown}`, timer: 1500, showConfirmButton: false});
					}
			});
		}
	});
});

editButtons.click((e)=>{
	let parent = $(e.target).parents('div.card');
	let id = parent.attr('data-id');
	let title = parent.find("div[title='Title']").text();
	let subtitle = parent.find('.card-title').text();
	let text = parent.find('.card-text').text();
	let changed = false;
	swal({
		title: `Editing post...`,
		html: `
<div class='container'>
	<form id='form' method='put'>
		<div class="row">
			<div class="form-group col-md">
				<input class="form-control" id="title" type="text" name="title" placeholder="Title" value='${title}'>
				<small id="titleCount" class='float-left'>50 left</small>
			</div>
			<div class="form-group col-md">
				<input class="form-control" id="subtitle" type="text" name="subtitle" placeholder="Subtitle" value='${subtitle}'>
				<small id="subtitleCount" class='float-left'>50 left</small>
			</div>
		</div>
		<div class="form-group">
			<textarea class="form-control" id="text" name="text" placeholder="What is in your mind?" rows="5">${text}</textarea>
			<small id="textCount" class='float-left'>500 left</small>
		</div>
	</form>
</div>`,
		onBeforeOpen: ()=>{
			function update(name, limit) {
				$(`#${name}Count`).html((limit-$(`#${name}`).val().length)+" left");
				changed = true;
			};
			update('title', 50);
			update('subtitle', 50);
			update('text', 500);
			changed = false;
			$('#title').keyup(()=>update('title', 50));
			$('#subtitle').keyup(()=>update('subtitle', 50));
			$('#text').keyup(()=>update('text', 500));
		},
		showCloseButton: true,
		allowOutsideClick: ()=>!changed,
		showCancelButton: true,
		focusConfirm: false,
		confirmButtonText: "Confirm",
		preConfirm: ()=>{
			return {
				title: $('#title').val(),
				subtitle: $('#subtitle').val(),
				text: $('#text').val()
			};
		}
		// cancelButtonText:
	}).then((result)=>{
		if (result.value) {
			swal({
				title: "Updating the post...",
				text: "This may take a while...",
				onOpen: ()=>swal.showLoading(),
				showConfirmButton: false,
				allowOutsideClick: false
			});
			$.ajax({
				url: '/',
				type: 'PUT',
				data: {
					title: result.value.title,
					subtitle: result.value.subtitle,
					text: result.value.text,
					id: id
				},
				success: (result)=>{
					swal({type: "success", title: "Edit success!", timer: 1500, showConfirmButton: false});
					setTimeout(()=>location.reload(), 1500);
				},
				timeout: 10000,
				error: (jqXHR, textStatus, errorThrown)=>{
					swal({type: "warning", title: "Edit failed!", text: `Problem: ${textStatus} ${errorThrown}`, timer: 1500, showConfirmButton: false});
				}
			});
		}
	});
});