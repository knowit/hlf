package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "vurderinger")
@EntityListeners(AuditingEntityListener.class)
public abstract class Vurdering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "sted")
    private Sted sted;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "registrator")
    private Bruker registrator;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date dato;

    private String kommentar;

    public abstract boolean isRangering();

    //Getters and setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Sted getSted() { return sted; }

    public void setSted(Sted sted) { this.sted = sted; }

    public Bruker getRegistrator() { return registrator; }

    public void setRegistrator(Bruker registrator) { this.registrator = registrator; }

    public Date getDato() { return dato; }

    public void setDato(Date dato) { this.dato = dato; }

    public String getKommentar() { return kommentar; }

    public void setKommentar(String kommentar) { this.kommentar = kommentar; }
}
