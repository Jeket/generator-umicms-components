<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/<%= safeModuleName %>" [
	<!ENTITY sys-module '<%= safeModuleName %>'>
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:umi="http://www.umi-cms.ru/TR/umi">

	<!-- <xsl:template match="data[@type = 'form' and (@action = 'modify' or @action = 'create')]">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}"/>
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			<xsl:apply-templates mode="form-modify" />
			<xsl:apply-templates select="object/release" mode="form-modify" />
		</form>
	</xsl:template> -->

</xsl:stylesheet>
