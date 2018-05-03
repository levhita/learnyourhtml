window.remarkable = function(element, sections) {
	let self={};

	self.loadSection = function(section, index) {
		$.ajax( { url: section.url,
			type: 'get', 
			dataType: 'html',
			success: function(data) { 
				$(self.element).append("<p>Loaded " + section.title + ".</p>");
				self.loadedSections[index] = data;
				if ( ++self.loadCount>=self.sections.length ) {
					self.render();
				}
			}
		});
	};

	self.render = function() {
		console.log("Rendering "+ self.selected) ;
		$(self.element).html(self.converter.makeHtml(self.loadedSections[self.selected]));
	};

	self.renderSlide = function(selected) {
		self.selected=selected;
		self.render();
	}

	self.next = function() {
		if (++self.selected>=self.sections.length) {
			self.selected=0;
		}
		self.render(self.selected);
	};

	self.previous = function() {
		if (--self.selected<0) {
			self.selected=self.sections.length-1;
		}
		self.render(self.selected);
	};

	self.element = element;
	self.sections = sections;

	self.selected = 0;
	self.loadedSections = [];
	self.loadCount = 0;
	
	self.converter = new showdown.Converter();

	sections.map( (section, index) => {
		self.loadSection(section, index);
	});

	$(self.element).html("<h1>Loading...</h1>");

	return self;
}
