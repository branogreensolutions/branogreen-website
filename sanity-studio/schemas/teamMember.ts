import { defineField, defineType } from 'sanity';
export default defineType({name:'teamMember',title:'Team Member',type:'document',fields:[defineField({name:'name',type:'string'}),defineField({name:'role',type:'string'}),defineField({name:'division',type:'string'}),defineField({name:'bio',type:'text'}),defineField({name:'photo',type:'image',options:{hotspot:true}})]});
