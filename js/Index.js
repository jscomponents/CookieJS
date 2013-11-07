/**
 * 
 * Object Literal
 * @author Edy Segura, edysegura@gmail.com
 *
 */
var Index = {
	
	init: function() {
		Index.setForm();
		Index.getCookie();
	},
	
	setForm: function() {
		var formId = 'frm-cookie',
		    form   = document.getElementById(formId);
		
		if(form) {
			form.onsubmit = Index.formSubmit;
			form.onreset = Index.formReset;
		}
	},
	
	formSubmit: function() {
		var 
			form = this, 
			formData = {};
				
		formData.name  = form.name.value;
		formData.email = form.email.value;
		formData.site  = form.site.value;
		
		Cookie.set('formData', JSON.stringify(formData), 365);
		alert('Cookie created!');
		
		return false;
	},
	
	formReset: function() {
		var 
			form = this, 
			element;
		
		for(var i = 0; i < form.elements.length; i++) {
			element = form.elements[i];
			if(/text|email/.test(element.type)) {
				element.value = element.defaultValue = "";
			}
		}
		
		Cookie.unset('formData');
		alert('Cookie deleted!');

		return false;
	},
	
	getCookie: function() {
		var jsonString = Cookie.get('formData');
		if(jsonString) {
			Index.populateForm(JSON.parse(jsonString));
		}
	},
	
	populateForm: function(formData) {
		var input;
		for(inputId in formData) {
			input = document.getElementById(inputId);
			if(input) {
				input.value = formData[inputId];
			}
		}
	}
	
}

//initialization
Index.init();