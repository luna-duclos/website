$(function() {
	// toggle whether plugin is hidden or not
	$('#hide-plugin').change(function(event) {
		var hidden = $(this).prop('checked');
		var hideVal = hidden ? "1" : "0";
		var data = "plugin_id="+encodeURIComponent($(this).data('plugin-id'))+"&hide="+hideVal;

		$.post('/api/hide-plugin', data).done(function(data, status, jqxhr) {
			swal({
				type: "success",
				title: hidden ? "Hidden" : "Visible",
				text: hidden ? "Your plugin is hidden from the Caddy website and cannot be downloaded." : "Your plugin is visible on the Caddy website and may be downloaded (if there is a release)."
			});
		}).fail(function(jqxhr, msg, error) {
			swal({
				type: "error",
				titleText: "Error",
				text: jqxhr.responseText
			});
		});
	});

	// delete a plugin
	$('#delete-plugin').click(function(event) {
		var pluginID = $(this).data('plugin-id');

		swal({
			title: "Are you sure?",
			text: "Plugin deletion is permanent. It removes the whole thing from our database.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: "Yes, Delete"
		}).then(function() {
			$('#delete-plugin').prop('disabled', true);
			
			var data = "plugin_id="+encodeURIComponent(pluginID);

			$.post('/api/delete-plugin', data).done(function(data, status, jqxhr) {
				swal({
					type: "success",
					title: "Deleted",
					text: "Your plugin has been deleted."
				}).then(function() {
					window.location = "/account/dashboard";
				});
			}).fail(function(jqxhr, msg, error) {
				swal({
					type: "error",
					titleText: "Error",
					text: "Plugin was not deleted: "+jqxhr.responseText
				});
			}).always(function() {
				$('#delete-plugin').prop('disabled', false);
			});
		});	
	});
});