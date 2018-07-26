package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "lydutjevningvurdering")
@PrimaryKeyJoinColumn(name = "id")
public class LydutjevningVurdering extends Vurdering {




}
