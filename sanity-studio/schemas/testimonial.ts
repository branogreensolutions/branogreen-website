import { defineField, defineType } from 'sanity';
export default defineType({name:'testimonial',title:'Testimonial',type:'document',fields:[defineField({name:'name',type:'string'}),defineField({name:'company',type:'string'}),defineField({name:'division',type:'string'}),defineField({name:'quote',type:'text'}),defineField({name:'photo',type:'image',options:{hotspot:true}})]});
